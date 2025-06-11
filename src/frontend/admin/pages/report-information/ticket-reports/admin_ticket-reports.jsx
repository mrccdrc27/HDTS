import { generateTicketReports } from '../../../../../utilities/storage/reports/ticketReports';

const TicketReportsInfo = ({ period }) => {
  const report = generateTicketReports()[period] || {
    total: 0,
    byStatus: {},
    byPriority: {},
  };

  return (
    <div>
      <h1>Ticket Reports — {period}</h1>

      <div className="report-section">
        <p><strong>Total Tickets:</strong> {report.total}</p>
      </div>

      <div className="report-section">
        <h2>Status Breakdown</h2>
        {Object.entries(report.byStatus).length === 0 ? (
          <p>No tickets by status.</p>
        ) : (
          <ul>
            {Object.entries(report.byStatus).map(([status, count]) => (
              <li key={status}>{status}: {count}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="report-section">
        <h2>Priority Breakdown</h2>
        {Object.entries(report.byPriority).length === 0 ? (
          <p>No tickets by priority.</p>
        ) : (
          <ul>
            {Object.entries(report.byPriority).map(([priority, count]) => (
              <li key={priority}>{priority}: {count}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TicketReportsInfo;
