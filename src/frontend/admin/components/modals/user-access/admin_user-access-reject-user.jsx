import './admin_user-access-reject-user.css';

const RejectModal = ({ user, onClose }) => (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h2>Reject User</h2>
      <p>Are you sure you want to reject <strong>{user.firstName} {user.lastName}</strong>?</p>
      <textarea
        placeholder="Optional: Provide a reason for rejection"
        rows={4}
        className="modal-textarea"
      />
      <div className="modal-actions">
        <button className="confirm-btn" onClick={() => {
          // Insert reject logic here
          onClose();
        }}>Confirm</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
);

export default RejectModal;