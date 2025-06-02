import { useState } from 'react';
import DateFilter from '../../../shared/components/date-filter.jsx';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import './admin_ticket-management-filters-and-sort.css';

const ticketCategories = {
  'Technical': ['Software', 'Hardware', 'Network'],
  'HR': ['Benefits', 'Payroll', 'Leave'],
  'Facilities': ['Maintenance', 'Security', 'Cleaning']
};

const ticketManagementStatuses = [
  'New',
  'Open',
  'Pending',
  'On Progress',
  'On Hold',
  'Resolved',
];

const sortByLabels = {
  ticketNumber: 'Ticket Number',
  subject: 'Subject',
  dateCreated: 'Date Created',
  lastUpdated: 'Last Updated',
};

const TicketManagementFilters = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const toggleDateFilter = () => setShowDateFilter((prev) => !prev);
  const toggleSortDirection = () => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));

  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
    if (ticketCategories[value]) {
      setSubcategories(ticketCategories[value]);
    } else {
      setSubcategories([]);
    }
    setSubcategoryFilter('');
  };

  const handleSortSelect = (value) => {
    setSortBy(value);
    setShowSortMenu(false);
  };

  return (
    <div className="ticket-management-filters-and-sort-wrapper">
      {/* Filter Section */}
      <div className="ticket-management-filter-section">
        <span className="ticket-management-filter-label">Filter by:</span>

        {/* Category */}
        <div className="ticket-management-filter-dropdown">
          <select
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="ticket-management-filter-select"
          >
            <option value="" disabled hidden>Category</option>
            {Object.keys(ticketCategories).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <ChevronDown size={16} className="ticket-management-filter-dropdown-icon" />
        </div>

        {/* Subcategory */}
        <div className="ticket-management-filter-dropdown">
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            disabled={!categoryFilter}
            className="ticket-management-filter-select"
          >
            <option value="" disabled hidden>Sub Category</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
          <ChevronDown size={16} className="ticket-management-filter-dropdown-icon" />
        </div>

        {/* Department */}
        <div className="ticket-management-filter-dropdown">
          <select className="ticket-management-filter-select">
            <option value="" disabled hidden>Department</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
          <ChevronDown size={16} className="ticket-management-filter-dropdown-icon" />
        </div>

        {/* Status */}
        <div className="ticket-management-filter-dropdown">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="ticket-management-filter-select"
          >
            <option value="" disabled hidden>Status</option>
            {ticketManagementStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <ChevronDown size={16} className="ticket-management-filter-dropdown-icon" />
        </div>

        {/* Date Filter */}
        <div className="ticket-management-filter-dropdown date-filter-wrapper">
          <button onClick={toggleDateFilter} className="ticket-management-date-filter-button">
            <span>Date</span>
            <ChevronDown size={16} className="ticket-management-filter-date-dropdown-icon" />
          </button>
          {showDateFilter && <DateFilter />}
        </div>
      </div>

      {/* Sort Section */}
      <div className="ticket-management-sort-section">
        <span className="ticket-management-sort-label">Sort by:</span>
        <div className="ticket-management-sort-dropdown" style={{ position: 'relative' }}>
          <button
            className="ticket-management-custom-select-button"
            onClick={() => setShowSortMenu(prev => !prev)}
          >
            <span className="ticket-management-sort-with-icon">
              {sortBy ? sortByLabels[sortBy] : 'Select'}
              {sortBy && (
                <span className="ticket-management-sort-arrow-icon" onClick={(e) => { e.stopPropagation(); toggleSortDirection(); }}>
                  {sortDirection === 'asc' 
                    ? <ArrowUp size={16} />
                    : <ArrowDown size={16} />}
                </span>
              )}
            </span>
            <ChevronDown size={16} />
          </button>

          {showSortMenu && (
            <ul className="ticket-management-custom-dropdown-menu">
              {Object.entries(sortByLabels).map(([value, label]) => (
                <li key={value} onClick={() => handleSortSelect(value)}>
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

export default TicketManagementFilters;
