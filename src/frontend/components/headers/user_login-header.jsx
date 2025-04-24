import React from 'react';
import Logo from '/src/frontend/assets/smartsupport-logo.svg';
import '../../styles/components/user_login-header.css';

const LoginHeader = () => {
    return (
        <div className="login-header">
            <div>
                <img src={Logo} alt="Smart Support Logo" className="userNavbar-logo" />
            </div>
            <div>
                <h2>Smart<span>Support</span></h2>
                <p>AI-powered Helpdesk Ticketing System</p>
            </div>
        </div>
    );
}

export default LoginHeader;
