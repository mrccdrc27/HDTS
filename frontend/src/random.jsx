import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LogInPortal from "../pages/authentication/login-portal.jsx";

import UserLogin from "../pages/authentication/user/user_login.jsx";
import CreateAccount from "../pages/authentication/user/user_create-account.jsx";
import ForgotPassword from "../pages/authentication/user/user_forgot-password.jsx";

import Home from "../pages/user/user_home.jsx";
import AllTickets from "../pages/user/user_active-tickets/user_all-tickets.jsx";
import TicketHistory from "../pages/user/user_ticket-records/user_ticket-history.jsx";

import AdminLogin from "../pages/authentication/admin/admin_login.jsx";

import AdminDashboard from "../pages/admin/admin_dashboard.jsx";

const Authentication = () => {

  return (
    <>
      <Router>
        <Routes>  
          <Route path="/" element={<LogInPortal />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/admin-login" element={<AdminLogin />} /> 

          <Route path="/home" element={<Home />} />
          <Route path="/all-tickets" element={<AllTickets />} />
          <Route path="/ticket-history" element={<TicketHistory />} /> 

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>   
  ) 
}

export default Authentication;

