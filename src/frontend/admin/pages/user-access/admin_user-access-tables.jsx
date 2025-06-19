import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import './admin_user-access-tables.css';

import AdminUserAccessReviewUser from '../../components/modals/user-access/admin_user-access-review-user.jsx';
import UpdateModal from '../../components/modals/user-access/admin_user-access-update-user.jsx';

const UserAccessTable = ({ category, filters }) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Helper to refresh token
  const refreshToken = async () => {
    const refresh = localStorage.getItem('adminRefreshToken');
    if (!refresh) return null;
    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.access) {
      localStorage.setItem('adminAuthToken', data.access);
      return data.access;
    }
    return null;
  };

  // Fetch employees with refresh logic
  const fetchEmployees = async () => {
    let access = localStorage.getItem('adminAuthToken');
    let response = await fetch('http://127.0.0.1:8000/api/employees/', {
      headers: { Authorization: `Bearer ${access}` },
    });

    if (response.status === 401) {
      // Try refresh
      access = await refreshToken();
      if (!access) {
        setUsers([]);
        return;
      }
      response = await fetch('http://127.0.0.1:8000/api/employees/', {
        headers: { Authorization: `Bearer ${access}` },
      });
    }

    if (!response.ok) {
      setUsers([]);
      return;
    }

    const data = await response.json();
    if (!Array.isArray(data) && !Array.isArray(data.results)) {
      setUsers([]);
      return;
    }
    const mapped = (data.results || data).map(user => ({
      companyId: user.company_id,
      lastName: user.last_name,
      firstName: user.first_name,
      middleName: user.middle_name,
      suffix: user.suffix,
      department: user.department,
      role: user.role,
      status: user.status,
      dateCreated: user.date_joined || user.date_created,
      id: user.id,
      email: user.email,
    }));
    setUsers(mapped);
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line
  }, []);

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
      // Filter by department and role from filters
      const matchesDepartment = filters.department
        ? user.department === filters.department
        : true;
      const matchesRole = filters.role
        ? user.role === filters.role
        : true;

      // Filter by category (route)
      let matchesCategory = true;
      if (category === 'system-admins') matchesCategory = user.role === 'System Admin';
      if (category === 'ticket-agents') matchesCategory = user.role === 'Ticket Coordinator';
      if (category === 'users') matchesCategory = user.role === 'Employee';
      if (category === 'for-approvals') matchesCategory = user.status && user.status.toLowerCase() === 'pending';

      return matchesDepartment && matchesRole && matchesCategory;
    });
  }, [filters, category, users]);

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

  const pendingUsers = users.filter(user => user.status && user.status.toLowerCase() === 'pending');

  return (
    <div className="user-access-table">
      <table className="user-access-table-element">
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key} className="user-access-th">{label}</th>
            ))}
            <th className="user-access-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="user-access-no-results">
                No users found.
              </td>
            </tr>
          ) : (
            filteredData.map((user) => (
              <tr key={user.companyId || user.id || user.email} className="user-access-row">
                <td>{user.companyId}</td>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.middleName || '-'}</td>
                <td>{user.suffix || '-'}</td>
                <td>{user.department}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`user-access-status ${user.status?.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.dateCreated}</td>
                <td className="user-access-actions">
                  {user.status === 'Pending' ? (
                    <button
                      className="user-access-review-btn"
                      onClick={() => openModal('review', user)}
                    >
                      Review
                    </button>
                  ) : (
                    <>
                      <button
                        className="user-access-view-btn"
                        onClick={() => navigate(`/admin/account-details`)}
                      >
                        View
                      </button>
                      <button
                        className="user-access-update-btn"
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
