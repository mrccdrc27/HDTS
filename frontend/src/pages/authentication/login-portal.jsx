import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="login-portal">
      <h1>Welcome to the Ticketing System</h1>
      <p>Please select your role to log in</p>
      <button onClick={() => handleRoleSelection('employee')}>Employee</button>
      <button onClick={() => handleRoleSelection('admin')}>Admin</button>
    </div>
  );
};

export default LoginPortal;
