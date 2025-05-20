import { useState } from 'react';
import UserProfileImage from '../../assets/profile-management/user-profile.png';

import UserProfile from '../modals/profile-management/user_profile.jsx';
import UserTermsAndConditions from '../modals/general/user_terms-and-conditions.jsx';
import UserPrivacyPolicy from '../modals/general/user_privacy-policy.jsx';

const UserProfilePopup = ({ onClose }) => {
  const [openModal, setOpenModal] = useState(null); // 'profile', 'terms', 'privacy', or null

  const openProfileModal = () => {
    setOpenModal('profile');
    if (onClose) onClose();
  };

  // You can implement similar modal logic if needed
  const openTermsModal = () => {
    setOpenModal('terms');
    if (onClose) onClose();
  };

  const openPrivacyModal = () => {
    setOpenModal('privacy');
    if (onClose) onClose();
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
  <>
    <div className="profile-popup">
      <div className="profile-popup-header">
        <img src={UserProfileImage} alt="User Profile" className="profile-avatar" />
        <p className="profile-name">John Doe</p>
      </div>

      <hr className="profile-divider" />

      <div className="profile-popup-buttons">
        <button className="profile-popup-button" onClick={openProfileModal}>
          Profile
        </button>
        <button className="profile-popup-button" onClick={openTermsModal}>
          Terms and Conditions
        </button>
        <button className="profile-popup-button" onClick={openPrivacyModal}>
          Privacy Policy
        </button>
        <button
          className="user-logout-button"
          onClick={() => {
            if (onClose) onClose();
          }}
        >
          Logout
        </button>
      </div>
    </div>

    {/* Render only one modal at a time */}
    {openModal === 'profile' && <UserProfile onClose={closeModal} />}
    {openModal === 'terms' && <UserTermsAndConditions onClose={closeModal} />}
    {openModal === 'privacy' && <UserPrivacyPolicy onClose={closeModal} />}
    </>
  );
};

export default UserProfilePopup;
