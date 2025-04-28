import React from 'react';
import Logo from '/src/frontend/assets/smartsupport-logo.svg';
import '../../styles/components/authentication/user_login-header.css';

const UserLoginHeader = () => {
  return (
    <div className="login-header">
      <div>
        <img src={Logo} alt="Smart Support Logo" className="user-navbar-logo" />
      </div>
      <div>
        <h2>Smart<span>Support</span></h2>
        <p>AI-powered Helpdesk Ticketing System</p>
      </div>
    </div>
  );
}

export default UserLoginHeader;
