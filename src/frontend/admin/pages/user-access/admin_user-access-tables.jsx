import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import './admin_user-access-tables.css';

import AdminUserAccessReviewUser from '../../components/modals/user-access/admin_user-access-review-user.jsx';
import UpdateModal from '../../components/modals/user-access/admin_user-access-update-user.jsx';

import { users } from '/src/utilities/storage/userStorage.js';

const UserAccessTable = ({
  category,
  filters,
  sortBy,
  sortDirection,
  onSortChange,
}) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (type, user) => {
    setModalType(type);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
  };

  const filteredData = useMemo(() => {
    return users.filter((user) => {
      const matchesDepartment = filters.department
        ? user.department.toLowerCase().includes(filters.department.toLowerCase())
        : true;

      const matchesRole = filters.role
        ? user.role.toLowerCase() === filters.role.toLowerCase()
        : true;

      const matchesStatus = filters.status
        ? user.status.toLowerCase() === filters.status.toLowerCase()
        : category === 'for-approvals'
        ? user.status.toLowerCase() === 'pending'
        : true;

      const matchesDate = filters.date
        ? user.dateCreated === filters.date
        : true;

      const matchesSearch = filters.searchTerm
        ? Object.values(user).some((val) =>
            String(val).toLowerCase().includes(filters.searchTerm.toLowerCase())
          )
        : true;

      return (
        matchesDepartment &&
        matchesRole &&
        matchesStatus &&
        matchesDate &&
        matchesSearch
      );
    });
  }, [filters, category]);

  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      let valA = a[sortBy] ?? '';
      let valB = b[sortBy] ?? '';

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return 0;
    });
  }, [filteredData, sortBy, sortDirection]);

  const columns = [
    { label: 'Company ID', key: 'companyId' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'First Name', key: 'firstName' },
    { label: 'Middle Name', key: 'middleName' },
    { label: 'Suffix', key: 'suffix' },
    { label: 'Department', key: 'department' },
    { label: 'Role', key: 'role' },
    { label: 'Status', key: 'status' },
    { label: 'Date Created', key: 'dateCreated' },
  ];

  const handleSort = (key) => {
    if (onSortChange) {
      if (sortBy === key) {
        const nextDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        onSortChange(key, nextDirection);
      } else {
        onSortChange(key, 'asc');
      }
    }
  };

  return (
    <div className="user-access-table">
      <table className="user-access-table-element">
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th
                key={key}
                className="user-access-th"
                onClick={() => handleSort(key)}
                style={{ cursor: 'pointer' }}
              >
                {label}
              </th>
            ))}
            <th className="user-access-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="user-access-no-results">
                No users match the filter.
              </td>
            </tr>
          ) : (
            sortedData.map((user) => (
              <tr
                key={user.companyId || user.id || user.email}
                className="user-access-row clickable"
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
                  <span className={`user-access-status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.dateCreated}</td>
                <td className="user-access-actions" onClick={(e) => e.stopPropagation()}>
                  {user.status === 'Pending' ? (
                    <button
                      className="user-access-review-btn"
                      onClick={() => openModal('review', user)}
                    >
                      Review
                    </button>
                  ) : (
                    <button
                      className="user-access-update-btn"
                      onClick={() => openModal('update', user)}
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modalType === 'review' && selectedUser && (
        <AdminUserAccessReviewUser user={selectedUser} onClose={closeModal} />
      )}
      {modalType === 'update' && selectedUser && (
        <UpdateModal user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
};

export default UserAccessTable;
