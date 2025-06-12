import './admin_user-access-approve-user.css';
import { getUsers, saveUsers } from '../../../../../utilities/storage/userStorage';

const AdminApproveUser = ({ user, onClose }) => {
  const handleApprove = () => {
    const users = getUsers();
    const updatedUsers = users.map(u =>
      u.id === user.id ? { ...u, status: 'Active' } : u
    );
    saveUsers(updatedUsers);
    onClose();
  };

  return (
    <div className="user-access-modal-overlay">
      <div className="user-access-modal">
        <h2>Approve User</h2>
        <p>Are you sure you want to approve the following user?</p>
        <ul className="user-info-summary">
          <li><strong>Name:</strong> {user.firstName} {user.lastName}</li>
          <li><strong>Company ID:</strong> {user.companyId}</li>
          <li><strong>Role:</strong> {user.role}</li>
          <li><strong>Department:</strong> {user.department}</li>
        </ul>
        <div className="modal-actions">
          <button className="approve-btn" onClick={handleApprove}>Approve</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminApproveUser;
