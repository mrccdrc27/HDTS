// src/frontend/admin/popups/admin_navbar-notifications.jsx
import { Link } from 'react-router-dom';

export const notifications = [
  'New ticket #TX0456 has been created.',
  'Agent John assigned to ticket #TX0123.',
  'SLA breach warning for ticket #TX0789.',
  'Test.',
];

export const getNotificationCount = () => notifications.length;

const AdminNavbarNotifications = () => {
  return (
    <div className="profile-popup">
      <p className="profile-name">Notifications</p>
      {notifications.length === 0 ? (
        <p className="no-notifications">No new notifications</p>
      ) : (
        <>
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              {notification}
            </div>
          ))}
          <div className="see-all-link">
            <Link to="/admin/notifications">See all</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminNavbarNotifications;
