import React from 'react';
import Logo from '/src/frontend/assets/smartsupport-logo.svg';
import '../../styles/components/authentication/user_create-account-forgot-password-header.css';

const CreateAccountForgotPasswordHeader = () => {
    return (
        <div className="login-header">
            <div>
                <img src={Logo} alt="Smart Support Logo" className="userNavbar-logo" />
            </div>
            <div>
                <h4>Smart<span>Support</span></h4>
                <p>AI-powered Helpdesk Ticketing System</p>
            </div>
        </div>
    );
}

export default CreateAccountForgotPasswordHeader;