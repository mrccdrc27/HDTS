import { Routes, Route } from 'react-router-dom';

import LoginPortal from '../authentication/pages/login-portal.jsx';
import UserLogin from '../authentication/pages/user/user_login.jsx';
import CreateAccount from '../authentication/pages/user/user_create-account.jsx';
import ForgotPassword from '../authentication/pages/user/user_forgot-password.jsx';

import AdminLogin from '../authentication/pages/admin/admin_login.jsx';

export const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPortal />} />
    <Route path="/login/employee" element={<UserLogin />} /> 
    <Route path="/create-account" element={<CreateAccount />} />   
    <Route path="/forgot-password" element={<ForgotPassword />} /> 
    <Route path="/login/admin" element={<AdminLogin />} />   
  </Routes>
);
