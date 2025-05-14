import { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import Logo from '/src/frontend/assets/smartsupport-logo.svg';
import { ChevronDown, Bell } from 'lucide-react';
import DefaultAvatar from '/src/frontend/assets/employee-profile.svg';
import '../../styles/components/headers/user_navbar.css';

const UserNavbar = () => {
  const navigate = useNavigate();
  const [userActiveDropdown, userSetActiveDropdown] = useState(null);
  const [userCurrentTime, userSetCurrentTime] = useState(new Date());
  const [userShowProfilePopup, userSetShowProfilePopup] = useState(false);
  const [userShowNotificationPopup, userSetShowNotificationPopup] = useState(false);
  const [userNotifications, userSetNotifications] = useState([
    'Your ticket #TX0123 has been updated.',
    'Reminder: Pending ticket needs your action.',
    'System maintenance tomorrow at 10 AM.',
  ]);

  const userToggleDropdown = (menu) => {
    userSetActiveDropdown(userActiveDropdown === menu ? null : menu);
  };

  const userToggleProfilePopup = () => {
    userSetShowProfilePopup((prev) => !prev);
  };

  const userToggleNotificationPopup = () => {
    userSetShowNotificationPopup((prev) => !prev);
  };

  const userClearNotification = (index) => {
    const updatedNotifications = userNotifications.filter((_, i) => i !== index);
    userSetNotifications(updatedNotifications);
  };

  useEffect(() => {
    const userHandleClickOutside = (event) => {
      if (userActiveDropdown && !event.target.closest('.userNavbar-menu-dropdown')) {
        userSetActiveDropdown(null);
      }
      if (userShowProfilePopup && !event.target.closest('.profile-popup')) {
        userSetShowProfilePopup(false);
      }
      if (userShowNotificationPopup && !event.target.closest('.profile-popup')) {
        userSetShowNotificationPopup(false);
      }
    };

    document.addEventListener('mousedown', userHandleClickOutside);
    return () => {
      document.removeEventListener('mousedown', userHandleClickOutside);
    };
  }, [userActiveDropdown, userShowProfilePopup, userShowNotificationPopup]);

  useEffect(() => {
    const interval = setInterval(() => {
      userSetCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const userFormatDateTime = (date) => {
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

        {/* Active Tickets Dropdown */}
        <div className="userNavbar-menu-dropdown">
          <div className="userNavbar-menu-trigger" onClick={() => userToggleDropdown('active-tickets')}>
            <NavLink to="/user/active-tickets/all-tickets" className="userNavbar-menu-item">Active Tickets</NavLink>
            <ChevronDown size={18} />
          </div>
          {userActiveDropdown === 'active-tickets' && (
            <div className="dropdown-content">
              <NavLink to="/user/active-tickets/all-tickets">All Tickets</NavLink>
              <NavLink to="/user/active-tickets/open-tickets">Open Tickets</NavLink>
              <NavLink to="/user/active-tickets/on-progress-tickets">On Progress Tickets</NavLink>
              <NavLink to="/user/active-tickets/on-hold-tickets">On Hold Tickets</NavLink>
              <NavLink to="/user/active-tickets/pending-tickets">Pending Tickets</NavLink>
            </div>
          )}
        </div>

        {/* Ticket Records Dropdown */}
        <div className="userNavbar-menu-dropdown">
          <div className="userNavbar-menu-trigger" onClick={() => userToggleDropdown('ticket-records')}>
            <NavLink to="/user/all-records" className="userNavbar-menu-item">Ticket Records</NavLink>
            <ChevronDown size={18} />
          </div>
          {userActiveDropdown === 'ticket-records' && (
            <div className="dropdown-content">
              <NavLink to="/user/all-records">All Records</NavLink>
              <NavLink to="/user/closed-tickets">Closed Tickets</NavLink>
              <NavLink to="/user/rejected-tickets">Rejected Tickets</NavLink>
            </div>
          )}
        </div>

        <div className="userNavbar-right">
          {/* Notification Bell */}
          <div className="relative notification-container">
            <Bell
              size={18}
              className="cursor-pointer notification-bell"
              onClick={userToggleNotificationPopup}
            />
            {userNotifications.length > 0 && (
              <span className="notification-badge">{userNotifications.length}</span>
            )}
            {userShowNotificationPopup && (
              <div className="profile-popup">
                <p className="profile-name">Notifications</p>
                {userNotifications.map((notification, index) => (
                  <div key={index} className="notification-item">
                    {notification}
                    <button onClick={() => userClearNotification(index)} className="clear-notification-btn">
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
            <span>{userFormatDateTime(userCurrentTime)}</span>
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <img
              src={DefaultAvatar}
              alt="Employee Profile"
              className="userNavbar-menu-item cursor-pointer"
              onClick={userToggleProfilePopup}
            />
            {userShowProfilePopup && (
              <div className="profile-popup">
                <p className="profile-name">John Doe</p>
                <p className="profile-role">System Manager</p>
                <Link to="/">
                  <button className="user-logout-button">
                    Logout
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
