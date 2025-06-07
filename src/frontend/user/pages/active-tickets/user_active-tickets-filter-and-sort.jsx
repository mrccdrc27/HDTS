import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import './user_active-tickets-filter-and-sort.css';
import {
  departmentOptions as rawDepartments,
  categoryOptions as rawCategories,
  subCategoryOptions,
} from '../../../../utilities/filters/sharedDropdowns.js';
import DateFilter from '../../../shared/components/date-filter.jsx';

const userTicketStatuses = [
  '',
  'Submitted',
  'Open',
  'Pending',
  'On Progress',
  'On Hold',
  'Resolved',
];

const priorityOptions = ['', 'Low', 'Medium', 'High', 'Critical'];

const sortByLabels = {
  ticketNumber: 'Ticket Number',
  subject: 'Subject',
  dateCreated: 'Date Created',
  lastUpdated: 'Last Updated',
};

const UserActiveTicketsFiltersAndSort = ({
  departmentFilter,
  setDepartmentFilter,
  categoryFilter,
  setCategoryFilter,
  subcategoryFilter,
  setSubcategoryFilter,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  disableStatusFilter,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}) => {
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);

  const sortMenuRef = useRef(null);
  const dateFilterRef = useRef(null);

  useEffect(() => {
    const subs = categoryFilter ? subCategoryOptions[categoryFilter] || [] : [];
    setAvailableSubcategories(subs);
    if (!subs.includes(subcategoryFilter)) {
      setSubcategoryFilter('');
    }
  }, [categoryFilter, subcategoryFilter, setSubcategoryFilter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
      if (dateFilterRef.current && !dateFilterRef.current.contains(event.target)) {
        setShowDateFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSortDirection = () =>
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));

  const handleSortKeyDown = (e, value) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSortBy(value);
      setShowSortMenu(false);
    }
  };

  const handleDateApply = ({ startDate: sDate, endDate: eDate }) => {
    onStartDateChange(sDate);
    onEndDateChange(eDate);
    setShowDateFilter(false);
  };

  const handleDateClear = () => {
    onStartDateChange('');
    onEndDateChange('');
    setShowDateFilter(false);
  };

  const formatDateRangeLabel = () => {
    if (!startDate && !endDate) return 'Date';
    return startDate && endDate
      ? `${startDate} to ${endDate}`
      : startDate || endDate || 'Date';
  };

  return (
    <div className="user-active-tickets-filters-and-sort-wrapper">
      <div className="user-active-tickets-filter-section">
        <span className="user-active-tickets-filter-label">Filter by:</span>

        {/* Department */}
        <div className="user-active-tickets-filter-dropdown">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="user-active-tickets-filter-select"
          >
            <option value="">All Departments</option>
            {rawDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="user-active-tickets-filter-dropdown-icon" />
        </div>

        {/* Category */}
        <div className="user-active-tickets-filter-dropdown">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="user-active-tickets-filter-select"
          >
            <option value="">All Categories</option>
            {rawCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="user-active-tickets-filter-dropdown-icon" />
        </div>

        {/* Subcategory */}
        <div className="user-active-tickets-filter-dropdown">
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            disabled={!categoryFilter || availableSubcategories.length === 0}
            className="user-active-tickets-filter-select"
          >
            <option value="">
              {availableSubcategories.length ? 'All Sub Categories' : 'Sub Category'}
            </option>
            {availableSubcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="user-active-tickets-filter-dropdown-icon" />
        </div>

        {/* Status */}
        <div className="user-active-tickets-filter-dropdown">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="user-active-tickets-filter-select"
            disabled={disableStatusFilter}
          >
            <option value="">All Statuses</option>
            {userTicketStatuses.filter(Boolean).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="user-active-tickets-filter-dropdown-icon" />
        </div>

        {/* Priority */}
        <div className="user-active-tickets-filter-dropdown">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="user-active-tickets-filter-select"
          >
            <option value="">All Priorities</option>
            {priorityOptions.filter(Boolean).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="user-active-tickets-filter-dropdown-icon" />
        </div>

        {/* Date Filter */}
        <div
          className="user-active-tickets-filter-dropdown date-filter-wrapper"
          ref={dateFilterRef}
        >
          <button
            onClick={() => setShowDateFilter((prev) => !prev)}
            className="user-active-tickets-date-filter-button"
          >
            <span>{formatDateRangeLabel()}</span>
            <ChevronDown size={16} />
          </button>
          {showDateFilter && (
            <DateFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              onApply={handleDateApply}
              onClear={handleDateClear}
              onClose={() => setShowDateFilter(false)} // ✅ Close on preset click
            />
          )}
        </div>
      </div>

      {/* Sort by Section */}
      <div className="user-active-tickets-sort-section">
        <span className="user-active-tickets-sort-label">Sort by:</span>
        <div
          className="user-active-tickets-sort-dropdown"
          style={{ position: 'relative' }}
          ref={sortMenuRef}
        >
          <button
            className="user-active-tickets-custom-select-button"
            onClick={() => setShowSortMenu((prev) => !prev)}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={showSortMenu}
          >
            <span className="user-active-tickets-sort-with-icon">
              {sortBy ? sortByLabels[sortBy] : 'Select'}
              {sortBy && (
                <span
                  className="user-active-tickets-sort-arrow-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSortDirection();
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSortDirection();
                    }
                  }}
                  aria-label={`Toggle sort direction, currently ${sortDirection}`}
                >
                  {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </span>
              )}
            </span>
            <ChevronDown size={16} />
          </button>

          {showSortMenu && (
            <ul
              className="user-active-tickets-custom-dropdown-menu"
              role="listbox"
              tabIndex={-1}
            >
              {Object.entries(sortByLabels).map(([value, label]) => (
                <li
                  key={value}
                  tabIndex={0}
                  role="option"
                  aria-selected={sortBy === value}
                  onClick={() => {
                    setSortBy(value);
                    setShowSortMenu(false);
                  }}
                  onKeyDown={(e) => handleSortKeyDown(e, value)}
                >
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

export default UserActiveTicketsFiltersAndSort;
