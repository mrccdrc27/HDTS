import { generateCoordinatorReports } from "../../../../../utilities/storage/reports/coordinatorReports";

const SLAReportsInfo = ({ period }) => {
  const data = generateCoordinatorReports()[period] || [];

  return (
    <div>
      <h1>SLA Compliance Reports — {period}</h1>
      {data.length === 0 ? (
        <p>No SLA compliance data for this period.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Total Tickets</th>
              <th>Average Response Time</th>
              <th>SLA Compliance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coordinator) => (
              <tr key={coordinator.coordinatorId}>
                <td>{coordinator.name}</td>
                <td>{coordinator.department}</td>
                <td>{coordinator.totalTickets}</td>
                <td>{coordinator.averageResponseTime} mins</td>
                <td>{coordinator.slaCompliance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SLAReportsInfo;
