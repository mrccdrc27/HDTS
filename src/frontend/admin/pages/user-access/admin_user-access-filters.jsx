import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin_user-access-filters.css';

const UserAccessFilters = ({ category, onFilterChange }) => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    department: '',
    role: '',
    status: '',
    date: ''
  });

  const unifiedRoleCategories = ['all-users', 'users', 'ticket-agents', 'system-admins'];
  const showStatus = unifiedRoleCategories.includes(category) || category === 'for-approvals';
  const canNavigateByRole = unifiedRoleCategories.includes(category);

  const roleOptions = useMemo(() => {
  return ['User', 'Ticket Agent', 'System Admin'];
  }, []);

  const statusOptions = category === 'for-approvals'
  ? ['Pending']
  : ['Active', 'Inactive', 'Pending'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    if (onFilterChange) {
      onFilterChange(newFilters);
    }

    // Navigate based on role selection
    if (name === 'role' && canNavigateByRole) {
      const roleToCategoryMap = {
        "System Admin": "system-admins",
        "Ticket Agent": "ticket-agents",
        "User": "users",
        "": "all-users"
      };

      const selectedRole = newFilters.role;
      const newCategory = roleToCategoryMap[selectedRole];

      if (newCategory) {
        navigate(`/admin/user-access/${newCategory}`);
      }
    }

    console.log('Selected Filters:', newFilters);
  };

  return (
    <div className="user-access-filters">
      {/* Department Filter */}
      <div className="filter-group">
        <label htmlFor="department">Department</label>
        <select id="department" name="department" value={filters.department} onChange={handleChange}>
          <option value="">All Departments</option>
          <option value="Finance Department">Finance Department</option>
          <option value="Human Resources">Human Resources</option>
          <option value="IT Department">IT Department</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Customer Service">Customer Service</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      {/* Role Filter */}
      <div className="filter-group">
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={filters.role} onChange={handleChange}>
          <option value="">All Roles</option>
          {roleOptions.map((role, idx) => (
            <option key={idx} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      {showStatus && (
        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={filters.status} onChange={handleChange}>
            <option value="">All Status</option>
            {statusOptions.map((status, idx) => (
              <option key={idx} value={status}>{status}</option>
            ))}
          </select>
        </div>
      )}

      {/* Date Filter */}
      <div className="filter-group">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" value={filters.date} onChange={handleChange} />
      </div>
    </div>
  );
};

export default UserAccessFilters;
