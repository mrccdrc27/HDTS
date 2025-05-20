import { Search, ArrowUpAZ, ArrowDownZA, Calendar, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import CreateTicketButton from '../../../user/components/buttons/create-ticket.jsx';
import { ticketCategories } from '../../../../utilities/ticket/categoryAndSubCategory.js';
// import '../../../styles/pages/user/active-tickets/user_active-tickets-toolbar.css';

// Updated statuses to match Ticket Records statuses
const ticketManagementStatuses = ['Submitted', 'Approved/Open', 'Pending', 'On Progress', 'On Hold', 'Resolved'];

[];
const TicketManagementToolbar = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  subcategoryFilter,
  setSubcategoryFilter,
  statusFilter,
  setStatusFilter,
  sortAsc,
  setSortAsc,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}) => {
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
  }, [categoryFilter, setSubcategoryFilter]);

  const handleClearDates = () => {
    setDateFrom('');
    setDateTo('');
  };

  const toggleSortDirection = () => setSortAsc((prev) => !prev);
  const toggleDatePopup = () => setShowDatePopup((prev) => !prev);

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
    <div className="active-tickets-toolbar-container">
      <div className="search-create-row">
        <div className="search-input">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search tickets"
          />
        </div>
        <CreateTicketButton />
      </div>

      <div className="filters-row">
        <span className="filter-label">Filter by:</span>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {Object.keys(ticketCategories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={subcategoryFilter}
          onChange={(e) => setSubcategoryFilter(e.target.value)}
          disabled={!categoryFilter}
          aria-label="Filter by subcategory"
        >
          <option value="">All Subcategories</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          {ticketManagementStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <div className="date-filter-wrapper">
          <button
            onClick={toggleDatePopup}
            aria-expanded={showDatePopup}
            aria-label="Date filter"
          >
            <Calendar size={16} />
            <span>{getDateButtonText()}</span>
          </button>

          {showDatePopup && (
            <div ref={popupRef} className="date-popover">
              <div className="popover-header">
                <h4>Select Date Range</h4>
                <button
                  onClick={() => setShowDatePopup(false)}
                  className="close-button"
                  aria-label="Close date picker"
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

      <div className="sort-row">
        <span className="sort-label">Sort by:</span>
        <span className="sort-criteria">Date</span>
        <button
          onClick={toggleSortDirection}
          title={`Sort by Date (${sortAsc ? 'Oldest First' : 'Newest First'})`}
          aria-label={`Sort by date ${sortAsc ? 'ascending' : 'descending'}`}
          className="sort-button"
        >
          {sortAsc ? <ArrowUpAZ size={18} /> : <ArrowDownZA size={18} />}
        </button>
      </div>
    </div>
  );
};

export default TicketManagementToolbar;
