import { generateDepartmentReports } from '../../../../../utilities/storage/reports/departmentReports';

const DepartmentReportsInfo = ({ period }) => {
  const reportData = generateDepartmentReports()[period] || {};

  const departments = Object.keys(reportData);

  return (
    <div>
      <h1>Department Reports — {period}</h1>
      {departments.length === 0 ? (
        <p>No department data available for this period.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Total Tickets</th>
              <th>Status Breakdown</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => {
              const { totalTickets, statusCounts } = reportData[dept];
              return (
                <tr key={dept}>
                  <td>{dept}</td>
                  <td>{totalTickets}</td>
                  <td>
                    {Object.entries(statusCounts).map(([status, count]) => (
                      <div key={status}>
                        {status}: {count}
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepartmentReportsInfo;
