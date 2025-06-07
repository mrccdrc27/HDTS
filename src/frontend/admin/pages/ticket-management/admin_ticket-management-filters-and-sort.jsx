import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  departmentOptions as rawDepartments,
  categoryOptions as rawCategories,
  subCategoryOptions,
  priorityOptions,
} from '../../../../utilities/filters/sharedDropdowns.js';

import './admin_ticket-management-filters-and-sort.css'

const ticketManagementStatuses = [
  '',
  'New',
  'Open',
  'Pending',
  'On Progress',
  'On Hold',
  'Resolved',
  'Closed',
  'Rejected',
  'Withdrawn',
];

const sortByLabels = {
  ticketNumber: 'Ticket Number',
  subject: 'Subject',
  dateCreated: 'Date Created',
  lastUpdated: 'Last Updated',
};

const TicketManagementFiltersAndSort = ({
  departmentFilter = '',
  setDepartmentFilter,
  categoryFilter = '',
  setCategoryFilter,
  subcategoryFilter = '',
  setSubcategoryFilter,
  statusFilter = '',
  setStatusFilter,
  priorityFilter = '',
  setPriorityFilter,
  sortBy = '',
  setSortBy,
  sortDirection = 'asc',
  setSortDirection,
  disableStatusFilter = false,
}) => {
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef(null);

  useEffect(() => {
    const subs = categoryFilter ? subCategoryOptions[categoryFilter] || [] : [];
    setAvailableSubcategories(subs);
    if (subcategoryFilter && !subs.includes(subcategoryFilter)) {
      setSubcategoryFilter('');
    }
  }, [categoryFilter, subcategoryFilter, setSubcategoryFilter]);

  useEffect(() => {
    if (!showSortMenu) return;
    const handleClickOutside = (e) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSortMenu]);

  const toggleSortDirection = () =>
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));

  const handleSortKeyDown = (e, value) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSortBy(value);
      setShowSortMenu(false);
    }
  };

  return (
    <div className="ticket-management-filters-and-sort-wrapper">

      <div className="ticket-management-filter-section" aria-label="Ticket Filters">
        <span className="ticket-management-filter-label">Filter by:</span>

        <div className="ticket-management-filter-dropdown">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            aria-label="Filter by Department"
            className="ticket-management-filter-select"
          >
            <option value="">All Departments</option>
            {rawDepartments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <ChevronDown className="ticket-management-filter-dropdown-icon" size={16} />
        </div>

        <div className="ticket-management-filter-dropdown">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by Category"
            className="ticket-management-filter-select"
          >
            <option value="">All Categories</option>
            {rawCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="ticket-management-filter-dropdown-icon" size={16} />
        </div>

        <div className="ticket-management-filter-dropdown">
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            disabled={!categoryFilter || availableSubcategories.length === 0}
            aria-label="Filter by Subcategory"
            className="ticket-management-filter-select"
          >
            <option value="">
              {availableSubcategories.length ? 'All Sub Categories' : 'Sub Category'}
            </option>
            {availableSubcategories.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
          <ChevronDown className="ticket-management-filter-dropdown-icon" size={16} />
        </div>

        <div className="ticket-management-filter-dropdown">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={disableStatusFilter}
            aria-label="Filter by Status"
            className="ticket-management-filter-select"
          >
            <option value="">All Statuses</option>
            {ticketManagementStatuses.filter((s) => s).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <ChevronDown className="ticket-management-filter-dropdown-icon" size={16} />
        </div>

        <div className="ticket-management-filter-dropdown">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filter by Priority"
            className="ticket-management-filter-select"
          >
            <option value="">All Priorities</option>
            {priorityOptions.filter((p) => p).map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
          <ChevronDown className="ticket-management-filter-dropdown-icon" size={16} />
        </div>

        <div className="ticket-management-filter-dropdown">
          <select
            disabled
            aria-label="Date Range filter (coming soon)"
            title="Date Range filter will be implemented soon"
            className="ticket-management-filter-select"
          >
            <option value="">Date Range</option>
          </select>
          <ChevronDown className="ticket-management-filter-dropdown-icon" size={16} />
        </div>
      </div>

      <div className="ticket-management-sort-section" aria-label="Ticket Sort Options">
        <span className="ticket-management-sort-label">Sort by:</span>
        <div className="ticket-management-sort-dropdown" ref={sortMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={showSortMenu}
            onClick={() => setShowSortMenu((prev) => !prev)}
            aria-label={`Sort by ${sortBy ? sortByLabels[sortBy] : 'Select'}. Press Enter to open menu.`}
            className="ticket-management-custom-select-button"
          >
            <span className="ticket-management-sort-with-icon">
              {sortBy ? sortByLabels[sortBy] : 'Select'}
              {sortBy && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSortDirection();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSortDirection();
                    }
                  }}
                  aria-label={`Toggle sort direction, currently ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
                  className="ticket-management-sort-arrow-icon"
                >
                  {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </span>
              )}
            </span>
            <ChevronDown size={16} />
          </button>

          {showSortMenu && (
            <ul
              role="listbox"
              tabIndex={-1}
              aria-activedescendant={sortBy}
              className="ticket-management-custom-dropdown-menu"
            >
              {Object.entries(sortByLabels).map(([value, label]) => (
                <li
                  key={value}
                  role="option"
                  tabIndex={0}
                  id={value}
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

        <div
          aria-live="polite"
          aria-atomic="true"
          style={{ position: 'absolute', left: '-9999px', height: '1px', width: '1px', overflow: 'hidden' }}
        >
          {sortBy
            ? `Sorting by ${sortByLabels[sortBy]} in ${sortDirection === 'asc' ? 'ascending' : 'descending'} order`
            : 'No sort selected'}
        </div>
      </div>
    </div>
  );
};

export default TicketManagementFiltersAndSort;
