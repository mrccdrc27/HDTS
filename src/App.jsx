import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import LoginPortal from './frontend/pages/authentication/login-portal.jsx';
import UserLogin from './frontend/pages/authentication/user/user_login.jsx';
import AdminLogin from './frontend/pages/authentication/admin/admin_login.jsx';
import CreateAccount from './frontend/pages/authentication/user/user_create-account.jsx';
import ForgotPassword from './frontend/pages/authentication/user/user_forgot-password.jsx';

import UserLayout from './frontend/layouts/user_layout.jsx';
import UserHome from './frontend/pages/user/user_home.jsx';
import FrequentlyAskedQuestions from './frontend/pages/user/user_faqs.jsx';
import AllTickets from './frontend/pages/user/active-tickets/user_all-tickets.jsx';
import OnHoldTickets from './frontend/pages/user/active-tickets/user_on-hold-tickets.jsx';
import OpenTickets from './frontend/pages/user/active-tickets/user_open-tickets.jsx';
import OnProgressTickets from './frontend/pages/user/active-tickets/user_on-progress-tickets.jsx';
import PendingTickets from './frontend/pages/user/active-tickets/user_pending-tickets.jsx';
import AllRecords from './frontend/pages/user/ticket-records/user_all-records.jsx';
import ClosedTickets from './frontend/pages/user/ticket-records/user_closed-tickets.jsx';
import RejectedTickets from './frontend/pages/user/ticket-records/user_rejected-tickets.jsx';
import RequestTicket from './frontend/pages/user/user_request-ticket.jsx';
import TicketDetails from './frontend/pages/user/ticket-records/user_ticket-details.jsx';

import AdminLayout from './frontend/layouts/admin_layout.jsx';
import AdminDashboard from './frontend/pages/admin/admin_dashboard.jsx';
import TicketManagementAllTickets from './frontend/pages/admin/ticket-management/admin_ticket-management-all-tickets.jsx';
import TicketManagementOpenTickets from './frontend/pages/admin/ticket-management/admin_ticket-management-open-tickets.jsx';
import TicketManagementApprovedTickets from './frontend/pages/admin/ticket-management/admin_ticket-management-approved-tickets.jsx';
import TicketManagementOnProgressTickets from './frontend/pages/admin/ticket-management/admin_ticket-management-on-progress-tickets.jsx';
import TicketManagementOnHoldTickets from './frontend/pages/admin/ticket-management/admin_ticket-management-on-hold-tickets.jsx';
import TicketManagementPendingTickets from './frontend/pages/admin/ticket-management/admin_ticket-management-pending-tickets.jsx';
import UserAccessAllUsers from './frontend/pages/admin/user-access/admin_user-access-all-users.jsx';
import UserAccessEmployees from './frontend/pages/admin/user-access/admin_user-access-employees.jsx';
import UserAccessTicketAgents from './frontend/pages/admin/user-access/admin_user-access-ticket-agents.jsx';
import UserAccessSystemManagers from './frontend/pages/admin/user-access/admin_user-access-system-managers.jsx';
import RegisterUser from './frontend/pages/admin/user-access/admin_user-access-register-user.jsx';
import ReportsAgentPerformanceReport from './frontend/pages/admin/reports/admin_reports-agent-performance.jsx';
import ReportsDepartmentReport from './frontend/pages/admin/reports/admin_reports-department.jsx';
import ReportsSLAComplianceReport from './frontend/pages/admin/reports/admin_reports-sla-compliance.jsx';

import NotFound from './frontend/pages/others/404-not-found.jsx';

const App = () => {
  const location = useLocation();
    
  useEffect(() => {
    console.log('Navigated to:', location.pathname);
  }, [location]);
    
  return (
    <>
      <Routes>
        {/* DEFAULT ROUTE — POSSIBLE TO CHANGE */}
        <Route path="/" element={<LoginPortal />} />  

        {/* NOT FOUND PAGE */}
        <Route path="*" element={<NotFound />} />

        {/* AUTHENTICATION ROUTES — EMPLOYEE */}
        <Route path="/login/employee" element={<UserLogin />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        
        {/* AUTHENTICATION ROUTES — ADMIN */}
        <Route path="/login/admin" element={<AdminLogin />} />

        {/* USER LAYOUT ROUTES */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="home" element={<UserHome />} />

          <Route path="frequently-asked-questions" element={<FrequentlyAskedQuestions />} />
          <Route path="request-ticket" element={<RequestTicket />} />
          <Route path="ticket-details" element={<TicketDetails />} />

          <Route path="all-tickets" element={<AllTickets />} />
          <Route path="open-tickets" element={<OpenTickets />} />
          <Route path="on-progress-tickets" element={<OnProgressTickets />} />
          <Route path="on-hold-tickets" element={<OnHoldTickets />} />
          <Route path="pending-tickets" element={<PendingTickets />} />

          {/* TICKET RECORDS ROUTES */}
          <Route path="all-records" element={<AllRecords />} />
          <Route path="closed-tickets" element={<ClosedTickets />} />
          <Route path="rejected-tickets" element={<RejectedTickets />} />

        </Route>

        {/* ADMIN LAYOUT ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="ticket-management-all-tickets" element={<TicketManagementAllTickets />} />
          <Route path="ticket-management-open-tickets" element={<TicketManagementOpenTickets />} />
          <Route path="ticket-management-approved-tickets" element={<TicketManagementApprovedTickets />} />
          <Route path="ticket-management-on-progress-tickets" element={<TicketManagementOnProgressTickets />} />
          <Route path="ticket-management-on-hold-tickets" element={<TicketManagementOnHoldTickets />} />
          <Route path="ticket-management-pending-tickets" element={<TicketManagementPendingTickets />} />

          <Route path="user-access-all-users" element={<UserAccessAllUsers />} />
          <Route path="user-access-employees" element={<UserAccessEmployees />} />
          <Route path="user-access-ticket-agents" element={<UserAccessTicketAgents />} />
          <Route path="user-access-system-managers" element={<UserAccessSystemManagers />} />
          <Route path="user-access-register-user" element={<RegisterUser />} />

          <Route path="reports-agent-performance-report" element={<ReportsAgentPerformanceReport />} />
          <Route path="reports-department-report" element={<ReportsDepartmentReport />} />
          <Route path="reports-sla-compliance-report" element={<ReportsSLAComplianceReport />} />
        </Route>  

      </Routes>
    </>
  );
};

export default App;
