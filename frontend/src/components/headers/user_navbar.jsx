import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '/src/frontend/assets/smartsupport-logo.svg';
import { ChevronDown, Bell } from 'lucide-react';
import DefaultAvatar from '/src/frontend/assets/employee-profile.svg';

import NotificationPopup from '../popups/user/user_notification';

const UserNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notifications] = useState([
    'Your ticket #TX0123 has been updated.',
    'Reminder: Pending ticket needs your action.',
    'System maintenance tomorrow at 10 AM.',
  ]);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const toggleNotificationPopup = () => {
    setShowNotificationPopup(!showNotificationPopup);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
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

  return (
    <div className="userNavbar">
      <div className="userNavbar-left">
        <NavLink to="/user/request-ticket" className="userNavbar-left-item">
          <img src={Logo} alt="Smart Support Logo" className="userNavbar-logo" />
          <h2>Smart Support</h2>
        </NavLink>
      </div>

      <div className="userNavbar-menu">
        <div>
          <NavLink to="/user/home" className="userNavbar-menu-item">Home</NavLink>
        </div>

        {/* Active Tickets Dropdown */}
        <div className="userNavbar-menu-dropdown">
          <div className="userNavbar-menu-trigger" onClick={() => toggleDropdown('active-tickets')}>
            <NavLink to="/user/all-tickets" className="userNavbar-menu-item">Active Tickets</NavLink>
            <ChevronDown size={18} />
          </div>
          {activeDropdown === 'active-tickets' && (
            <div className="dropdown-content">
              <NavLink to="/user/all-tickets">All Tickets</NavLink>
              <NavLink to="/user/open-tickets">Open Tickets</NavLink>
              <NavLink to="/user/on-progress-tickets">On Progress Tickets</NavLink>
              <NavLink to="/user/on-hold-tickets">On Hold Tickets</NavLink>
              <NavLink to="/user/pending-tickets">Pending Tickets</NavLink>
            </div>
          )}
        </div>

        {/* Ticket Records Dropdown */}
        <div className="userNavbar-menu-dropdown">
          <div className="userNavbar-menu-trigger" onClick={() => toggleDropdown('ticket-records')}>
            <NavLink to="/user/all-records" className="userNavbar-menu-item">Ticket Records</NavLink>
            <ChevronDown size={18} />
          </div>
          {activeDropdown === 'ticket-records' && (
            <div className="dropdown-content">
              <NavLink to="/user/all-records">All Records</NavLink>
              <NavLink to="/user/closed-tickets">Closed Tickets</NavLink>
              <NavLink to="/user/rejected-tickets">Rejected Tickets</NavLink>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <Bell
            size={18}
            className="userNavbar-menu-item cursor-pointer"
            onClick={toggleNotificationPopup}
          />
          {showNotificationPopup && (
            <NotificationPopup
              notifications={notifications}
              onClose={() => setShowNotificationPopup(false)}
            />
          )}
        </div>

        <div>
          <span>Name</span>
          <br />
          <span>{formatDateTime(currentTime)}</span>
        </div>

        {/* Profile Avatar + Popup */}
        <div className="relative">
          <img
            src={DefaultAvatar}
            alt="Employee Profile"
            className="userNavbar-menu-item cursor-pointer"
            onClick={toggleProfilePopup}
          />
          {showProfilePopup && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50">
              <p className="font-semibold mb-2">John Doe</p>
              <p className="text-sm text-gray-600 mb-4">System Manager</p>
              {/* Logout Button */}
              <Link to="/">
                <button className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
