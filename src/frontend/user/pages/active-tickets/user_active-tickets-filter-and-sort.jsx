import { useEffect, useState } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import './user_active-tickets-filter-and-sort.css';
import {
  departmentOptions as rawDepartments,
  categoryOptions as rawCategories,
  subCategoryOptions,
} from '../../../../utilities/filters/user/shared/sharedDropdowns.js';

const userTicketStatuses = [
  '',
  'New',
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
}) => {
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    const subs = categoryFilter ? subCategoryOptions[categoryFilter] || [] : [];
    setAvailableSubcategories(subs);
    if (!subs.includes(subcategoryFilter)) {
      setSubcategoryFilter('');
    }
  }, [categoryFilter, subcategoryFilter, setSubcategoryFilter]);

  const toggleSortDirection = () =>
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));

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
          <ChevronDown
            size={16}
            className="user-active-tickets-filter-dropdown-icon"
          />
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
          <ChevronDown
            size={16}
            className="user-active-tickets-filter-dropdown-icon"
          />
        </div>

        {/* Sub Category */}
        <div className="user-active-tickets-filter-dropdown">
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            disabled={!categoryFilter || availableSubcategories.length === 0}
            className="user-active-tickets-filter-select"
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
            className="user-active-tickets-filter-dropdown-icon"
          />
        </div>

        {/* Status */}
        <div className="user-active-tickets-filter-dropdown">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="user-active-tickets-filter-select"
          >
            <option value="">All Statuses</option>
            {userTicketStatuses
              .filter((status) => status !== '') // exclude empty option already rendered
              .map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
          </select>
          <ChevronDown
            size={16}
            className="user-active-tickets-filter-dropdown-icon"
          />
        </div>

        {/* Priority */}
        <div className="user-active-tickets-filter-dropdown">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="user-active-tickets-filter-select"
          >
            <option value="">All Priorities</option>
            {priorityOptions
              .filter((priority) => priority !== '') // exclude empty option already rendered
              .map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
          </select>
          <ChevronDown
            size={16}
            className="user-active-tickets-filter-dropdown-icon"
          />
        </div>

        {/* Date Range placeholder */}
        <div className="user-active-tickets-filter-dropdown">
          <select disabled className="user-active-tickets-filter-select">
            <option value="">Date Range</option>
          </select>
          <ChevronDown
            size={16}
            className="user-active-tickets-filter-dropdown-icon"
          />
        </div>
      </div>

      {/* Sort by Section */}
      <div className="user-active-tickets-sort-section">
        <span className="user-active-tickets-sort-label">Sort by:</span>
        <div
          className="user-active-tickets-sort-dropdown"
          style={{ position: 'relative' }}
        >
          <button
            className="user-active-tickets-custom-select-button"
            onClick={() => setShowSortMenu((prev) => !prev)}
            type="button"
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
            <ul className="user-active-tickets-custom-dropdown-menu">
              {Object.entries(sortByLabels).map(([value, label]) => (
                <li
                  key={value}
                  onClick={() => {
                    setSortBy(value);
                    setShowSortMenu(false);
                  }}
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
