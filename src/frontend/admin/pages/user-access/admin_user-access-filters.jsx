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
  'Ticket Coordinator',
  'System Admin',
];

const SORT_OPTIONS = {
  companyId: 'Company ID',
  dateCreated: 'Date Created',
  lastName: 'Last Name',
  firstName: 'First Name',
  middleName: 'Middle Name',
};

const UserAccessFilters = ({
  category,
  department,
  role,
  status,
  startDate,
  endDate,
  setDepartment,
  setRole,
  setStatus,
  setStartDate,
  setEndDate,
  sortBy,
  sortDirection,
  onFilterChange,
}) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Determine which filters to show based on category
  const showRole =
    category === 'all-users' || category === 'for-approvals';

  const showStatus =
    category === 'all-users' ||
    category === 'users' ||
    category === 'ticket-coordinator' ||
    category === 'system-admin' ||
    category !== 'for-approvals';

  // Status options depend on category
  const statusOptions =
    category === 'for-approvals' ? ['Pending'] : ['Active', 'Inactive', 'Pending'];

  // Reset role filter if not shown
  useEffect(() => {
    if (!showRole && role !== '') {
      setRole('');
      onFilterChange?.({ role: '', sortBy, sortDirection });
    }
  }, [category]);

  // Handlers for individual filter changes
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    onFilterChange?.({ department: e.target.value, sortBy, sortDirection });
  };

  const handleRoleChange = (e) => {
    const val = e.target.value === 'All Roles' ? '' : e.target.value;
    setRole(val);
    onFilterChange?.({ role: val, sortBy, sortDirection });
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onFilterChange?.({ status: e.target.value, sortBy, sortDirection });
  };

  const toggleSortDirection = () => {
    const newDir = sortDirection === 'asc' ? 'desc' : 'asc';
    onFilterChange?.({ sortBy, sortDirection: newDir });
  };

  const handleSortSelect = (value) => {
    setShowSortMenu(false);
    onFilterChange?.({ sortBy: value, sortDirection });
  };

  return (
    <div className="user-access-toolbar">
      <div className="user-access-filter-section">
        <span className="user-access-filter-label">Filter by:</span>

        {/* Department Filter (always show) */}
        <div className="user-access-filter-dropdown">
          <select
            name="department"
            value={department}
            onChange={handleDepartmentChange}
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
              value={role || 'All Roles'}
              onChange={handleRoleChange}
              className="user-access-filter-select"
            >
              {ROLE_OPTIONS.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
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
              value={status}
              onChange={handleStatusChange}
              className="user-access-filter-select"
            >
              <option value="">Status</option>
              {statusOptions.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
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
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={(val) => setStartDate(val)}
              onEndDateChange={(val) => setEndDate(val)}
              onApply={({ startDate, endDate }) => {
                onFilterChange?.({ startDate, endDate, sortBy, sortDirection });
                setShowDateFilter(false);
              }}
              onClear={() => {
                onFilterChange?.({ startDate: '', endDate: '', sortBy, sortDirection });
              }}
              onClose={() => setShowDateFilter(false)}
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
