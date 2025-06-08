import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import DateFilter from '../../../shared/components/date-filter.jsx';
import './admin_reports-filters.css';

const AdminReportsFilters = ({
  startDate = '',
  endDate = '',
  onStartDateChange,
  onEndDateChange,
}) => {
  // Local state for date filter dropdown visibility
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Local state for sort direction (owning the state here)
  const [sortDirection, setSortDirection] = useState('desc');

  const dateFilterRef = useRef(null);

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

  // Toggle sort direction locally
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="admin-reports-filters-wrapper">
      {/* Date Filter */}
      <div
        className="admin-reports-filter-dropdown date-filter-wrapper"
        ref={dateFilterRef}
      >
        <button
          type="button"
          onClick={() => setShowDateFilter((prev) => !prev)}
          className="admin-reports-date-filter-button"
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

      {/* Sort By Text (plain) + Icon (clickable button only) */}
      <div className="admin-reports-sort-wrapper">
        <span className="admin-reports-sort-text">Sort By</span>
        <button
          type="button"
          onClick={toggleSortDirection}
          aria-label={`Toggle sort direction, currently ${
            sortDirection === 'asc' ? 'ascending' : 'descending'
          }`}
          className="admin-reports-sort-icon-button"
        >
          {sortDirection === 'asc' ? (
            <ArrowUp size={16} className="admin-reports-sort-icon" />
          ) : (
            <ArrowDown size={16} className="admin-reports-sort-icon" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminReportsFilters;
