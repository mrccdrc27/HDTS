import './admin_user-access-reject-user.css';

const AdminRejectUser = ({ user, onClose }) => {
  const handleReject = () => {
    // TODO: Replace this with actual rejection logic (e.g. update storage, API call)
    console.log(`User ${user.firstName} ${user.lastName} rejected.`);
    onClose();
  };

  return (
    <div className="user-access-modal-overlay">
      <div className="user-access-modal">
        <h2>Reject User</h2>
        <p>Are you sure you want to reject the following user?</p>
        <ul className="user-info-summary">
          <li><strong>Name:</strong> {user.firstName} {user.lastName}</li>
          <li><strong>Company ID:</strong> {user.companyId}</li>
          <li><strong>Role:</strong> {user.role}</li>
          <li><strong>Department:</strong> {user.department}</li>
        </ul>
        <div className="modal-actions">
          <button className="reject-btn" onClick={handleReject}>Reject</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminRejectUser;
