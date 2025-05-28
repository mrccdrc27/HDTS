import { useState } from 'react';
import './date-filter.css';

const DateFilter = ({ onApply, onClear }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const applyPreset = (preset) => {
    const today = new Date();
    let start, end;

    switch (preset) {
      case 'today':
        start = end = today.toISOString().split('T')[0];
        break;
      case 'last7':
        end = today.toISOString().split('T')[0];
        start = new Date(today.setDate(today.getDate() - 6)).toISOString().split('T')[0];
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
        break;
      case 'lastMonth':
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        start = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1).toISOString().split('T')[0];
        end = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).toISOString().split('T')[0];
        break;
      default:
        return;
    }

    setStartDate(start);
    setEndDate(end);
  };

  const handleApply = () => {
    if (onApply) onApply({ startDate, endDate });
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    if (onClear) onClear();
  };

  return (
    <div className="date-filter-popup">
      <div className="quick-presets">
        <button onClick={() => applyPreset('today')}>Today</button>
        <button onClick={() => applyPreset('last7')}>Last 7 Days</button>
        <button onClick={() => applyPreset('thisMonth')}>This Month</button>
        <button onClick={() => applyPreset('lastMonth')}>Last Month</button>
      </div>

      <div className="date-inputs">
        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="date-actions">
        <button onClick={handleClear} className="secondary-button">Clear</button>
        <button onClick={handleApply} className="primary-button" disabled={!startDate && !endDate}>Apply</button>
      </div>
    </div>
  );
};

export default DateFilter;
