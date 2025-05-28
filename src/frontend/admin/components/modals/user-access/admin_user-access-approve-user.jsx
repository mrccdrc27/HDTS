import './admin_user-access-approve-user.css';

const ApproveModal = ({ user, onClose }) => (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h2>Approve User</h2>
      <p>Are you sure you want to approve <strong>{user.firstName} {user.lastName}</strong>?</p>
      <div className="modal-actions">
        <button className="confirm-btn" onClick={() => {
          // Insert approve logic here
          onClose();
        }}>Confirm</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
);

export default ApproveModal;