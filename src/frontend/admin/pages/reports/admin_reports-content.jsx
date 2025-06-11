import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './admin_reports-content.css';

import { generateTicketReports } from '../../../../utilities/storage/reports/ticketReports';
import { generateCoordinatorReports } from '../../../../utilities/storage/reports/coordinatorReports';
import { generateDepartmentReports } from '../../../../utilities/storage/reports/departmentReports';
import { generateSLAComplianceReports } from '../../../../utilities/storage/reports/slaReports';

const reports = [
  { title: 'Ticket Reports', link: 'ticket-reports' },
  { title: 'Ticket Coordinator Reports', link: 'ticket-coordinator-reports' },
  { title: 'Department Report', link: 'department-reports' },
  { title: 'SLA Compliance Report', link: 'SLA-compliance-reports' },
];

const getWeekRangeLabel = (weekIndex) => {
  const baseDate = new Date(2025, 0, 1);
  baseDate.setHours(0, 0, 0, 0);
  const start = new Date(baseDate);
  const day = baseDate.getDay();
  if (day !== 0) start.setDate(start.getDate() - day);
  start.setDate(start.getDate() + (weekIndex - 1) * 7);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const format = (d) =>
    `${d.toLocaleString('default', { month: 'long' })} ${d.getDate()}, ${d.getFullYear()}`;

  return `Week ${weekIndex} — ${format(start)} – ${format(end)}`;
};

const isPeriodDataEmpty = (data) => {
  if (!data) return true;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === 'object') {
    return Object.values(data).every((dept) =>
      Object.values(dept).every((val) => val === 0)
    );
  }
  return true;
};

const isDateInRange = (dateStr, startDate, endDate) => {
  if (!startDate && !endDate) return true;
  const itemDate = new Date(dateStr);
  if (startDate && itemDate < new Date(startDate)) return false;
  if (endDate && itemDate > new Date(endDate)) return false;
  return true;
};

const AdminReportsList = ({ category, startDate, endDate, sortDirection }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 10000);
    return () => clearInterval(interval);
  }, []);

  const matchedReport = reports.find((r) => r.link === category);
  if (!matchedReport) return null;

  const getReportData = () => {
    switch (category) {
      case 'ticket-reports':
        return generateTicketReports();
      case 'ticket-coordinator-reports':
        return generateCoordinatorReports();
      case 'department-reports':
        return generateDepartmentReports();
      case 'SLA-compliance-reports':
        return generateSLAComplianceReports();
      default:
        return null;
    }
  };

  const reportData = getReportData();
  if (!reportData) return null;

  const groupedKeys = {
    today: ['today'],
    weeks: Object.keys(reportData)
      .filter((key) => key.startsWith('week-'))
      .sort((a, b) => parseInt(b.split('-')[1]) - parseInt(a.split('-')[1]))
      .reverse(),
    months: Object.keys(reportData)
      .filter((key) => key.startsWith('month-'))
      .sort((a, b) => parseInt(b.split('-')[1]) - parseInt(a.split('-')[1]))
      .reverse(),
  };

  const renderReportItem = (key) => {
    const rawData = reportData[key];
    let hasData = false;
    let label = '';

    if (key === 'today') {
      label = `Today, ${currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}`;
      hasData = true; // Always show today
    } else {
      const periodData = rawData;

      if (Array.isArray(periodData)) {
        const filtered = periodData.filter((item) =>
          isDateInRange(item.dateCreated, startDate, endDate)
        );

        filtered.sort((a, b) => {
          const dateA = new Date(a.dateCreated);
          const dateB = new Date(b.dateCreated);
          return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });

        hasData = filtered.length > 0;
      } else {
        hasData = !isPeriodDataEmpty(periodData);
      }

      if (key.startsWith('week-')) {
        const weekIndex = parseInt(key.split('-')[1]);
        label = getWeekRangeLabel(weekIndex);
      } else if (key.startsWith('month-')) {
        const monthOffset = parseInt(key.split('-')[1]) - 1;
        const date = new Date(2025, monthOffset, 1);
        label = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      }
    }

    return (
      <div key={key} className="report-list">
        <NavLink
          to={`/admin/report-information/${matchedReport.link}?period=${key}`}
          className="report-item"
        >
          <div className="report-info">
            <h4 className="report-name">
              {matchedReport.title} — {label}
            </h4>
          </div>
        </NavLink>

        {!hasData && key !== 'today' && (
          <div className="report-empty">No reports for {label}</div>
        )}
      </div>
    );
  };

  return (
    <div className="admin-reports-container">
      <div className="tab-header">
        <div className="tab-buttons">
          <div className="tab-buttons-left">
            {['today', 'weeks', 'months'].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'today' ? 'Today' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="year-filter-container">
            <label htmlFor="year-select">Year</label>
            <div className="year-dropdown-wrapper">
              <select id="year-select" className="year-select" defaultValue="2025">
                <option value="2025">2025</option>
              </select>
              <ChevronDown size={16} className="year-dropdown-icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="report-group">
        {groupedKeys[activeTab]?.map((key) => renderReportItem(key))}
      </div>
    </div>
  );
};

export default AdminReportsList;
