import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '/src/frontend/assets/smartsupport-logo.svg';
import { Bell, ChevronDown } from 'lucide-react';
import UserProfileImage from '../../assets/profile-management/user-profile.png';
import './user_navbar.css';

import UserProfilePopup from '../popups/user_navbar-profile.jsx';
import NotificationPopup from '../popups/user_navbar-notification.jsx';

const UserNavbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleProfilePopup = () => setShowProfilePopup((prev) => !prev);
  const toggleNotificationPopup = () => setShowNotificationPopup((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.profile-popup') &&
        !event.target.closest('.notification-container') &&
        !event.target.closest('.userNavbar-menu-dropdown')
      ) {
        setShowProfilePopup(false);
        setShowNotificationPopup(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
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

  const renderDropdown = (label, basePath, items, dropdownKey) => (
    <div className="userNavbar-menu-dropdown">
      <NavLink
        to={`${basePath}/${items[0].path}`}
        className="userNavbar-menu-item flex items-center gap-1"
        onClick={() => setActiveDropdown(null)}
      >
        {label}
      </NavLink>
      <button
        className="userNavbar-menu-trigger"
        onClick={(e) => {
          e.preventDefault();
          setActiveDropdown(activeDropdown === dropdownKey ? null : dropdownKey);
        }}
        aria-label={`Toggle ${label} dropdown`}
      >
        <ChevronDown size={16} />
      </button>
      {activeDropdown === dropdownKey && (
        <div className="dropdown-content">
          {items.map(({ path, label }) => (
            <NavLink
              key={path}
              to={`${basePath}/${path}`}
              onClick={() => setActiveDropdown(null)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="userNavbar">
      <div className="userNavbar-left">
        <NavLink to="/user/home" className="userNavbar-left-item">
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

        {renderDropdown('Active Tickets', '/user/active-tickets', [
          { path: 'all-active-tickets', label: 'All Active Tickets' },
          { path: 'open-tickets', label: 'Open Tickets' },
          { path: 'on-progress-tickets', label: 'On Progress Tickets' },
          { path: 'on-hold-tickets', label: 'On Hold Tickets' },
          { path: 'pending-tickets', label: 'Pending Tickets' },
          { path: 'resolved-tickets', label: 'Resolved Tickets' },
        ], 'active')}

        {renderDropdown('Ticket Records', '/user/ticket-records', [
          { path: 'all-ticket-records', label: 'All Ticket Records' },
          { path: 'closed-tickets', label: 'Closed Tickets' },
          { path: 'rejected-tickets', label: 'Rejected Tickets' },
          { path: 'withdrawn-tickets', label: 'Withdrawn Tickets' },
        ], 'records')}
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
          <span>Name</span>
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
