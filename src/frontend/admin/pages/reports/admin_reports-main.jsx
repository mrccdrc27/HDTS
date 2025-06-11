import { useParams } from 'react-router-dom';
import AdminReportsPrint from "./admin_reports-print.jsx";
import AdminReportsList from './admin_reports-content.jsx';
import './admin_reports-main.css';
const AdminReports = () => {
  const { category } = useParams();

  const formatHeading = (category) => {
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="admin-reports-main">
      <div className="admin-reports-header">
        <h2 className="admin-reports-title">{formatHeading(category)}</h2>
        <AdminReportsPrint />
      </div>

      <div className="admin-reports-main-list">
        <AdminReportsList category={category} />
      </div>
    </div>
  );
};

export default AdminReports;
