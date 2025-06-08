import { useState, useEffect } from 'react';
import './date-filter.css';

const DateFilter = ({
  startDate: propStartDate,
  endDate: propEndDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
  onClear,
  onClose, // NEW: callback to close the dropdown
}) => {
  const [startDate, setStartDate] = useState(propStartDate || '');
  const [endDate, setEndDate] = useState(propEndDate || '');

  // Sync local state when props change
  useEffect(() => {
    setStartDate(propStartDate || '');
  }, [propStartDate]);

  useEffect(() => {
    setEndDate(propEndDate || '');
  }, [propEndDate]);

  const applyPreset = (preset) => {
    const today = new Date();
    let start, end;

    switch (preset) {
      case 'today':
        start = end = today.toISOString().split('T')[0];
        break;
      case 'last7': {
        const endDate = today.toISOString().split('T')[0];
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 6);
        start = startDate.toISOString().split('T')[0];
        end = endDate;
        break;
      }
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
        break;
      default:
        return;
    }

    setStartDate(start);
    setEndDate(end);
    if (onStartDateChange) onStartDateChange(start);
    if (onEndDateChange) onEndDateChange(end);
    if (onClose) onClose(); // ✅ Auto-close dropdown after preset click
  };

  const handleApply = () => {
    if (onApply) onApply({ startDate, endDate });
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    if (onStartDateChange) onStartDateChange('');
    if (onEndDateChange) onEndDateChange('');
    if (onClear) onClear();
  };

  return (
    <div className="date-filter-popup">
      <div className="quick-presets">
        <button type="button" onClick={() => applyPreset('today')}>Today</button>
        <button type="button" onClick={() => applyPreset('last7')}>Last 7 Days</button>
        <button type="button" onClick={() => applyPreset('thisMonth')}>This Month</button>
      </div>

      <div className="date-inputs">
        <div>
          <label htmlFor="start-date-input">Start Date</label>
          <input
            id="start-date-input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="end-date-input">End Date</label>
          <input
            id="end-date-input"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="date-actions">
        <button
          type="button"
          onClick={handleClear}
          className="secondary-button"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="primary-button"
          disabled={!startDate && !endDate}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateFilter;
