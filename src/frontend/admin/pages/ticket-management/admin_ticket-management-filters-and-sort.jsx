import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import './admin_ticket-management-filters-and-sort.css';

// Mock data for demonstration
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

const TicketManagementFilters = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

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

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
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
      {/* Filter Section */}
      <div className="filter-section">
        <div className="section-header">
          <span className="filter-label">Filter by:</span>
        </div>
        
        <div className="filters-grid">
          {/* Category Filter */}
          <div className="filter-dropdown">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="" disabled hidden>Category</option>
              {Object.keys(ticketCategories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="dropdown-icon" />
          </div>

          {/* Subcategory Filter */}
          <div className="filter-dropdown">
            <select
              value={subcategoryFilter}
              onChange={(e) => setSubcategoryFilter(e.target.value)}
              disabled={!categoryFilter}
              className="filter-select"
            >
              <option value="" disabled hidden>Sub Category</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="dropdown-icon" />
          </div>

          {/* Department Filter */}
          <div className="filter-dropdown">
            <select className="filter-select">
              <option value="" disabled hidden>Department</option>
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
            </select>
            <ChevronDown size={16} className="dropdown-icon" />
          </div>

          {/* Status Filter */}
          <div className="filter-dropdown">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="" disabled hidden>Status</option>
              {ticketManagementStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="dropdown-icon" />
          </div>

          {/* Date Filter */}
          <div className="filter-dropdown date-filter-wrapper">
            <button onClick={toggleDatePopup} className="date-filter-button">
              <span>{getDateButtonText()}</span>
              <ChevronDown size={16} className="dropdown-icon" />
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
                      className="date-input"
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
                      className="date-input"
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

      {/* Sort Section */}
      <div className="sort-section">
        <div className="section-header">
          <span className="sort-label">Sort by:</span>
        </div>
        
        <div className="sort-container">
          <div className="filter-dropdown sort-dropdown">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="" disabled hidden>Sort by</option>
              <option value="ticketNumber">Ticket Number</option>
              <option value="subject">Subject</option>
              <option value="dateCreated">Date Created</option>
              <option value="lastUpdated">Last Updated</option>
            </select>
            
            <div className="sort-icons">
              <button
                onClick={toggleSortDirection}
                className="sort-direction-btn"
                disabled={!sortBy}
              >
                {sortDirection === 'asc' ? 
                  <ArrowUp size={14} className={`sort-arrow ${sortBy ? 'active' : 'inactive'}`} /> : 
                  <ArrowDown size={14} className={`sort-arrow ${sortBy ? 'active' : 'inactive'}`} />
                }
              </button>
              <ChevronDown size={16} className="dropdown-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketManagementFilters;