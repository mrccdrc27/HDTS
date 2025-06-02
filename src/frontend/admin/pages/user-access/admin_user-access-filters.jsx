import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import './admin_user-access-filters.css';
import DateFilter from '../../../shared/components/date-filter.jsx';

const DEPARTMENTS = [
  'Finance Department',
  'Human Resources',
  'IT Department',
  'Technical Support',
  'Customer Service',
  'Operations',
];

const ROLE_OPTIONS = ['User', 'Ticket Agent', 'System Admin'];

const ROLE_CATEGORY_MAP = {
  'System Admin': 'system-admins',
  'Ticket Agent': 'ticket-agents',
  'User': 'users',
  '': 'all-users',
};

const SORT_OPTIONS = {
  companyId: 'Company ID',
  dateCreated: 'Date Created',
  lastName: 'Last Name',
  firstName: 'First Name',
  middleName: 'Middle Name',
};

const UserAccessFilters = ({ category, onFilterChange }) => {
  const navigate = useNavigate();

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

  const unifiedCategories = ['all-users', 'users', 'ticket-agents', 'system-admins'];
  const showStatus = unifiedCategories.includes(category) || category === 'for-approvals';
  const canNavigateByRole = unifiedCategories.includes(category);

  const statusOptions =
    category === 'for-approvals' ? ['Pending'] : ['Active', 'Inactive', 'Pending'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange?.({ ...updatedFilters, sortBy, sortDirection });

    if (name === 'role' && canNavigateByRole) {
      const newCategory = ROLE_CATEGORY_MAP[value];
      if (newCategory) {
        navigate(`/admin/user-access/${newCategory}`);
      }
    }
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
      {/* Filters */}
      <div className="user-access-filter-section">
        <span className="user-access-filter-label">Filter by:</span>

        {/* Department & Role */}
{[
  ['department', 'Department', DEPARTMENTS],
  ['role', 'Role', ROLE_OPTIONS],
].map(([name, label, options]) => (
  <div className="user-access-filter-dropdown" key={name}>
    <select
      name={name}
      value={filters[name]}
      onChange={handleChange}
      className="user-access-filter-select"
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown className="user-access-filter-dropdown-icon" size={16} />
  </div>
))}

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

        {/* Date */}
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

      {/* Sort */}
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
