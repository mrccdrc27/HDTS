import './admin_user-access-update-user.css';

const UpdateModal = ({ user, onClose }) => (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h2>Update User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Insert update logic here
          onClose();
        }}
      >
        <label>
          First Name:
          <input defaultValue={user.firstName} />
        </label>
        <label>
          Last Name:
          <input defaultValue={user.lastName} />
        </label>
        <label>
          Department:
          <input defaultValue={user.department} />
        </label>
        {/* Add more fields as needed */}
        <div className="modal-actions">
          <button type="submit" className="confirm-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
);

export default UpdateModal;