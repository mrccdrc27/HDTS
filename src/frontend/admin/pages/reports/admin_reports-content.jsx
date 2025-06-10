import { NavLink } from 'react-router-dom';
import './admin_reports-content.css';
// import { todayTickets } from '../../../../utilities/storage/reports/ticketReports';

const reports = [
  {
    title: "Ticket Reports",
    description: "View all submitted tickets with status, priority, and SLA info.",
    link: "ticket-reports"
  },
  {
    title: "Ticket Coordinator Reports",
    description: "Review ticket coordinator performance and resolution times.",
    link: "ticket-coordinator-reports"
  },
  {
    title: "Department Report",
    description: "Summarize ticket volume and metrics by department.",
    link: "department-reports"
  },
  {
    title: "SLA Compliance Report",
    description: "Evaluate tickets for SLA compliance across categories.",
    link: "SLA-compliance-reports"
  }
];

const AdminReportsTables = ({ category }) => {
  const filteredReports = reports.filter(report => report.link === category);

  if (filteredReports.length === 0) return null;

  // Get current week number
  const getCurrentWeek = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.ceil(diff / oneWeek);
  };

  const currentWeek = getCurrentWeek();
  const totalWeeks = 52;

  return (
    <div className="admin-reports-container">
      {filteredReports.map((report, index) => (
        <div key={index} className="report-group">
          {/* Today Reports Section */}
          <div className="report-category">
            <h3 className="category-title">Today Reports</h3>
            <div className="report-list">
              <NavLink
                to={`/admin/report-information/${report.link}?period=today`}
                className="report-item"
              >
                <div className="report-info">
                  <h4 className="report-name">Today's {report.title}</h4>
                  <p className="report-desc">{report.description}</p>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Weekly Reports Section */}
          <div className="report-category">
            <h3 className="category-title">Weekly Reports</h3>
            <div className="report-list">
              <NavLink
                to={`/admin/report-information/${report.link}?period=week`}
                className="report-item"
              >
                <div className="report-info">
                  <h4 className="report-name">Week {currentWeek} of {totalWeeks} - {report.title}</h4>
                  <p className="report-desc">{report.description}</p>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Monthly Reports Section */}
          <div className="report-category">
            <h3 className="category-title">Monthly Reports</h3>
            <div className="report-list">
              <NavLink
                to={`/admin/report-information/${report.link}?period=month`}
                className="report-item"
              >
                <div className="report-info">
                  <h4 className="report-name">Monthly {report.title}</h4>
                  <p className="report-desc">{report.description}</p>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Add spacing between different report types */}
          {index < filteredReports.length - 1 && <div className="report-group-divider"></div>}
        </div>
      ))}
    </div>
  );
};

export default AdminReportsTables;
