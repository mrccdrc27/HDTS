import { useNavigate, useLocation } from 'react-router-dom';
import UserProfileImage from '../../assets/profile-management/user-profile.png';
import { useState, useEffect } from 'react';

const UserProfilePopup = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileName, setProfileName] = useState('');

  const openModalRoute = (path) => {
    navigate(path, {
      state: { backgroundLocation: location },
    });
    if (onClose) onClose(); // Close the dropdown
  };

useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const fName = payload.first_name || '';
      const lName = payload.last_name || '';
  
      const formattedProfileName = `${fName.charAt(0).toUpperCase() + fName.slice(1)} ${lName.charAt(0).toUpperCase() + lName.slice(1)}`;
  
      setProfileName(formattedProfileName);
    }
  }, []);

  return (
    <div className="profile-popup">
      <div className="profile-popup-header">
        <img src={UserProfileImage} alt="User Profile" className="profile-avatar" />
        <p className="profile-name">{profileName}</p>
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
