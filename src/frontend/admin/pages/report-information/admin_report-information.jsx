import { useParams, useSearchParams } from 'react-router-dom';
import TicketReportsInfo from './ticket-reports/admin_ticket-reports';
import CoordinatorReportsInfo from './ticket-coordinator-reports/admin_ticket-coordinator-reports';
import DepartmentReportsInfo from './department-reports/admin_department-reports';
import SLAReportsInfo from './sla-complicance-reports/admin_sla-compliance-reports';

const AdminReportInformation = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const period = searchParams.get('period');

  const renderReport = () => {
    switch (category) {
      case 'ticket-reports':
        return <TicketReportsInfo period={period} />;
      case 'ticket-coordinator-reports':
        return <CoordinatorReportsInfo period={period} />;
      case 'department-reports':
        return <DepartmentReportsInfo period={period} />;
      case 'SLA-compliance-reports':
        return <SLAReportsInfo period={period} />;
      default:
        return <div>Unknown Report Category</div>;
    }
  };

  return (
    <div className="admin-report-info-container">
      {renderReport()}
    </div>
  );
};

export default AdminReportInformation;
