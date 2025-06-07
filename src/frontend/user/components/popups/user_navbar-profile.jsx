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
    const fetchProfile = async () => {
      let token = localStorage.getItem("authToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const makeProfileRequest = async (accessToken) => {
        return fetch("http://localhost:8000/api/employee/profile/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      };

      let response = await makeProfileRequest(token);

      // Handle token expiration
      if (response.status === 401 && refreshToken) {
        try {
          const refreshResponse = await fetch("http://localhost:8000/api/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            token = data.access;
            localStorage.setItem("authToken", token);
            response = await makeProfileRequest(token); // Retry with new token
          } else {
            console.error("Refresh token expired or invalid");
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            return;
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          return;
        }
      }

      // Process successful response
      if (response.ok) {
        try {
          const data = await response.json();
          setProfileName(`${data.first_name} ${data.last_name}`);
          setProfileImage(`http://localhost:8000${data.image}`);
        } catch (error) {
          console.error("Failed to parse profile data:", error);
        }
      } else {
        console.error("Failed to fetch profile info");
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
            localStorage.removeItem("lastName");
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('profileImage');
            localStorage.removeItem('profileName');
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
