import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  departmentOptions as rawDepartments,
  categoryOptions as rawCategories,
  subCategoryOptions,
  priorityOptions,
} from '../../../../utilities/filters/sharedDropdowns.js';
import DateFilter from '../../../shared/components/date-filter.jsx';

import './admin_ticket-management-filters-and-sort.css';

const statusOptionsByPage = {
  all: ['New', 'Pending', 'Open', 'On Progress', 'On Hold', 'Resolved', 'Closed', 'Rejected', 'Withdrawn'],
  pending: ['Pending'],
  active: ['New', 'Pending', 'Open', 'On Progress', 'On Hold', 'Resolved'],
  closed: ['Closed', 'Rejected', 'Withdrawn'],
};

const getStatusesForPage = (pageKey) => statusOptionsByPage[pageKey] || statusOptionsByPage.all;

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
  currentPageStatus = '',
  startDate = '',
  endDate = '',
  onStartDateChange,
  onEndDateChange,
}) => {
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);

  const sortMenuRef = useRef(null);
  const dateFilterRef = useRef(null);

  // Sync statusFilter with currentPageStatus if fixed single status filter applies
  useEffect(() => {
    if (currentPageStatus && statusOptionsByPage[currentPageStatus]?.length === 1) {
      setStatusFilter(statusOptionsByPage[currentPageStatus][0]);
    } else if (!currentPageStatus || currentPageStatus === 'all') {
      setStatusFilter('');
    }
  }, [currentPageStatus, setStatusFilter]);

  // Update available subcategories on category change, clear invalid subcategory
  useEffect(() => {
    const subs = categoryFilter ? subCategoryOptions[categoryFilter] || [] : [];
    setAvailableSubcategories(subs);
    if (subcategoryFilter && !subs.includes(subcategoryFilter)) {
      setSubcategoryFilter('');
    }
  }, [categoryFilter, subcategoryFilter, setSubcategoryFilter]);

  // Close sort menu on outside click
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

  // Close date filter on outside click
  useEffect(() => {
    if (!showDateFilter) return;

    const handleClickOutside = (e) => {
      if (dateFilterRef.current && !dateFilterRef.current.contains(e.target)) {
        setShowDateFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDateFilter]);

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

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

  const formatDateLabel = () => {
    if (!startDate && !endDate) return 'Date';
    return startDate && endDate
      ? `${startDate} to ${endDate}`
      : startDate || endDate || 'Date';
  };

  const statusesToShow = disableStatusFilter
    ? (currentPageStatus ? getStatusesForPage(currentPageStatus) : statusOptionsByPage.all)
    : (currentPageStatus === 'all' ? statusOptionsByPage.all : getStatusesForPage(currentPageStatus));

  return (
    <div className="ticket-management-filters-and-sort-wrapper">

      <div className="ticket-management-filter-section" aria-label="Ticket Filters">
        <span className="ticket-management-filter-label">Filter by:</span>

        {/* Department Filter */}
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

        {/* Category Filter */}
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

        {/* Subcategory Filter */}
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

        {/* Status Filter */}
        <div className="ticket-management-filter-dropdown">
          <select
            value={disableStatusFilter ? (currentPageStatus || '') : statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={disableStatusFilter || (currentPageStatus && statusOptionsByPage[currentPageStatus]?.length === 1)}
            aria-label="Filter by Status"
            className="ticket-management-filter-select"
          >
            {!disableStatusFilter && <option value="">All Statuses</option>}
            {statusesToShow.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <ChevronDown className="ticket-management-filter-dropdown-icon" size={16} />
        </div>

        {/* Priority Filter */}
        <div className="ticket-management-filter-dropdown">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filter by Priority"
            className="ticket-management-filter-select"
          >
            <option value="">All Priorities</option>
            {priorityOptions.filter(Boolean).map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
          <ChevronDown className="ticket-management-filter-dropdown-icon" size={16} />
        </div>

        {/* Date Filter */}
        <div className="user-active-tickets-filter-dropdown date-filter-wrapper" ref={dateFilterRef}>
          <button
            type="button"
            onClick={() => setShowDateFilter((prev) => !prev)}
            className="user-active-tickets-date-filter-button"
            aria-haspopup="dialog"
            aria-expanded={showDateFilter}
          >
            <span>{formatDateLabel()}</span>
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
              onClose={() => setShowDateFilter(false)}
            />
          )}
        </div>
      </div>

      {/* Sort Section */}
      <div className="ticket-management-sort-section" aria-label="Ticket Sort Options">
        <span className="ticket-management-sort-label">Sort by:</span>
        <div className="ticket-management-sort-dropdown" ref={sortMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={showSortMenu}
            onClick={() => setShowSortMenu((prev) => !prev)}
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
                  aria-selected={sortBy === value}
                  onClick={() => {
                    setSortBy(value);
                    setShowSortMenu(false);
                  }}
                  onKeyDown={(e) => handleSortKeyDown(e, value)}
                  className="ticket-management-custom-dropdown-item"
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

export default TicketManagementFiltersAndSort;
