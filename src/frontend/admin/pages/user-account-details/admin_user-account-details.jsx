import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserById } from '/src/utilities/storage/userStorage.js';
import AdminUserAccountAuditLog from './admin_user-account-audit-log';

const AdminUserAccountDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchedUser = getUserById(userId);
      setUser(fetchedUser);
    }
  }, [userId]);

  if (!user) {
    return <div>User not found or loading...</div>;
  }

  return (
    <div>
      <h1>Admin User Account Details</h1>
      <div className="user-details">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Company ID:</strong> {user.companyId}</p>
        <p><strong>Name:</strong> {`${user.firstName} ${user.middleName || ''} ${user.lastName} ${user.suffix || ''}`.replace(/\s+/g, ' ').trim()}</p>
        <p><strong>Department:</strong> {user.department}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={`user-access-status ${user.status.toLowerCase()}`}>
            {user.status}
          </span>
        </p>
        <p><strong>Date Created:</strong> {user.dateCreated}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.profileImage && (
          <img
            src={user.profileImage}
            alt={`${user.firstName} ${user.lastName}`}
            style={{ maxWidth: '150px', borderRadius: '8px' }}
          />
        )}
      </div>
      <hr />
      <div>
        <AdminUserAccountAuditLog userId={user.id} />
      </div>
    </div>
  );
};

export default AdminUserAccountDetails;
