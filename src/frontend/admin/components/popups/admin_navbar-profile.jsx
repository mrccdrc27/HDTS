import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ModalWrapper from '../../wrapper/modal-wrapper.jsx';
import AdminProfile from '../modals/navbar/admin_profile.jsx';
import AdminTermsAndConditions from '../modals/navbar/admin_terms-and-conditions.jsx';
import AdminPrivacyPolicy from '../modals/navbar/admin_privacy-policy.jsx';

import './admin_navbar-profile.css'; 

const AdminNavbarProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');
    setActiveSection(section);
  }, [location.search]);

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
    profile: <AdminProfile />,
    'terms-and-conditions': <AdminTermsAndConditions />,
    'privacy-policy': <AdminPrivacyPolicy />,
  };

  return (
    <>
      <div className="profile-popup">
        <div className="profile-info">
          <p className="profile-name">Admin Name</p>
          <p className="profile-role">System Administrator</p>
        </div>
        <hr className="divider"/>
        <div className="profile-links">
          <button className="profile-link" onClick={() => addQueryParam('section', 'profile')}>
            Profile
          </button>
          <button className="profile-link" onClick={() => addQueryParam('section', 'terms-and-conditions')}>
            Terms and Conditions
          </button>
          <button className="profile-link" onClick={() => addQueryParam('section', 'privacy-policy')}>
            Privacy Policy
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
