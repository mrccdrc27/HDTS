import { Routes, Route } from 'react-router-dom';

import LoginPortal from '../pages/authentication/login-portal.jsx';
import UserLogin from '../pages/authentication/user/user_login.jsx';
import AdminLogin from '../pages/authentication/admin/admin_login.jsx';
import CreateAccount from '../pages/authentication/user/user_create-account.jsx';
import ForgotPassword from '../pages/authentication/user/user_forgot-password.jsx';

export const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPortal />} />
    <Route path="/login/employee" element={<UserLogin />} />
    <Route path="/create-account" element={<CreateAccount />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/login/admin" element={<AdminLogin />} />
  </Routes>
);
