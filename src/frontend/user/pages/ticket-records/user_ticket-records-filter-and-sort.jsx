import { useState, useEffect, useRef } from 'react';
import DateFilter from '../../../admin/components/shared/date-filter.jsx';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import './user_ticket-records-filter-and-sort.css';

const ticketCategories = {
  Technical: ['Software', 'Hardware', 'Network'],
  HR: ['Benefits', 'Payroll', 'Leave'],
  Facilities: ['Maintenance', 'Security', 'Cleaning'],
};

const userTicketStatuses = [
  'New', 'Open', 'Pending', 'On Progress', 'On Hold', 'Resolved', 'Closed',
];

const departments = ['IT', 'HR', 'Finance'];

const sortByLabels = {
  ticketNumber: 'Ticket Number',
  subject: 'Subject',
  dateCreated: 'Date Created',
  lastUpdated: 'Last Updated',
};

const UserTicketRecordsFilterAndSort = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef(null);

  const toggleDateFilter = () => setShowDateFilter(prev => !prev);
  const toggleSortDirection = () =>
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));

  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
    setSubcategories(ticketCategories[value] || []);
    setSubcategoryFilter('');
  };

  const handleSortSelect = (value) => {
    setSortBy(value);
    setShowSortMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="user-ticket-records-filters-and-sort-wrapper">
      {/* Filter Section */}
      <div className="user-ticket-records-filter-section">
        <span className="user-ticket-records-filter-label">Filter by:</span>

        {/* Category */}
        <div className="user-ticket-records-filter-dropdown">
          <select
            value={categoryFilter}
            onChange={e => handleCategoryChange(e.target.value)}
            className="user-ticket-records-filter-select"
          >
            <option value="" disabled hidden>Category</option>
            {Object.keys(ticketCategories).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <ChevronDown size={16} className="user-ticket-records-filter-dropdown-icon" />
        </div>

        {/* Subcategory */}
        <div className="user-ticket-records-filter-dropdown">
          <select
            value={subcategoryFilter}
            onChange={e => setSubcategoryFilter(e.target.value)}
            disabled={!categoryFilter}
            className="user-ticket-records-filter-select"
          >
            <option value="" disabled hidden>Sub Category</option>
            {subcategories.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
          <ChevronDown size={16} className="user-ticket-records-filter-dropdown-icon" />
        </div>

        {/* Department */}
        <div className="user-ticket-records-filter-dropdown">
          <select
            value={departmentFilter}
            onChange={e => setDepartmentFilter(e.target.value)}
            className="user-ticket-records-filter-select"
          >
            <option value="" disabled hidden>Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <ChevronDown size={16} className="user-ticket-records-filter-dropdown-icon" />
        </div>

        {/* Status */}
        <div className="user-ticket-records-filter-dropdown">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="user-ticket-records-filter-select"
          >
            <option value="" disabled hidden>Status</option>
            {userTicketStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <ChevronDown size={16} className="user-ticket-records-filter-dropdown-icon" />
        </div>

        {/* Date Filter */}
        <div className="date-filter-wrapper">
          <button
            onClick={toggleDateFilter}
            className="user-ticket-records-date-filter-button"
          >
            Date
            <ChevronDown size={16} className="user-ticket-records-filter-date-dropdown-icon" />
          </button>
          {showDateFilter && (
            <div className="user-ticket-records-date-filter-inline">
              <DateFilter />
            </div>
          )}
        </div>
      </div>

      {/* Sort Section */}
      <div className="user-ticket-records-sort-section" ref={sortMenuRef}>
        <span className="user-ticket-records-sort-label">Sort by:</span>
        <div className="user-ticket-records-sort-dropdown">
          <button
            className="user-ticket-records-custom-select-button"
            onClick={() => setShowSortMenu(prev => !prev)}
          >
            <span className="user-ticket-records-sort-with-icon">
              {sortBy ? sortByLabels[sortBy] : 'Select'}
              {sortBy && (
                <span
                  className="user-ticket-records-sort-arrow-icon"
                  onClick={e => {
                    e.stopPropagation();
                    toggleSortDirection();
                  }}
                >
                  {sortDirection === 'asc' ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                </span>
              )}
            </span>
            <ChevronDown size={16} />
          </button>
          {showSortMenu && (
            <ul className="user-ticket-records-custom-dropdown-menu">
              {Object.entries(sortByLabels).map(([val, label]) => (
                <li key={val} onClick={() => handleSortSelect(val)}>
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

export default UserTicketRecordsFilterAndSort;
