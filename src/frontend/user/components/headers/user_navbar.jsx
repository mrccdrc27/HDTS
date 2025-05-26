import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '/src/frontend/assets/smartsupport-logo.svg';
import { Bell } from 'lucide-react';
import UserProfileImage from '../../assets/profile-management/user-profile.png';
import '../../components/headers/user_navbar.css';

import UserProfilePopup from '../popups/user_navbar-profile.jsx';
import NotificationPopup from '../popups/user_navbar-notification.jsx';

const UserNavbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [fullName, setFullName] = useState("Name");

  const toggleProfilePopup = () => setShowProfilePopup((prev) => !prev);
  const toggleNotificationPopup = () => setShowNotificationPopup((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.profile-popup') &&
        !event.target.closest('.notification-container')
      ) {
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
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    const time = date.toLocaleTimeString('en-US', options);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year} | ${time}`;
  };

  // Capitalize helper
  const capitalizeEachWord = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const first = localStorage.getItem("firstName") || "";
    const last = localStorage.getItem("lastName") || "";
    if (first && last) {
      setFullName(`${capitalizeEachWord(last)}, ${capitalizeEachWord(first)}`);
    }
  }, []);

  return (
    <div className="userNavbar">
      <div className="userNavbar-left">
        <NavLink to="/user/request-ticket" className="userNavbar-left-item">
          <img src={Logo} alt="Smart Support Logo" className="userNavbar-logo" />
          <h2>
            Smart<span>Support</span>
          </h2>
        </NavLink>
      </div>

      <div className="userNavbar-menu">
        <NavLink to="/user/home" className="userNavbar-menu-item">
          Home
        </NavLink>
        <NavLink to="/user/active-tickets" className="userNavbar-menu-item">
          Active Tickets
        </NavLink>
        <NavLink to="/user/ticket-records" className="userNavbar-menu-item">
          Ticket Records
        </NavLink>
      </div>

      <div className="userNavbar-right">
        {/* Notifications */}
        <div className="relative notification-container">
          <Bell
            size={18}
            className="cursor-pointer notification-bell"
            onClick={toggleNotificationPopup}
          />
          {showNotificationPopup && (
            <NotificationPopup onClose={() => setShowNotificationPopup(false)} />
          )}
        </div>

        {/* User Info */}
        <div className="userNavbar-info">
          <span>{fullName}</span>
          <br />
          <span>{formatDateTime(currentTime)}</span>
        </div>

        {/* Profile Avatar */}
        <div className="relative">
          <img
            src={UserProfileImage}
            alt="Employee Profile"
            className="userNavbar-menu-item cursor-pointer"
            onClick={toggleProfilePopup}
          />
          {showProfilePopup && <UserProfilePopup />}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
