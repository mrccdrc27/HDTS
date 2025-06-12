import './admin_user-access-update-user.css';
import { getUsers, saveUsers } from '../../../../../utilities/storage/userStorage';
import { useState } from 'react';

const AdminUpdateUser = ({ user, onClose }) => {
  const [status, setStatus] = useState(user.status);
  const [imageError, setImageError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();
    const updatedUsers = users.map(u =>
      u.id === user.id ? { ...u, status } : u
    );
    saveUsers(updatedUsers);
    onClose();
  };

  const handleImageError = () => setImageError(true);

  const formatFullName = (user) => {
    return [user.firstName, user.middleName, user.lastName, user.suffix]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Update User</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="user-details-section">
            <div className="profile-block">
              {user.profileImage && !imageError ? (
                <img
                  src={user.profileImage}
                  alt={formatFullName(user)}
                  onError={handleImageError}
                  className="profile-image"
                />
              ) : (
                <div className="profile-initials">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </div>
              )}
              <div className="profile-info">
                <h3>{formatFullName(user)}</h3>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="details-grid">
              <div><span>Company ID</span><strong>{user.companyId}</strong></div>
              <div><span>Department</span><strong>{user.department}</strong></div>
              <div><span>Role</span><strong className="role-badge">{user.role}</strong></div>
              <div><span>Date Created</span><strong>{new Date(user.dateCreated).toLocaleDateString()}</strong></div>
              <div>
                <span>Current Status</span>
                <strong className={`status-badge status-${user.status.toLowerCase()}`}>
                  {user.status}
                </strong>
              </div>
            </div>
          </div>

          <div className="status-update">
            <label>
              <span>New Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </label>

            {status !== user.status && (
              <div className="status-preview">
                Status will change from
                <span className={`status-badge-small status-${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
                to
                <span className={`status-badge-small status-${status.toLowerCase()}`}>
                  {status}
                </span>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button 
              type="submit" 
              className="btn-save"
              disabled={status === user.status}
            >
              Save Changes
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateUser;
