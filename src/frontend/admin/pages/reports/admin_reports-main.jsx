import { useParams } from 'react-router-dom';

import AdminReportsSearchPrint from "./admin_reports-search-print.jsx";
import AdminReportsFilters from "./admin_reports-filters.jsx";
import AdminReportsTables from "./admin_reports-tables.jsx";

import TablePagination from '../../../shared/components/table-pagination.jsx';

const AdminReports = () => {
    const { category } = useParams();
    
    const formatHeading = (category) => {
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');};

    return (
        <div className="admin-reports-main">
            <div className="admin-reports-main-header">
                <h1>{formatHeading(category)}</h1>
            </div>

            <div className="admin-reports-main-search-print">
                <AdminReportsSearchPrint />
            </div>    

            <div className="admin-reports-main-filters">
                <AdminReportsFilters />
            </div>

            <div className="admin-reports-main-tables">
                <AdminReportsTables />
            </div>

            <div className="pagination">
                <TablePagination />
            </div>
        </div>
    );
}

export default AdminReports;