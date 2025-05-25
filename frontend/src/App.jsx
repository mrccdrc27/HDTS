import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import LoginPortal from './frontend/pages/authentication/login-portal.jsx';
import UserLogin from './frontend/pages/authentication/user/user_login.jsx';
import AdminLogin from './frontend/pages/authentication/admin/admin_login.jsx';
import CreateAccount from './frontend/pages/authentication/user/user_create-account.jsx';
import ForgotPassword from './frontend/pages/authentication/user/user_forgot-password.jsx';

import UserLayout from './frontend/user/layouts/user_layout.jsx';
  import UserHome from './frontend/user/pages/home/user_home.jsx';
  import FrequentlyAskedQuestions from './frontend/user/pages/faqs/user_faqs.jsx';

  import RequestTicket from './frontend/user/pages/request-ticket/user_request-ticket.jsx';
  import TicketDetailsLayout from './frontend/user/layouts/user_ticket-details-layout.jsx';

  import ActiveTickets from './frontend/user/pages/active-tickets/user_active-tickets-main.jsx';
  import TicketRecords from './frontend/user/pages/ticket-records/user_ticket-records-main.jsx';

import AdminLayout from './frontend/admin/layouts/admin_layout.jsx';
  import AdminDashboard from './frontend/admin/pages/dashboard/admin_dashboard.jsx';

  import RegisterUser from './frontend/admin/pages/register-user/admin_user-access-register-user.jsx';

  import AdminSubmittedTicketReview from './frontend/admin/pages/admin_submitted-ticket-review.jsx';

  import TicketManagement from './frontend/admin/pages/ticket-management/admin_ticket-management-main.jsx';

// POSSIBLE TANGGALIN
// import UserAccessAllUsers from './frontend/pages/admin/user-access/admin_user-access-all-users.jsx';
// import UserAccessEmployees from './frontend/pages/admin/user-access/admin_user-access-employees.jsx';
// import UserAccessTicketAgents from './frontend/pages/admin/user-access/admin_user-access-ticket-agents.jsx';
// import UserAccessSystemManagers from './frontend/pages/admin/user-access/admin_user-access-system-managers.jsx';

// import ReportsAgentPerformanceReport from './frontend/admin/pages/reports/admin_reports-agent-performance.js';
// import ReportsDepartmentReport from './frontend/admin/pages/reports/admin_reports-department.js';
// import ReportsSLAComplianceReport from './frontend/admin/pages/reports/admin_reports-sla-compliance.jsx';

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

          {/* USER HOME PAGE */}

          {/* DEFAULT REDIRECT ROUTE FOR USER */}
          <Route path="home" element={<UserHome />} /> 
          <Route path="frequently-asked-questions" element={<FrequentlyAskedQuestions />} />

          {/* USER TICKET PAGES */}
          <Route path="request-ticket" element={<RequestTicket />} />
          <Route path="ticket-details/:ticketNumber" element={<TicketDetailsLayout />} />

          {/* ACTIVE TICKETS */}
          <Route path="active-tickets" element={<ActiveTickets />} />
            
          {/* TICKET RECORDS*/}
          <Route path="ticket-records" element={<TicketRecords />} /> 
        </Route>

        {/* ADMIN LAYOUT ROUTES */}
        <Route path="/admin" element={<AdminLayout />}> 

          {/* DEFAULT REDIRECT ROUTE FOR ADMIN */}
          <Route path="dashboard" element={<AdminDashboard />} /> 

          <Route path="user-access-register-user" element={<RegisterUser />} />

          {/* ADMIN TICKET PAGES */}
          <Route path="submitted-ticket-review/:ticketNumber" element={<AdminSubmittedTicketReview />} />  
          <Route path="ticket-review/:ticketNumber" element={<TicketDetailsLayout />} /> 

          <Route path="ticket-management" element={<TicketManagement />} />  

          {/* TO BE REMOVED SOON */}
          {/* <Route path="user-access-all-users" element={<UserAccessAllUsers />} />
          <Route path="user-access-employees" element={<UserAccessEmployees />} />
          <Route path="user-access-ticket-agents" element={<UserAccessTicketAgents />} />
          <Route path="user-access-system-managers" element={<UserAccessSystemManagers />} />

           */}

          {/* <Route path="reports-agent-performance-report" element={<ReportsAgentPerformanceReport />} />
          <Route path="reports-department-report" element={<ReportsDepartmentReport />} />
          <Route path="reports-sla-compliance-report" element={<ReportsSLAComplianceReport />} /> */}
        </Route>   
      </Routes>
    </>
  );
};

export default App;
