// src/routes/AdminRoutes.jsx
import { Routes, Route } from 'react-router-dom';

import AdminLayout from '../admin/layouts/admin_layout.jsx';
import AdminDashboard from '../admin/pages/dashboard/admin_dashboard.jsx';
import RegisterUser from '../admin/pages/register-user/admin_user-access-register-user.jsx';
import AdminSubmittedTicketReview from '../admin/pages/admin_submitted-ticket-review.jsx';
import TicketManagement from '../admin/pages/ticket-management/admin_ticket-management-main.jsx';
import TicketDetailsLayout from '../user/layouts/user_ticket-details-layout.jsx';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="user-access-register-user" element={<RegisterUser />} />
        <Route path="submitted-ticket-review/:ticketNumber" element={<AdminSubmittedTicketReview />} />
        <Route path="ticket-review/:ticketNumber" element={<TicketDetailsLayout />} />
        <Route path="ticket-management" element={<TicketManagement />} />
      </Route>
    </Routes>
  );
};
