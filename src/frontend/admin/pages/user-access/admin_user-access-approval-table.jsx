import { useEffect, useMemo, useState } from 'react';
import './admin_user-access-approval-table.css';

import AdminUserAccessReviewUser from '../../components/modals/user-access/admin_user-access-review-user.jsx';

const ApprovalsTable = ({ filters }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  // --- Add refreshToken helper ---
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
  // --- End refreshToken helper ---

  const openReviewModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const filteredData = useMemo(() => {
    return users.filter((user) => {
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
  }, [filters, users]);

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

  useEffect(() => {
    const fetchUsers = async () => {
      let access = localStorage.getItem('adminAuthToken');
      let response = await fetch('http://127.0.0.1:8000/api/employees/', {
        headers: { Authorization: `Bearer ${access}` },
      });

      // --- Add refresh logic ---
      if (response.status === 401) {
        access = await refreshToken();
        if (!access) {
          setUsers([]);
          return;
        }
        response = await fetch('http://127.0.0.1:8000/api/employees/', {
          headers: { Authorization: `Bearer ${access}` },
        });
      }
      // --- End refresh logic ---

      if (!response.ok) {
        setUsers([]);
        return;
      }

      const data = await response.json();
      const mapped = (data.results || data).map(user => ({
        id: user.id, // <-- THIS IS REQUIRED
        companyId: user.company_id,
        lastName: user.last_name,
        firstName: user.first_name,
        middleName: user.middle_name,
        suffix: user.suffix,
        department: user.department,
        role: user.role,
        status: user.status,
        dateCreated: user.date_joined || user.date_created,
        email: user.email,
        image: user.image,
      }));
      setUsers(mapped);
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-access-approval-table">
      <div style={{ overflowX: 'auto' }}>
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
                <tr key={idx}>
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
      </div>
      {isModalOpen && selectedUser && (
        <AdminUserAccessReviewUser user={selectedUser} onClose={closeReviewModal} />
      )}
    </div>
  );
};

export default ApprovalsTable;
