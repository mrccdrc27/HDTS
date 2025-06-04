import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin_user-access-approval-table.css';
import { users } from '/src/utilities/storage/userStorage.js';

import AdminUserAccessReviewUser from '../../components/modals/user-access/admin_user-access-review-user.jsx';

const ApprovalsTable = ({ filters = {} }) => {
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
    return users
      .filter((user) => {
        // Only 'Pending' users (case-insensitive)
        if (user.status?.toLowerCase() !== 'pending') return false;

        if (filters.department) {
          if (!user.department?.toLowerCase().includes(filters.department.toLowerCase())) return false;
        }

        if (filters.role) {
          if (user.role?.toLowerCase() !== filters.role.toLowerCase()) return false;
        }

        if (filters.date) {
          const userDate = new Date(user.dateCreated).toISOString().slice(0, 10);
          const filterDate = new Date(filters.date).toISOString().slice(0, 10);
          if (userDate !== filterDate) return false;
        }

        if (filters.searchTerm) {
          const searchLower = filters.searchTerm.toLowerCase();
          const matches = Object.values(user).some(val =>
            String(val || '').toLowerCase().includes(searchLower)
          );
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (!filters.sortBy) return 0;

        const { sortBy, sortDirection } = filters;

        const valA = a[sortBy] ?? '';
        const valB = b[sortBy] ?? '';

        // Sort dateCreated as date
        if (sortBy === 'dateCreated') {
          const dateA = new Date(valA).getTime();
          const dateB = new Date(valB).getTime();
          return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        }

        // Sort strings localeCompare
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        return 0;
      });
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
            filteredData.map((user) => (
              <tr
                key={user.companyId}
                className="clickable"
                onClick={() => navigate(`/admin/account-details/${user.companyId}`)}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      openReviewModal(user);
                    }}
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
