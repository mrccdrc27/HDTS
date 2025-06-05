import { useState, useEffect } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import './admin_user-access-filters.css';
import DateFilter from '../../../shared/components/date-filter.jsx';

const DEPARTMENTS = [
  'IT Department',
  'Asset Department',
  'Budget Department',
];

const ROLE_OPTIONS = [
  'All Roles',
  'User',
  'Ticket Agent',
  'System Admin',
];

const SORT_OPTIONS = {
  companyId: 'Company ID',
  dateCreated: 'Date Created',
  lastName: 'Last Name',
  firstName: 'First Name',
  middleName: 'Middle Name',
};

const UserAccessFilters = ({ category, onFilterChange }) => {
  const [filters, setFilters] = useState({
    department: '',
    role: '',
    status: '',
    date: '',
  });

  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Determine which filters to show based on category
  const showRole =
    category === 'all-users' || category === 'for-approvals';

  const showStatus =
    category === 'all-users' ||
    category === 'users' ||
    category === 'ticket-agents' ||
    category === 'system-admin' ||
    category !== 'for-approvals';

  // Status options depend on category
  const statusOptions =
    category === 'for-approvals' ? ['Pending'] : ['Active', 'Inactive', 'Pending'];

  // Reset role filter if not shown
  useEffect(() => {
    if (!showRole && filters.role !== '') {
      setFilters((prev) => ({ ...prev, role: '' }));
      onFilterChange?.({ ...filters, role: '', sortBy, sortDirection });
    }
  }, [category]);

  // Handler for filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let normalizedValue = value;

    if (name === 'role' && value === 'All Roles') {
      normalizedValue = '';
    }

    const updatedFilters = {
      ...filters,
      [name]: normalizedValue,
    };

    setFilters(updatedFilters);
    onFilterChange?.({ ...updatedFilters, sortBy, sortDirection });
  };

  const toggleSortDirection = () => {
    const newDir = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDir);
    onFilterChange?.({ ...filters, sortBy, sortDirection: newDir });
  };

  const handleSortSelect = (value) => {
    setSortBy(value);
    setShowSortMenu(false);
    onFilterChange?.({ ...filters, sortBy: value, sortDirection });
  };

  return (
    <div className="user-access-toolbar">
      <div className="user-access-filter-section">
        <span className="user-access-filter-label">Filter by:</span>

        {/* Department Filter (always show) */}
        <div className="user-access-filter-dropdown">
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="user-access-filter-select"
          >
            <option value="">Department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <ChevronDown className="user-access-filter-dropdown-icon" size={16} />
        </div>

        {/* Role Filter (only if showRole true) */}
        {showRole && (
          <div className="user-access-filter-dropdown">
            <select
              name="role"
              value={filters.role}
              onChange={handleChange}
              className="user-access-filter-select"
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <ChevronDown className="user-access-filter-dropdown-icon" size={16} />
          </div>
        )}

        {/* Status Filter (if showStatus true) */}
        {showStatus && (
          <div className="user-access-filter-dropdown">
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="user-access-filter-select"
            >
              <option value="">Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown className="user-access-filter-dropdown-icon" size={16} />
          </div>
        )}

        {/* Date Filter (always show) */}
        <div className="user-access-filter-dropdown date-filter-wrapper">
          <button
            onClick={() => setShowDateFilter((prev) => !prev)}
            className="user-access-date-filter-button"
          >
            <span>Date</span>
            <ChevronDown size={16} />
          </button>
          {showDateFilter && (
            <DateFilter
              value={filters.date}
              onChange={(dateValue) => {
                const updated = { ...filters, date: dateValue };
                setFilters(updated);
                onFilterChange?.({ ...updated, sortBy, sortDirection });
              }}
            />
          )}
        </div>
      </div>

      {/* Sort Section */}
      <div className="user-access-sort-section">
        <span className="user-access-sort-label">Sort by:</span>
        <div className="user-access-sort-dropdown">
          <button
            className="user-access-custom-select-button"
            onClick={() => setShowSortMenu((prev) => !prev)}
          >
            <span>
              {sortBy ? SORT_OPTIONS[sortBy] : 'Select'}
              {sortBy && (
                <span
                  className="user-access-sort-arrow-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSortDirection();
                  }}
                >
                  {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </span>
              )}
            </span>
            <ChevronDown size={16} />
          </button>

          {showSortMenu && (
            <ul className="user-access-custom-dropdown-menu">
              {Object.entries(SORT_OPTIONS).map(([key, label]) => (
                <li key={key} onClick={() => handleSortSelect(key)}>
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccessFilters;
