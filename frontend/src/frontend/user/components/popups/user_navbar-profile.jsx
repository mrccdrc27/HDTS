import { useState } from 'react';
import UserProfileImage from '../../assets/profile-management/user-profile.png';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../modals/profile-management/user_profile.jsx';
import UserTermsAndConditions from '../modals/general/user_terms-and-conditions.jsx';
import UserPrivacyPolicy from '../modals/general/user_privacy-policy.jsx';

const UserProfilePopup = ({ onClose }) => {
  const [openModal, setOpenModal] = useState(null); // 'profile', 'terms', 'privacy', or null

  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || "";

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
  
    // Clear stored tokens and name info
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
  
    // Close popup if needed
    if (onClose) onClose();
  
    // Redirect to login
    navigate("/login/employee");
    // Or use this if hosted separately:
    // window.location.href = "http://localhost:3001/login/employee";
  }; 

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

  const capitalize = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
  <>
    <div className="profile-popup">
      <div className="profile-popup-header">
        <img src={UserProfileImage} alt="User Profile" className="profile-avatar" />
        <p className="profile-name">
          {`${capitalize(firstName)} ${capitalize(lastName)}`}
        </p>
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
        <button className="user-logout-button" onClick={handleLogout}>
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
