import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import './admin_user-access-tables.css';

import AdminApproveUser from '../../components/modals/user-access/admin_user-access-approve-user';
import AdminRejectUser from '../../components/modals/user-access/admin_user-access-reject-user';
import AdminUpdateUser from '../../components/modals/user-access/admin_user-access-update-user';

const UserAccessTable = ({
  category,
  users,
  filters,
  sortBy,
  sortDirection,
  onSortChange,
  currentPage,
  itemsPerPage,
  onTotalItemsChange,
}) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (type, user) => {
    setModalType(type);
    setSelectedUser(user);
  };

  const closeModal = (success = false) => {
    if (selectedUser) {
      const userName = `${selectedUser.firstName} ${selectedUser.lastName}`;
      const actionMap = {
        approve: {
          success: `Approved user: ${userName}`,
          error: `Failed to approve user: ${userName}`
        },
        reject: {
          success: `Rejected user: ${userName}`,
          error: `Failed to reject user: ${userName}`
        },
        update: {
          success: `Updated user: ${userName}`,
          error: `Failed to update user: ${userName}`
        }
      };

      if (success) {
        toast.success(actionMap[modalType].success);
      } else {
        toast.error(actionMap[modalType].error);
      }
    }
    setModalType(null);
    setSelectedUser(null);
  };

  const filteredData = useMemo(() => {
    return users.filter((user) => {
      const matchesDepartment = filters.department
        ? user.department.toLowerCase().includes(filters.department.toLowerCase())
        : true;

      let matchesRole = true;
      if (category === 'users') {
        matchesRole = user.role.toLowerCase() === 'user';
      } else if (category === 'ticket-coordinators') {
        matchesRole = user.role.toLowerCase() === 'ticket coordinator';
      } else if (category === 'system-admins') {
        matchesRole = user.role.toLowerCase() === 'system admin';
      } else if (filters.role) {
        matchesRole = user.role.toLowerCase() === filters.role.toLowerCase();
      }

      const matchesStatus =
        category === 'for-approvals'
          ? user.status.toLowerCase() === 'pending'
          : filters.status
          ? user.status.toLowerCase() === filters.status.toLowerCase()
          : true;

      const userDate = new Date(user.dateCreated);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;
      const matchesDate =
        (!startDate || userDate >= startDate) &&
        (!endDate || userDate <= endDate);

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
  }, [filters, category, users]);

  useMemo(() => {
    onTotalItemsChange(filteredData.length);
  }, [filteredData, onTotalItemsChange]);

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

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

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
      <div className="user-access-table-scroll">
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
                  {sortBy === key && (
                    <span className="sort-indicator">
                      {sortDirection === 'asc' ? ' ▲' : ' ▼'}
                    </span>
                  )}
                </th>
              ))}
              <th className="user-access-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="user-access-no-results">
                  No users match the filter.
                </td>
              </tr>
            ) : (
              paginatedData.map((user) => (
                <tr
                  key={user.id}
                  className="user-access-row clickable"
                  onClick={() => navigate(`/admin/account-details/${user.id}`)}
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
                  <td
                    className="user-access-actions"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {user.status === 'Pending' ? (
                      <>
                        <button
                          className="user-access-approve-btn"
                          onClick={() => openModal('approve', user)}
                        >
                          Approve
                        </button>
                        <button
                          className="user-access-reject-btn"
                          onClick={() => openModal('reject', user)}
                        >
                          Reject
                        </button>
                      </>
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

        {modalType === 'update' && selectedUser && (
          <AdminUpdateUser
            user={selectedUser}
            onClose={closeModal}
          />
        )}
        {modalType === 'approve' && selectedUser && (
          <AdminApproveUser
            user={selectedUser}
            onClose={closeModal}
          />
        )}
        {modalType === 'reject' && selectedUser && (
          <AdminRejectUser
            user={selectedUser}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default UserAccessTable;