const AdminNotificationPopup = ({ notifications }) => {
  return (
    <div className="profile-popup">
      <p className="profile-name">Notifications</p>
      {notifications.map((notification, index) => (
        <div key={index} className="notification-item">
          {notification}
        </div>
      ))}
    </div>
  );
};

export default AdminNotificationPopup;
