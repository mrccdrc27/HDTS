import { Routes, Route } from 'react-router-dom';
import AdminProtectedRoute from './AdminProtectedRoute';

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
        <Route
          path="dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="user-access/register-user"
          element={
            <AdminProtectedRoute>
              <RegisterUser />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="ticket-management/:category"
          element={
            <AdminProtectedRoute>
              <TicketManagement />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="ticket-details"
          element={
            <AdminProtectedRoute>
              <AdminTicketDetails />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="user-access/:category"
          element={
            <AdminProtectedRoute>
              <UserAccess />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="account-details"
          element={
            <AdminProtectedRoute>
              <AdminUserAccountDetails />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="reports/:category"
          element={
            <AdminProtectedRoute>
              <AdminReports />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="report-information"
          element={
            <AdminProtectedRoute>
              <AdminReportInformation />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <AdminProtectedRoute>
              <AdminNotificationsPage />
            </AdminProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};