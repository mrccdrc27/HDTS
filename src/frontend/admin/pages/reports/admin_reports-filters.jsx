const AdminReportsFilters = ({ category }) => {
    // Example dynamic options by category
    const departments = ['IT Department', 'Asset Department', 'Budget Department'];
    const coordinators = ['John Doe', 'Jane Smith', 'Alex Johnson'];
    const slaStatuses = ['Compliant', 'Non-Compliant', 'Pending'];

    return (
        <div className="admin-reports-filters">
            <h2>Admin Reports Filters</h2>

            {(category === 'ticket-reports' || category === 'department-reports') && (
                <div className="filter-dropdown">
                    <label htmlFor="department">Department:</label>
                    <select id="department" name="department">
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {category === 'ticket-coordinator-reports' && (
                <div className="filter-dropdown">
                    <label htmlFor="coordinator">Coordinator:</label>
                    <select id="coordinator" name="coordinator">
                        <option value="">Select Coordinator</option>
                        {coordinators.map((coor) => (
                            <option key={coor} value={coor}>
                                {coor}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {category === 'SLA-compliance-reports' && (
                <div className="filter-dropdown">
                    <label htmlFor="slaStatus">SLA Status:</label>
                    <select id="slaStatus" name="slaStatus">
                        <option value="">Select SLA Status</option>
                        {slaStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default AdminReportsFilters;
