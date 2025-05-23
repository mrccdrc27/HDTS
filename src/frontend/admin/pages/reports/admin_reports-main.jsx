// 1. header where the reports will be displayed (agent performance report, derpartment report, sla compliance report)
// 2. search bar and print report button 
// 3. filters such as category, subcategory, department, date range
// 4. table to display the report data

import AdminReportsSearchPrint from "./admin_reports-search-print.jsx";
import AdminReportsFilters from "./admin_reports-filters.jsx";
import AdminReportsTables from "./admin_reports-tables.jsx";

const AdminReports = () => {
    return (
        <div className="admin-reports-main">
            <div className="admin-reports-main-header">
                <h1>Admin Reports</h1>
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

        </div>
    );
}

export default AdminReports;