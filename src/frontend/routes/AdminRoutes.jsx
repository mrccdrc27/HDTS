// src/routes/AdminRoutes.jsx
import { Routes, Route } from 'react-router-dom';

import AdminLayout from '../admin/layouts/admin_layout.jsx';
import AdminDashboard from '../admin/pages/dashboard/admin_dashboard.jsx';
import RegisterUser from '../admin/pages/register-user/admin_user-access-register-user.jsx'; 

import TicketManagement from '../admin/pages/ticket-management/admin_ticket-management-main.jsx';
import AdminTicketDetails from '../admin/pages/ticket-details/admin_ticket-details-main.jsx';

import UserAccess from '../admin/pages/user-access/admin_user-access-main.jsx';
import AdminUserAccountDetails from '../admin/pages/user-account-details/admin_user-account-details.jsx';
import AdminReports from '../admin/pages/reports/admin_reports-main.jsx';
import AdminReportInformation from '../admin/pages/report-information/admin_report-information.jsx';

import AdminNotificationsPage from '../admin/pages/notifications/admin_notifications.jsx';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="user-access/register-user" element={<RegisterUser />} />
        
        <Route path="ticket-management/:category" element={<TicketManagement />} />
        <Route path="ticket-details/:ticketNumber" element={<AdminTicketDetails />} />
 
        <Route path="user-access/:category" element={<UserAccess />} />

        <Route path="account-details/:userId" element={<AdminUserAccountDetails />} />

        <Route path="reports/:category" element={<AdminReports />} />
        <Route path="report-information/:category" element={<AdminReportInformation />} />

        <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
      </Route>
    </Routes>
  );
};
