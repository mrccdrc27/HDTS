// src/frontend/admin/pages/NotificationsPage.jsx
import { notifications } from '../../components/popups/admin_navbar-notifications.jsx';

const AdminNotificationsPage = () => {
  return (
    <div className="notifications-page">
      <h1>All Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications to display.</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((note, index) => (
            <li key={index} className="notification-item">
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotificationsPage;
