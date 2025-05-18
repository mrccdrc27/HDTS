import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '/src/frontend/assets/smartsupport-logo.svg';
import { Bell } from 'lucide-react';
import DefaultAvatar from '/src/frontend/assets/employee-profile.svg';
import '../../styles/components/headers/user_navbar.css';

const UserNavbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notifications, setNotifications] = useState([
    'Your ticket #TX0123 has been updated.',
    'Reminder: Pending ticket needs your action.',
    'System maintenance tomorrow at 10 AM.',
  ]);

  const toggleProfilePopup = () => {
    setShowProfilePopup((prev) => !prev);
  };

  const toggleNotificationPopup = () => {
    setShowNotificationPopup((prev) => !prev);
  };

  const clearNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-popup') && !event.target.closest('.notification-container')) {
        setShowProfilePopup(false);
        setShowNotificationPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const time = date.toLocaleTimeString('en-US', options);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year} | ${time}`;
  };

  return (
    <div className="userNavbar">
      <div className="userNavbar-left">
        <NavLink to="/user/request-ticket" className="userNavbar-left-item">
          <img src={Logo} alt="Smart Support Logo" className="userNavbar-logo" />
          <h2>Smart<span>Support</span></h2>
        </NavLink>
      </div>

      <div className="userNavbar-menu">
        <NavLink to="/user/home" className="userNavbar-menu-item">Home</NavLink>
        <NavLink to="/user/active-tickets" className="userNavbar-menu-item">Active Tickets</NavLink>
        <NavLink to="/user/ticket-records" className="userNavbar-menu-item">Ticket Records</NavLink>
      </div>  
      

      <div className="userNavbar-right">
        {/* Notifications */}
        <div className="relative notification-container">
          <Bell
            size={18}
            className="cursor-pointer notification-bell"
            onClick={toggleNotificationPopup}
          />
          {notifications.length > 0 && (
            <span className="notification-badge">{notifications.length}</span>
          )}
          {showNotificationPopup && (
            <div className="profile-popup">
              <p className="profile-name">Notifications</p>
              {notifications.map((note, index) => (
                <div key={index} className="notification-item">
                    {note}
                    <button
                      onClick={() => clearNotification(index)}
                      className="clear-notification-btn"
                    >
                      Clear
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="userNavbar-info">
            <span>Name</span><br />
            <span>{formatDateTime(currentTime)}</span>
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <img
              src={DefaultAvatar}
              alt="Employee Profile"
              className="userNavbar-menu-item cursor-pointer"
              onClick={toggleProfilePopup}
            />
            {showProfilePopup && (
              <div className="profile-popup">
                <p className="profile-name">John Doe</p>
                <p className="profile-role">System Manager</p>
                <Link to="/">
                  <button className="user-logout-button">Logout</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default UserNavbar;
