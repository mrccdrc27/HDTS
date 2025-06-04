import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin_user-access-approval-table.css';
import { users } from '/src/utilities/storage/userStorage.js';

import AdminUserAccessReviewUser from '../../components/modals/user-access/admin_user-access-review-user.jsx';

const ApprovalsTable = ({ filters }) => {
  const navigate = useNavigate();
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openReviewModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const filteredData = useMemo(() => {
    let result = users.filter((user) => {
      if (user.status.toLowerCase() !== 'pending') return false;

      if (filters.department && !user.department.toLowerCase().includes(filters.department.toLowerCase())) {
        return false;
      }

      if (filters.role && user.role.toLowerCase() !== filters.role.toLowerCase()) {
        return false;
      }

      if (filters.date && user.dateCreated !== filters.date) {
        return false;
      }

      return true;
    });

    if (filters.sortBy) {
      result = [...result].sort((a, b) => {
        const valA = a[filters.sortBy] ?? '';
        const valB = b[filters.sortBy] ?? '';

        if (typeof valA === 'string' && typeof valB === 'string') {
          return filters.sortDirection === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        return 0;
      });
    }

    return result;
  }, [filters]);

  const columns = [
    'Company ID',
    'Last Name',
    'First Name',
    'Middle Name',
    'Suffix',
    'Department',
    'Role',
    'Status',
    'Date Created',
  ];

  return (
    <div className="user-access-approval-table">
      <table>
        <thead>
          <tr>
            {columns.map((label) => (
              <th key={label}>{label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {filteredData.length === 0 ? (
    <tr>
      <td colSpan={columns.length + 1} className="user-access-approval-table-no-results">
        No users match the filter.
      </td>
    </tr>
  ) : (
    filteredData.map((user, idx) => (
      <tr
        key={idx}
        className="clickable"
        onClick={() => navigate(`/admin/account-details/${user.companyId}`)} // Or whatever route you want
      >
        <td>{user.companyId}</td>
        <td>{user.lastName}</td>
        <td>{user.firstName}</td>
        <td>{user.middleName || '-'}</td>
        <td>{user.suffix || '-'}</td>
        <td>{user.department}</td>
        <td>{user.role}</td>
                <td>
                  <span className="status pending">{user.status}</span>
                </td>
                <td>{user.dateCreated}</td>
                <td className="user-access-approval-table-actions">
                  <button
                    className="user-access-approval-table-review-btn"
                    onClick={() => openReviewModal(user)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isModalOpen && selectedUser && (
        <AdminUserAccessReviewUser user={selectedUser} onClose={closeReviewModal} />
      )}
    </div>
  );
};

export default ApprovalsTable;
