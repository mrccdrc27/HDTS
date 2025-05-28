import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '/src/utilities/storage/userStorage.js';
import './admin_user-access-approval-table.css';

const ApprovalsTable = ({ filters }) => {
  const navigate = useNavigate();

  // Filter only pending users and apply other filters
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
                    className="user-access-approval-table-view-btn"
                    onClick={() => navigate('/admin/user-access/account-review')}
                  >
                    View
                  </button>
                  <button className="user-access-approval-table-approve-btn">Approve</button>
                  <button className="user-access-approval-table-reject-btn">Reject</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalsTable;
