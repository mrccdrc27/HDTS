import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserAccessSearchAndCreateUser from "./admin_user-access-search-and-create-user.jsx";
import UserAccessFilters from "./admin_user-access-filters.jsx";
import UserAccessTable from "./admin_user-access-tables.jsx";
import ApprovalsFilters from "./admin_user-access-approval-filters.jsx";
import ApprovalsTable from "./admin_user-access-approval-table.jsx";
import TablePagination from '../../components/shared/table-pagination.jsx';

const UserAccess = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    department: "",
    role: "",
    status: "",
    date: ""
  });

  const getFormattedCategory = (key) => {
    const displayMap = {
      "all-users": "All Users",
      "users": "Users",
      "ticket-agents": "Ticket Agents",
      "system-admins": "System Admins",
      "for-approvals": "For Approvals"
    };

    return displayMap[key] || key.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    // Role-based navigation (not for approvals)
    if (category !== "for-approvals") {
      const roleToCategoryMap = {
        "System Admin": "system-admins",
        "Ticket Agent": "ticket-agents",
        "User": "users",
        "": "all-users"
      };

      const selectedRole = newFilters.role;
      const newCategory = roleToCategoryMap[selectedRole];

      if (newCategory && newCategory !== category) {
        navigate(`/admin/user-access/${newCategory}`);
      }
    }
  };

  return (
    <div className="user-access-main">
      <h1>{getFormattedCategory(category)}</h1>
      <UserAccessSearchAndCreateUser />

      {category === "for-approvals" ? (
        <>
          <ApprovalsFilters onFilterChange={handleFilterChange} />
          <ApprovalsTable filters={filters} />
        </>
      ) : (
        <>
          <UserAccessFilters category={category} onFilterChange={handleFilterChange} />
          <UserAccessTable category={category} filters={filters} />
        </>
      )}

    <div className="pagination">
      <TablePagination />
    </div>
    </div>
  );
};

export default UserAccess;
