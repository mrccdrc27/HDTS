import { useState } from 'react';
import AdminChangePassword from './admin_change-password.jsx';
import './admin_profile.css';

const AdminProfile = ({ onClose }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const profileData = {
    lastName: 'Batumbakal',
    firstName: 'Bogart',
    middleName: 'Dimaguiba',
    suffix: 'Jr.',
    companyId: 'IT0001',
    department: 'IT Department',
    email: 'batumbakalbogart@gmail.com'
  };

  const handleUploadImage = () => {
    alert('Image upload triggered');
  };

  const formatFullName = () => {
    const { lastName, firstName, middleName, suffix } = profileData;
    const middleInitial = middleName ? `${middleName[0]}.` : '';
    return `${lastName}, ${firstName} ${middleInitial} ${suffix || ''}`.trim();
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">View Profile</h1>
      <hr className="profile-divider profile-divider--visible" />

      <div className="profile-card">
        <div className="profile-content">
          <div className="profile-image-section">
            <div className="profile-image">
              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop&crop=face"
                alt="Profile"
              />
            </div>
            <button className="btn-upload-image" onClick={handleUploadImage}>
              Upload New Image
            </button>
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
                  value={profileData.companyId}
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
        <button className="btn btn-close" onClick={onClose}>
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
