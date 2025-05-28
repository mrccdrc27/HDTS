import "./admin_user-access-review-user.css";

const AdminUserAccessReviewUser = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        <h1>Admin User Access Review User</h1>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Department:</strong> {user.department}</p>
        {/* Add any additional fields you want to review */}
      </div>
    </div>
  );
};

export default AdminUserAccessReviewUser;
