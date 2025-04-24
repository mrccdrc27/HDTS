import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../../components/headers/user_login-header.jsx';

const LoginPortal = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'employee') {
      navigate('/login/employee'); // or '/employee/login'
    } else if (role === 'admin') {
      navigate('/login/admin'); // or '/admin/login'
    }
  };

  return (
    <div className="login-portal-wrapper">
      <LoginHeader />
      <div className="login-portal">
        <h1>Smart Ticketing</h1>
        <h2>for Better Support</h2>
        <p>“From submission to resolution, we've got your workflow covered”</p>
        <button onClick={() => handleRoleSelection('employee')}>Employee</button>
        <button onClick={() => handleRoleSelection('admin')}>Admin</button>
      </div>
      <div>
        <h1>Picture</h1>
      </div>
    </div>
  );
};

export default LoginPortal;
