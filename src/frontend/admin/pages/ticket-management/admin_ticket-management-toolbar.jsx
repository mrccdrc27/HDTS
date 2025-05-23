import { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { ticketCategories } from '../../../../utilities/ticket/categoryAndSubCategory.js';
import './admin_ticket-management-toolbar.css';

const ticketManagementStatuses = [
  'Submitted',
  'Open',
  'Pending',
  'On Progress',
  'On Hold',
  'Resolved',
];

const TicketManagementToolbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [showDatePopup, setShowDatePopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    if (categoryFilter && ticketCategories[categoryFilter]) {
      setSubcategories(Object.keys(ticketCategories[categoryFilter]));
    } else {
      setSubcategories([]);
      setSubcategoryFilter('');
    }
  }, [categoryFilter]);

  const toggleDatePopup = () => setShowDatePopup((prev) => !prev);
  const handleClearDates = () => {
    setDateFrom('');
    setDateTo('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowDatePopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDateButtonText = () => {
    if (dateFrom || dateTo) return 'Date ✓';
    return 'Date';
  };

  return (
    <div className="ticket-toolbar">
      {/* Search Input */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <span className="filter-label">Filter by:</span>

        {/* Category Filter */}
        <div className="filter-dropdown">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Category</option>
            {Object.keys(ticketCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="dropdown-icon" />
        </div>

        {/* Subcategory Filter */}
        <div className="filter-dropdown">
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            disabled={!categoryFilter}
            className="filter-select"
          >
            <option value="">Sub Category</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="dropdown-icon" />
        </div>

        {/* Department Placeholder */}
        <div className="filter-dropdown">
          <select className="filter-select">
            <option value="">Department</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
          <ChevronDown size={14} className="dropdown-icon" />
        </div>

        {/* Status Filter */}
        <div className="filter-dropdown">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Status</option>
            {ticketManagementStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="dropdown-icon" />
        </div>

        {/* Date Filter */}
        <div className="filter-dropdown date-filter-wrapper">
          <button
            onClick={toggleDatePopup}
            className="date-filter-button"
          >
            <span>{getDateButtonText()}</span>
            <ChevronDown size={14} className="dropdown-icon" />
          </button>

          {showDatePopup && (
            <div ref={popupRef} className="date-popover">
              <div className="popover-header">
                <h4>Select Date Range</h4>
                <button
                  onClick={() => setShowDatePopup(false)}
                  className="close-button"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="date-inputs">
                <div className="input-group">
                  <label htmlFor="dateFrom">From</label>
                  <input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="dateTo">To</label>
                  <input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    min={dateFrom}
                  />
                </div>
              </div>

              <div className="popover-actions">
                <button onClick={handleClearDates} className="secondary-button">
                  Clear
                </button>
                <button
                  onClick={() => setShowDatePopup(false)}
                  className="primary-button"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketManagementToolbar;
