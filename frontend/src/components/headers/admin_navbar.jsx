import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '/src/frontend/assets/smartsupport-logo.svg';
import { ChevronDown, Bell } from 'lucide-react';
import DefaultAvatar from '/src/frontend/assets/employee-profile.svg';

const AdminNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
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
        <NavLink to="/admin/dashboard" className="userNavbar-left-item">
          <img src={Logo} alt="Smart Support Logo" className="userNavbar-logo" />
          <h2>Smart Support</h2>
        </NavLink>
      </div>

      <div className="userNavbar-menu">
        <div>
          <NavLink to="/admin/dashboard" className="userNavbar-menu-item">Dashboard</NavLink>
        </div>

        {/* Dropdown for Ticket Management */}
        <div className="userNavbar-menu-dropdown">
          <div className="userNavbar-menu-trigger" onClick={() => toggleDropdown('ticket-management')}>
            <NavLink to="/admin/ticket-management-all-tickets" className="userNavbar-menu-item">Ticket Management</NavLink>
            <ChevronDown size={18} />
          </div>
          {activeDropdown === 'ticket-management' && (
            <div className="dropdown-content">
              <NavLink to="/admin/ticket-management-all-tickets">All Tickets</NavLink>
              <NavLink to="/admin/ticket-management-open-tickets">Open Tickets</NavLink>
              <NavLink to="/admin/ticket-management-approved-tickets">Approved Tickets</NavLink>
              <NavLink to="/admin/ticket-management-on-progress-tickets">On Progress Tickets</NavLink>
              <NavLink to="/admin/ticket-management-on-hold-tickets">On hold Tickets</NavLink>
              <NavLink to="/admin/ticket-management-pending-tickets">Pending Tickets</NavLink>
            </div>
          )}
        </div>

        {/* Dropdown for User Access */}
        <div className="userNavbar-menu-dropdown">
          <div className="userNavbar-menu-trigger" onClick={() => toggleDropdown('user-access')}>
            <NavLink to="/admin/user-access-all-users" className="userNavbar-menu-item">User Access</NavLink>
            <ChevronDown size={18} />
          </div>
          {activeDropdown === 'user-access' && (
            <div className="dropdown-content">
              <NavLink to="/admin/user-access-all-users">All Users</NavLink>
              <NavLink to="/admin/user-access-employees">Employees</NavLink>
              <NavLink to="/admin/user-access-ticket-agents">Ticket Agents</NavLink>
              <NavLink to="/admin/user-access-system-managers">System Managers</NavLink>
            </div>
          )}
        </div>

        {/* Dropdown for Reports */}
        <div className="userNavbar-menu-dropdown">
          <div className="userNavbar-menu-trigger" onClick={() => toggleDropdown('reports')}>
            <NavLink to="/admin/reports-agent-performance-report" className="userNavbar-menu-item">Reports</NavLink>
            <ChevronDown size={18} />
          </div>
          {activeDropdown === 'reports' && (
            <div className="dropdown-content">
              <NavLink to="/admin/reports-agent-performance-report">Agent Performance Report</NavLink>
              <NavLink to="/admin/reports-department-report">Department Report</NavLink>
              <NavLink to="/admin/reports-sla-compliance-report">SLA Compliance Report</NavLink>
            </div>
          )}
        </div>

        <div>
          <Bell size={18} className="userNavbar-menu-item" />
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
              <button className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              <Link to="/">Logout</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
