import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ModalWrapper from '../../wrapper/modal-wrapper.jsx';
import AdminProfile from '../modals/navbar/admin_profile.jsx';
import AdminTermsAndConditions from '../modals/navbar/admin_terms-and-conditions.jsx';
import AdminPrivacyPolicy from '../modals/navbar/admin_privacy-policy.jsx';
import AdminChangePassword from '../modals/navbar/admin_change-password.jsx';

import './admin_navbar-profile.css';

const AdminNavbarProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(null);
  const [profileName, setProfileName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');
    setActiveSection(section);
  }, [location.search]);

  useEffect(() => {
    const token = localStorage.getItem('adminAuthToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const fName = payload.first_name || '';
      const lName = payload.last_name || '';
      const role = payload.role || '';
  
      const formattedProfileName = `${fName.charAt(0).toUpperCase() + fName.slice(1)} ${lName.charAt(0).toUpperCase() + lName.slice(1)}`;
  
      setProfileName(formattedProfileName);
      setUserRole(role);
    }
  }, []);

  const addQueryParam = (key, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const handleLogout = () => {
    navigate('/');
  };

  const closeModal = () => {
    navigate(location.pathname, { replace: true });
  };

  const modalContentMap = {
    profile: <AdminProfile onClose={closeModal} />,
    'terms-and-conditions': <AdminTermsAndConditions onClose={closeModal} />,
    'privacy-policy': <AdminPrivacyPolicy onClose={closeModal} />,
    'change-password': <AdminChangePassword onClose={closeModal} />,
  };

  return (
    <>
      <div className="profile-popup">
        <div className="profile-info">
          <p className="profile-name">{profileName}</p>
          <p className="profile-role">{userRole}</p>
        </div>
        <hr className="divider" />
        <p className="profile-settings">Settings</p>
        <div className="profile-links">
          <button className="profile-link" onClick={() => addQueryParam('section', 'profile')}>
            Profile
          </button>
          <button className="profile-link" onClick={() => addQueryParam('section', 'security')}>
            Security
          </button>
          <button className="profile-link" onClick={() => addQueryParam('section', 'terms-and-conditions')}>
            Terms and Conditions
          </button>
          <button className="profile-link" onClick={() => addQueryParam('section', 'privacy-policy')}>
            Privacy Policy
          </button>
          <button className="profile-link" onClick={() => addQueryParam('section', 'about')}>
            About
          </button>
          <button className="profile-link logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      {activeSection && modalContentMap[activeSection] && (
        <ModalWrapper onClose={closeModal}>
          {modalContentMap[activeSection]}
        </ModalWrapper>
      )}
    </>
  );
};

export default AdminNavbarProfile;
