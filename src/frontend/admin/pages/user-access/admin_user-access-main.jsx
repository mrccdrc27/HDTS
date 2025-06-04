import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import UserAccessSearchAndCreateUser from "./admin_user-access-search-and-create-user.jsx";
import UserAccessFilters from "./admin_user-access-filters.jsx";
import UserAccessTable from "./admin_user-access-tables.jsx";
import ApprovalsFilters from "./admin_user-access-approval-filters.jsx";
import ApprovalsTable from "./admin_user-access-approval-table.jsx";
import TablePagination from "../../../shared/components/table-pagination.jsx";

const categoryDisplayMap = {
  "all-users": "All Users",
  users: "Users",
  "ticket-agents": "Ticket Agents",
  "system-admins": "System Admins",
  "for-approvals": "For Approvals",
};

const formatHeading = (category) => {
  if (!category) return "All Users";
  const normalized = category.toLowerCase();
  return (
    categoryDisplayMap[normalized] ||
    normalized.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
};

const UserAccess = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const normalizedCategory = useMemo(
    () => category?.toLowerCase() || "all-users",
    [category]
  );
  const heading = useMemo(() => formatHeading(category), [category]);

  // Centralized filters state for both UserAccessFilters and ApprovalsFilters
  const [filters, setFilters] = useState({
    department: "",
    role: "",
    status: "",
    date: "",
    searchTerm: "",
    sortBy: "",
    sortDirection: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Update a single filter and reset page
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  useEffect(() => {
    setIsLoading(true);
    import("/src/utilities/storage/userStorage.js")
      .then(({ users: storedUsers }) => {
        setUsers(Array.isArray(storedUsers) ? storedUsers : []);
      })
      .catch((err) => {
        console.error("Failed to load users:", err);
        setUsers([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Navigate to role-specific category when role filter changes and category doesn't match
  useEffect(() => {
    if (normalizedCategory !== "for-approvals") {
      const roleToCategory = {
        "System Admin": "system-admins",
        "Ticket Agent": "ticket-agents",
        User: "users",
        "": "all-users",
      };
      if (
        filters.role &&
        roleToCategory[filters.role] &&
        roleToCategory[filters.role] !== normalizedCategory
      ) {
        navigate(`/admin/user-access/${roleToCategory[filters.role]}`);
      }
    }
  }, [filters.role, normalizedCategory, navigate]);

  // Handler for status update in ApprovalsTable
  const handleStatusUpdate = useCallback((userId, newStatus) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  }, []);

  return (
    <div className="user-access-main">
      <header className="user-access-header">
        <h2>{heading}</h2>
      </header>

      <section className="user-access-search">
        <UserAccessSearchAndCreateUser
          searchTerm={filters.searchTerm}
          setSearchTerm={(val) => updateFilter("searchTerm", val)}
        />
      </section>

      {normalizedCategory === "for-approvals" ? (
        <ApprovalsFilters
          department={filters.department}
          setDepartment={(val) => updateFilter("department", val)}
          status={filters.status}
          setStatus={(val) => updateFilter("status", val)}
          date={filters.date}
          setDate={(val) => updateFilter("date", val)}
          sortBy={filters.sortBy}
          setSortBy={(val) => updateFilter("sortBy", val)}
          sortDirection={filters.sortDirection}
          setSortDirection={(val) => updateFilter("sortDirection", val)}
        />
      ) : (
        <UserAccessFilters
          category={normalizedCategory}
          department={filters.department}
          role={filters.role}
          status={filters.status}
          date={filters.date}
          sortBy={filters.sortBy}
          sortDirection={filters.sortDirection}
          onFilterChange={(newFilters) => {
            Object.entries(newFilters).forEach(([key, value]) =>
              updateFilter(key, value)
            );
          }}
        />
      )}

      <div className="user-access-table-wrapper">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="spinner" />
          </div>
        ) : normalizedCategory === "for-approvals" ? (
          <ApprovalsTable
            users={users}
            filters={filters}
            onStatusUpdate={handleStatusUpdate}
            onTotalItemsChange={setTotalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        ) : (
          <UserAccessTable
            category={normalizedCategory}
            users={users}
            filters={filters}
            onSortChange={(key, direction) => {
              updateFilter("sortBy", key);
              updateFilter("sortDirection", direction);
            }}
            onTotalItemsChange={setTotalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      <TablePagination
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default UserAccess;
