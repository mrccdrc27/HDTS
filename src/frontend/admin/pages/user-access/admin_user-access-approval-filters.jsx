import { useState, useEffect } from 'react';
import './admin_user-access-filters.css';

const ApprovalsFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    department: '',
    role: '',
    status: 'Pending', // fixed status
    date: ''
  });

  useEffect(() => {
    // Trigger default filter with status = Pending
    onFilterChange?.(filters);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value, status: 'Pending' };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
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
          <option value="User">User</option>
          <option value="Ticket Agent">Ticket Agent</option>
          <option value="System Admin">System Admin</option>
        </select>
      </div>

      {/* Date Filter */}
      <div className="filter-group">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" value={filters.date} onChange={handleChange} />
      </div>
    </div>
  );
};

export default ApprovalsFilters;
