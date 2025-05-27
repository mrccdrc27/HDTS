import { NavLink } from 'react-router-dom';

const AdminReportsTables = () => {
    return (
        <div className="admin-reports-tables">
        <h2>Admin Reports Tables</h2>
        <NavLink to="/admin/report-information" className="sample-report-link">
        Sample Reports View
      </NavLink>
        </div>
    );
}

export default AdminReportsTables;
