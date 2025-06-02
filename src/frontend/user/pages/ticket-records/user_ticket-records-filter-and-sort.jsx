import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import './user_ticket-records-filter-and-sort.css';
import {
  departmentOptions as rawDepartments,
  categoryOptions as rawCategories,
  subCategoryOptions,
} from '../../../../utilities/filters/user/shared/sharedDropdowns.js';

const userTicketStatuses = [
  '',
  'Closed',
  'Withdrawn',
  'Rejected',
];

const priorityOptions = ['', 'Low', 'Medium', 'High', 'Critical'];

const sortByLabels = {
  ticketNumber: 'Ticket Number',
  subject: 'Subject',
  dateCreated: 'Date Created',
  lastUpdated: 'Last Updated',  
};

const UserTicketRecordsFiltersAndSort = ({
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
}) => {
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef(null);

  // Update available subcategories when categoryFilter changes
  useEffect(() => {
    const subs = categoryFilter ? subCategoryOptions[categoryFilter] || [] : [];
    setAvailableSubcategories(subs);

    if (!subs.includes(subcategoryFilter)) {
      setSubcategoryFilter('');
    }
  }, [categoryFilter, subcategoryFilter, setSubcategoryFilter]);

  // Close sort menu if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target)
      ) {
        setShowSortMenu(false);
      }
    }
    if (showSortMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSortMenu]);

  const toggleSortDirection = () =>
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));

  // Handle keyboard navigation for sort options (Enter key to select)
  const handleSortKeyDown = (e, value) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSortBy(value);
      setShowSortMenu(false);
    }
  };

  return (
    <div className="user-ticket-records-filters-and-sort-wrapper">
      <div className="user-ticket-records-filter-section">
        <span className="user-ticket-records-filter-label">Filter by:</span>

        {/* Department */}
        <div className="user-ticket-records-filter-dropdown">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="user-ticket-records-filter-select"
          >
            <option value="">All Departments</option>
            {rawDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="user-ticket-records-filter-dropdown-icon"
          />
        </div>

        {/* Category */}
        <div className="user-ticket-records-filter-dropdown">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="user-ticket-records-filter-select"
          >
            <option value="">All Categories</option>
            {rawCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="user-ticket-records-filter-dropdown-icon"
          />
        </div>

        {/* Sub Category */}
        <div className="user-ticket-records-filter-dropdown">
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            disabled={!categoryFilter || availableSubcategories.length === 0}
            className="user-ticket-records-filter-select"
          >
            <option value="">
              {availableSubcategories.length
                ? 'All Sub Categories'
                : 'Sub Category'}
            </option>
            {availableSubcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="user-ticket-records-filter-dropdown-icon"
          />
        </div>

        {/* Status */}
        <div className="user-ticket-records-filter-dropdown">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="user-ticket-records-filter-select"
            disabled={disableStatusFilter}
          >
            <option value="">All Statuses</option>
            {userTicketStatuses
              .filter((status) => status !== '')
              .map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
          </select>
          <ChevronDown
            size={16}
            className="user-ticket-records-filter-dropdown-icon"
          />
        </div>

        {/* Priority */}
        <div className="user-ticket-records-filter-dropdown">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="user-ticket-records-filter-select"
          >
            <option value="">All Priorities</option>
            {priorityOptions
              .filter((priority) => priority !== '')
              .map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
          </select>
          <ChevronDown
            size={16}
            className="user-ticket-records-filter-dropdown-icon"
          />
        </div>

        {/* Date Range placeholder */}
        <div className="user-ticket-records-filter-dropdown">
          <select disabled className="user-ticket-records-filter-select">
            <option value="">Date Range</option>
          </select>
          <ChevronDown
            size={16}
            className="user-ticket-records-filter-dropdown-icon"
          />
        </div>
      </div>

      {/* Sort by Section */}
      <div className="user-ticket-records-sort-section">
        <span className="user-ticket-records-sort-label">Sort by:</span>
        <div
          className="user-ticket-records-sort-dropdown"
          style={{ position: 'relative' }}
          ref={sortMenuRef}
        >
          <button
            className="user-ticket-records-custom-select-button"
            onClick={() => setShowSortMenu((prev) => !prev)}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={showSortMenu}
          >
            <span className="user-ticket-records-sort-with-icon">
              {sortBy ? sortByLabels[sortBy] : 'Select'}
              {sortBy && (
                <span
                  className="user-ticket-records-sort-arrow-icon"
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
            <ul
              className="user-ticket-records-custom-dropdown-menu"
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

export default UserTicketRecordsFiltersAndSort;
