import { generateCoordinatorReports } from '../../../../../utilities/storage/reports/coordinatorReports';

const CoordinatorReportsInfo = ({ period }) => {
  const reportData = generateCoordinatorReports()[period] || [];

  return (
    <div>
      <h1>Ticket Coordinator Reports — {period}</h1>
      {reportData.length === 0 ? (
        <p>No coordinator report data available for this period.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Total Tickets</th>
              <th>Status Breakdown</th>
              <th>Avg. Response Time</th>
              <th>SLA Compliance</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((coordinator) => (
              <tr key={coordinator.coordinatorId}>
                <td>{coordinator.name}</td>
                <td>{coordinator.department}</td>
                <td>{coordinator.totalTickets}</td>
                <td>
                  {Object.entries(coordinator.statusCounts).map(([status, count]) => (
                    <div key={status}>
                      {status}: {count}
                    </div>
                  ))}
                </td>
                <td>{coordinator.averageResponseTime} hrs</td>
                <td>{coordinator.slaCompliance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoordinatorReportsInfo;
