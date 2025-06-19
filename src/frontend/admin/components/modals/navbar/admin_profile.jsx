import { useState, useEffect, useRef } from 'react';
import AdminChangePassword from './admin_change-password.jsx';
import api from '../../../../../utilities/ticket/apiInstance';
import imageCompression from 'browser-image-compression';
import './admin_profile.css';

const AdminProfile = ({ onClose }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [version, setVersion] = useState(Date.now());
  const fileInputRef = useRef();

  useEffect(() => {
    api.get('/employee/profile/')
      .then(res => setProfileData(res.data))
      .catch(() => setProfileData(null));
  }, []);

  const handleUploadImage = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Only PNG, JPG, and JPEG files are allowed.');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB.');
      return;
    }

    // Compress and resize image to 1024x1024
    try {
      const options = {
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        maxSizeMB: 2,
        fileType: file.type,
      };
      const compressedFile = await imageCompression(file, options);
      setSelectedImage(compressedFile);
      setPreviewUrl(URL.createObjectURL(compressedFile));
    } catch (err) {
      alert('Failed to process image.');
    }
  };

  const handleClose = async () => {
    if (selectedImage) {
      // Upload the image to backend
      const formData = new FormData();
      formData.append('image', selectedImage);
      try {
        await api.post('/employee/upload-image/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const res = await api.get('/employee/profile/');
        setProfileData(res.data);
        setVersion(Date.now()); // <-- Only update here!
      } catch (err) {
        alert('Failed to upload image.');
      }
    }
    if (onClose) onClose();
  };

  const formatFullName = () => {
    if (!profileData) return '';
    const { last_name, first_name, middle_name, suffix } = profileData;
    const middleInitial = middle_name ? `${middle_name[0]}.` : '';
    return `${last_name}, ${first_name} ${middleInitial} ${suffix || ''}`.trim();
  };

  if (!profileData) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">View Profile</h1>
      <hr className="profile-divider profile-divider--visible" />

      <div className="profile-card">
        <div className="profile-content">
          <div className="profile-image-section">
            <div className="profile-image">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile Preview" />
              ) : profileData.image ? (
                <img src={`${profileData.image}?v=${version}`} alt="Profile" />
              ) : null}
            </div>
            <button className="btn-upload-image" onClick={handleUploadImage}>
              Upload New Image
            </button>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <div className="profile-info-section">
            <div className="profile-row">
              <div className="profile-field">
                <label className="field-label" htmlFor="name">Name</label>
                <input
                  id="name"
                  className="field-input"
                  type="text"
                  readOnly
                  value={formatFullName()}
                />
              </div>

              <div className="profile-field">
                <label className="field-label" htmlFor="companyId">Company ID</label>
                <input
                  id="companyId"
                  className="field-input"
                  type="text"
                  readOnly
                  value={profileData.company_id}
                />
              </div>

              <div className="profile-field">
                <label className="field-label" htmlFor="department">Department</label>
                <input
                  id="department"
                  className="field-input"
                  type="text"
                  readOnly
                  value={profileData.department}
                />
              </div>

              <div className="profile-field">
                <label className="field-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  className="field-input"
                  type="text"
                  readOnly
                  value={profileData.email}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="profile-divider profile-divider--visible bottom-divider" />

      <div className="profile-buttons">
        <button
          className="btn btn-change-password"
          onClick={() => setShowChangePassword(true)}
        >
          Change Password
        </button>
        <button className="btn btn-close" onClick={handleClose}>
          Close
        </button>
      </div>

      {showChangePassword && (
        <AdminChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default AdminProfile;
