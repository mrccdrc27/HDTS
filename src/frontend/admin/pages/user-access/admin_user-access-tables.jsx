import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import './admin_user-access-tables.css';

import ApproveModal from '../../components/modals/user-access/admin_user-access-approve-user.jsx';
import RejectModal from '../../components/modals/user-access/admin_user-access-reject-user.jsx';
import UpdateModal from '../../components/modals/user-access/admin_user-access-update-user.jsx';

import { users } from '/src/utilities/storage/userStorage.js';

const UserAccessTable = ({ category, filters }) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null); // 'approve', 'reject', 'update'
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

      return (
        matchesDepartment &&
        matchesRole &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [filters, category]);

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

  return (
    <div className="user-access-table">
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="no-results">
                No users match the filter.
              </td>
            </tr>
          ) : (
            filteredData.map((user) => (
              <tr key={user.companyId || user.id || user.email}>
                <td>{user.companyId}</td>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.middleName || '-'}</td>
                <td>{user.suffix || '-'}</td>
                <td>{user.department}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.dateCreated}</td>
                <td className="actions">
                  {user.status === 'Pending' ? (
                    <>
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/admin/user-access/account-review`)}
                      >
                        View
                      </button>
                      <button
                        className="approve-btn"
                        onClick={() => openModal('approve', user)}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => openModal('reject', user)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/admin/account-information`)}
                      >
                        View
                      </button>
                      <button
                        className="update-btn"
                        onClick={() => openModal('update', user)}
                      >
                        Update
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modals */}
      {modalType === 'approve' && selectedUser && (
        <ApproveModal user={selectedUser} onClose={closeModal} />
      )}
      {modalType === 'reject' && selectedUser && (
        <RejectModal user={selectedUser} onClose={closeModal} />
      )}
      {modalType === 'update' && selectedUser && (
        <UpdateModal user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
};

export default UserAccessTable;
