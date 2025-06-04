import { useState, useEffect } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import './admin_user-access-approval-filters.css';
import DateFilter from '../../../shared/components/date-filter.jsx';

const SORT_OPTIONS = {
  companyId: 'Company ID',
  lastName: 'Last Name',
  firstName: 'First Name',
  middleName: 'Middle Name',
  dateCreated: 'Date Created',
};

const ApprovalsFilters = ({ onFilterChange }) => {
  const [state, setState] = useState({
    department: '',
    role: '',
    status: 'Pending',
    date: '',
    searchTerm: '',
    sortBy: '',
    sortDirection: 'asc',
  });

  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    onFilterChange?.(state);
  }, [state, onFilterChange]);

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateState({ [name]: value });
  };

  const handleDateChange = (value) => {
    updateState({ date: value });
  };

  const toggleSortDirection = (e) => {
    e?.stopPropagation();
    updateState({
      sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc',
    });
  };

  const handleSortSelect = (key) => {
    updateState({ sortBy: key });
    setShowSortMenu(false);
  };

  return (
    <div className="user-access-approval-toolbar">
      <div className="user-access-approval-filter-section">
        <span className="user-access-approval-filter-label">Filter by:</span>

        <div className="user-access-approval-filter-dropdown">
          <select
            name="department"
            value={state.department}
            onChange={handleChange}
            className="user-access-approval-filter-select"
          >
            <option value="">Department</option>
            <option value="Finance Department">Finance Department</option>
            <option value="Human Resources">Human Resources</option>
            <option value="IT Department">IT Department</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Operations">Operations</option>
          </select>
          <ChevronDown className="user-access-approval-filter-dropdown-icon" size={16} />
        </div>

        <div className="user-access-approval-filter-dropdown">
          <select
            name="role"
            value={state.role}
            onChange={handleChange}
            className="user-access-approval-filter-select"
          >
            <option value="">Role</option>
            <option value="User">User</option>
            <option value="Ticket Agent">Ticket Agent</option>
            <option value="System Admin">System Admin</option>
          </select>
          <ChevronDown className="user-access-approval-filter-dropdown-icon" size={16} />
        </div>

        <div className="user-access-approval-filter-dropdown date-filter-wrapper">
          <button
            onClick={() => setShowDateFilter(prev => !prev)}
            className="user-access-date-filter-button"
          >
            <span>Date</span>
            <ChevronDown size={16} />
          </button>
          {showDateFilter && (
            <DateFilter
              value={state.date}
              onChange={handleDateChange}
            />
          )}
        </div>
      </div>

      <div className="user-access-approval-sort-section">
        <span className="user-access-approval-sort-label">Sort by:</span>
        <div className="user-access-approval-sort-dropdown">
          <button
            className="user-access-approval-custom-select-button"
            onClick={() => setShowSortMenu(prev => !prev)}
          >
            <span>
              {state.sortBy ? SORT_OPTIONS[state.sortBy] : 'Select'}
              {state.sortBy && (
                <span
                  className="user-access-approval-sort-arrow-icon"
                  onClick={toggleSortDirection}
                >
                  {state.sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </span>
              )}
            </span>
            <ChevronDown size={16} />
          </button>

          {showSortMenu && (
            <ul className="user-access-approval-custom-dropdown-menu">
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

export default ApprovalsFilters;
