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
  const [fullName, setFullName] = useState("Name");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState('');

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

  useEffect(() => {
    const fetchProfile = async () => {
      let token = localStorage.getItem("authToken");

      const attemptFetch = async (tokenToUse) => {
        const response = await fetch("http://localhost:8000/api/employee/profile/", {
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
          },
        });

        if (response.status === 401) {
          throw new Error("Token expired");
        }

        return response.json();
      };

      try {
        // Try initial fetch
        const data = await attemptFetch(token);
        setProfileName(`${data.first_name} ${data.last_name}`);
        setProfileImage(`http://localhost:8000${data.image}`);
      } catch (err) {
        console.warn("Initial token failed, trying refresh...");

        try {
          const refreshToken = localStorage.getItem("refreshToken");

          const refreshRes = await fetch("http://localhost:8000/api/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (!refreshRes.ok) throw new Error("Refresh token invalid");

          const refreshData = await refreshRes.json();
          const newAccessToken = refreshData.access;

          localStorage.setItem("authToken", newAccessToken);

          // Retry original request with new token
          const data = await attemptFetch(newAccessToken);
          setProfileName(`${data.first_name} ${data.last_name}`);
          setProfileImage(`http://localhost:8000${data.image}`);
        } catch (refreshErr) {
          console.error("Refresh failed. User may need to log in again.");
          // Optionally redirect to login
        }
      }
    };

    fetchProfile();
  }, []);

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

      {/* Active Tickets Dropdown */}
      <div className="userNavbar-menu-dropdown">
        <NavLink
          to="/user/active-tickets/all-active-tickets"
          className="userNavbar-menu-item flex items-center gap-1"
          onClick={() => setActiveDropdown(null)} // close dropdown if open when navigating
        >
          Active Tickets
        </NavLink>
        <button
          className="userNavbar-menu-trigger"
          onClick={(e) => {
            e.preventDefault(); // prevent any navigation
            setActiveDropdown(activeDropdown === 'active' ? null : 'active');
          }}
          aria-label="Toggle Active Tickets dropdown"
        >
          <ChevronDown size={16} />
        </button>
        {activeDropdown === 'active' && (
          <div className="dropdown-content">
            <NavLink
              to="/user/active-tickets/all-active-tickets"
              onClick={() => setActiveDropdown(null)}
            >
              All Active Tickets
            </NavLink>
            <NavLink
              to="/user/active-tickets/new-tickets"
              onClick={() => setActiveDropdown(null)}
            >
              New Tickets
            </NavLink>
            <NavLink
              to="/user/active-tickets/open-tickets"
              onClick={() => setActiveDropdown(null)}
            >
              Open Tickets
            </NavLink>
            <NavLink
              to="/user/active-tickets/on-progress-tickets"
              onClick={() => setActiveDropdown(null)}
            >
              On Progress Tickets
            </NavLink>
            <NavLink
              to="/user/active-tickets/on-hold-tickets"
              onClick={() => setActiveDropdown(null)}
            >
              On Hold Tickets
            </NavLink>
            <NavLink
              to="/user/active-tickets/pending-tickets"
              onClick={() => setActiveDropdown(null)}
            >
              Pending Tickets
            </NavLink>
          </div>
        )}
      </div>

      {/* Ticket Records Dropdown */}
      <div className="userNavbar-menu-dropdown">
        <NavLink
          to="/user/ticket-records/all-ticket-records"
          className="userNavbar-menu-item flex items-center gap-1"
          onClick={() => setActiveDropdown(null)}
        >
          Ticket Records
        </NavLink>
        <button
          className="userNavbar-menu-trigger"
          onClick={(e) => {
            e.preventDefault();
            setActiveDropdown(activeDropdown === 'records' ? null : 'records');
          }}
          aria-label="Toggle Ticket Records dropdown"
        >
          <ChevronDown size={16} />
        </button>
        {activeDropdown === 'records' && (
          <div className="dropdown-content">
            <NavLink
              to="/user/ticket-records/all-ticket-records"
              onClick={() => setActiveDropdown(null)}
            >
              All Ticket Records
            </NavLink>
            <NavLink
              to="/user/ticket-records/closed-tickets"
              onClick={() => setActiveDropdown(null)}
            >
              Closed Tickets
            </NavLink>
            <NavLink
              to="/user/ticket-records/rejected-tickets"
              onClick={() => setActiveDropdown(null)}
            >
              Rejected Tickets
            </NavLink>
          </div>
        )}
      </div>


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
            src={profileImage || UserProfileImage}
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
