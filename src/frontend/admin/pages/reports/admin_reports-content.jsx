import { NavLink } from 'react-router-dom';
import './admin_reports-content.css';

import { generateTicketReports } from '../../../../utilities/storage/reports/ticketReports';
import { generateCoordinatorReports } from '../../../../utilities/storage/reports/coordinatorReports';
import { generateDepartmentReports } from '../../../../utilities/storage/reports/departmentReports';
import { generateSLAComplianceReports } from '../../../../utilities/storage/reports/slaReports';

const reports = [
  { title: 'Ticket Reports', link: 'ticket-reports' },
  { title: 'Ticket Coordinator Reports', link: 'ticket-coordinator-reports' },
  { title: 'Department Report', link: 'department-reports' },
  { title: 'SLA Compliance Report', link: 'SLA-compliance-reports' }
];

const formatPeriodLabel = (period) => {
  const now = new Date();
  const year = now.getFullYear();

  switch (period) {
    case 'today': return `Today, ${year}`;
    case 'week': return `This Week, ${year}`;
    case 'month': return `This Month, ${year}`;
    default: return `${year}`;
  }
};

const isPeriodDataEmpty = (data) => {
  if (!data) return true;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === 'object') return Object.keys(data).length === 0;
  return false;
};

const isDateInRange = (dateStr, startDate, endDate) => {
  if (!startDate && !endDate) return true;

  const itemDate = new Date(dateStr);
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (start && end) return itemDate >= start && itemDate <= end;
  if (start) return itemDate >= start;
  if (end) return itemDate <= end;

  return true;
};

const AdminReportsTables = ({ category, startDate, endDate, sortDirection }) => {
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
  const periods = ['today', 'week', 'month'];

  return (
    <div className="admin-reports-container">
      <div className="report-group">
        {periods.map((periodKey) => {
          const rawData = reportData?.[periodKey];
          let periodData = Array.isArray(rawData)
            ? rawData.filter((item) =>
                isDateInRange(item.dateCreated, startDate, endDate)
              )
            : rawData;

          // Apply sort direction if data is an array
          if (Array.isArray(periodData)) {
            periodData.sort((a, b) => {
              const dateA = new Date(a.dateCreated);
              const dateB = new Date(b.dateCreated);
              return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
            });
          }

          const hasData = !isPeriodDataEmpty(periodData);

          const periodLabel =
            periodKey === 'today'
              ? 'Today Reports'
              : periodKey === 'week'
              ? 'Weekly Reports'
              : 'Monthly Reports';

          return (
            <div key={periodKey} className="report-category">
              <h3 className="category-title">{periodLabel}</h3>

              {hasData ? (
                <div className="report-list">
                  <NavLink
                    to={`/admin/report-information/${matchedReport.link}?period=${periodKey}`}
                    className="report-item"
                  >
                    <div className="report-info">
                      <h4 className="report-name">
                        {matchedReport.title} — {formatPeriodLabel(periodKey)}
                      </h4>
                    </div>
                  </NavLink>
                </div>
              ) : (
                <div className="report-empty">
                  No reports for {formatPeriodLabel(periodKey)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminReportsTables;
