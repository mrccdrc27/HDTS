import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/smartsupport-logo.svg';

const LoginHeader = () => {
    return (
        <div>
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ cursor: 'pointer' }}>
                    <div>
                        <img src={Logo} alt="Smart Support Logo" className="userNavbar-logo" />
                    </div>
                    <div>
                        <h2>Smart Support</h2>
                        <p>AI-powered Helpdesk Ticketing System</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default LoginHeader;



