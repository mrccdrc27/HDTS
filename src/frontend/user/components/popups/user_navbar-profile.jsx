import { useNavigate, useLocation } from 'react-router-dom';
import UserProfileImage from '../../assets/profile-management/user-profile.png';
import { useState, useEffect } from 'react';

const UserProfilePopup = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileName, setProfileName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const openModalRoute = (path) => {
    navigate(path, {
      state: { backgroundLocation: location },
    });
    if (onClose) onClose();
  };

  useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const fName = payload.first_name || '';
        const lName = payload.last_name || '';
    
        const formattedProfileName = `${fName.charAt(0).toUpperCase() + fName.slice(1)} ${lName.charAt(0).toUpperCase() + lName.slice(1)}`;
    
        setProfileName(formattedProfileName);
      }
    }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/employee/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setProfileName(`${data.first_name} ${data.last_name}`);
        setProfileImage(`http://localhost:8000${data.image}`);
      } catch (error) {
        console.error("Failed to fetch profile info:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-popup">
      <div className="profile-popup-header">
        <img src={profileImage || UserProfileImage} alt="Employee Profile" className="userNavbar-menu-item cursor-pointer" />
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
        <button
          className="user-logout-button"
          onClick={() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem("firstName");
            onClose?.();
            navigate('/login/employee', { replace: true });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup;
