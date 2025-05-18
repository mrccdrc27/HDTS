import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import LoginPortal from './frontend/pages/authentication/login-portal.jsx';
import UserLogin from './frontend/pages/authentication/user/user_login.jsx';
import AdminLogin from './frontend/pages/authentication/admin/admin_login.jsx';
import CreateAccount from './frontend/pages/authentication/user/user_create-account.jsx';
import ForgotPassword from './frontend/pages/authentication/user/user_forgot-password.jsx';

import UserLayout from './frontend/layouts/user_layout.jsx';
import UserHome from './frontend/pages/user/home/user_home.jsx';
import FrequentlyAskedQuestions from './frontend/pages/user/user_faqs.jsx';

import ActiveTickets from './frontend/pages/user/active-tickets/user_active-tickets-main.jsx';

import TicketRecords from './frontend/pages/user/ticket-records/user_ticket-records-main.jsx';

import RequestTicket from './frontend/pages/user/user_request-ticket.jsx';

import TicketDetailsLayout from './frontend/layouts/user_ticket-details-layout.jsx';

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
          <Route path="ticket-details/:ticketNumber" element={<TicketDetailsLayout />} />

          {/* ACTIVE TICKETS GROUP */}
          <Route path="active-tickets" element={<ActiveTickets />} />
            
          {/* TICKET RECORDS ROUTES */}
          <Route path="ticket-records" element={<TicketRecords />} /> 
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
