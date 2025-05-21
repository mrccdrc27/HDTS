import { useNavigate, useLocation } from 'react-router-dom';
import UserProfileImage from '../../assets/profile-management/user-profile.png';

const UserProfilePopup = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const openModalRoute = (path) => {
    navigate(path, {
      state: { backgroundLocation: location },
    });
    if (onClose) onClose(); // Close the dropdown
  };

  return (
    <div className="profile-popup">
      <div className="profile-popup-header">
        <img src={UserProfileImage} alt="User Profile" className="profile-avatar" />
        <p className="profile-name">John Doe</p>
      </div>

      <hr className="profile-divider" />

      <div className="profile-popup-buttons">
        <button className="profile-popup-button" onClick={() => openModalRoute('/profile')}>
          Profile
        </button>
        <button className="profile-popup-button" onClick={() => openModalRoute('/terms')}>
          Terms and Conditions
        </button>
        <button className="profile-popup-button" onClick={() => openModalRoute('/privacy-policy')}>
          Privacy Policy
        </button>
        <button className="user-logout-button" onClick={onClose}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup;
