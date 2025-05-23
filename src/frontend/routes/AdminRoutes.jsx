// src/routes/AdminRoutes.jsx
import { Routes, Route } from 'react-router-dom';

import AdminLayout from '../admin/layouts/admin_layout.jsx';
import AdminDashboard from '../admin/pages/dashboard/admin_dashboard.jsx';
import RegisterUser from '../admin/pages/register-user/admin_user-access-register-user.jsx'; 
import AdminSubmittedTicketReview from '../admin/pages/submitted-ticket-review/admin_submitted-ticket-review.jsx';
import TicketManagement from '../admin/pages/ticket-management/admin_ticket-management-main.jsx';
import TicketDetailsLayout from '../user/layouts/user_ticket-details-layout.jsx';
import UserAccess from '../admin/pages/user-access/admin_user-access-main.jsx';
import AdminPendingAccountsReview from '../admin/pages/pending-accounts-review/admin_pending-accounts-review.jsx';
import AdminReports from '../admin/pages/reports/admin_reports-main.jsx';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="user-access-register-user" element={<RegisterUser />} />
        <Route path="submitted-ticket-review/:ticketNumber" element={<AdminSubmittedTicketReview />} />
        <Route path="ticket-review/:ticketNumber" element={<TicketDetailsLayout />} />
        
        <Route path="ticket-management" element={<TicketManagement />} />
 
        <Route path="user-access/:category" element={<UserAccess />} />

        <Route path="user-access/account-review" element={<AdminPendingAccountsReview />} />

        <Route path="reports/agent-performance-report" element={<AdminReports />} />
      </Route>
    </Routes>
  );
};
