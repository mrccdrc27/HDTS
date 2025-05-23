import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import './admin_user-access-tables.css';
import { users } from '/src/utilities/storage/userStorage.js';

const USERS_PER_PAGE = 5;

const UserAccessTable = ({ category, filters }) => {
  const navigate = useNavigate();
  
  const [sortConfig, setSortConfig] = useState({ key: 'companyId', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

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

      return matchesDepartment && matchesRole && matchesStatus && matchesDate;
    });
  }, [filters]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      let aVal = a[sortConfig.key] ?? '';
      let bVal = b[sortConfig.key] ?? '';

      if (sortConfig.key === 'dateCreated') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / USERS_PER_PAGE);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
    setCurrentPage(1); // Reset to page 1 on sort
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUp size={14} className="sort-icon inactive" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={14} className="sort-icon active" />
    ) : (
      <ArrowDown size={14} className="sort-icon active" />
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
              <th key={key}>
                <div className="header-content">
                  <span>{label}</span>
                  <span
                    onClick={() => handleSort(key)}
                    className="sort-icon-wrapper"
                    style={{ cursor: 'pointer' }}
                  >
                    {getSortIcon(key)}
                  </span>
                </div>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user, idx) => (
            <tr key={idx}>
              <td>{user.companyId}</td>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.middleName}</td>
              <td>{user.suffix}</td>
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
                    >View</button>
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Reject</button>
                  </>
                ) : (
                  <>
                    <button className="view-btn">View</button>
                    <button className="update-btn">Update</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active-page' : ''}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserAccessTable;
