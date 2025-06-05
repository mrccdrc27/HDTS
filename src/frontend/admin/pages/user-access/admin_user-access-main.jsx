import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import UserAccessSearchAndCreateUser from "./admin_user-access-search-and-create-user.jsx";
import UserAccessFilters from "./admin_user-access-filters.jsx";
import UserAccessTable from "./admin_user-access-tables.jsx";
import TablePagination from "../../../shared/components/table-pagination.jsx";

const categoryDisplayMap = {
  "all-users": "All Users",
  users: "Users",
  "ticket-agents": "Ticket Agents",
  "system-admins": "System Admins",
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

  const normalizedCategory = useMemo(
    () => category?.toLowerCase() || "all-users",
    [category]
  );

  const heading = useMemo(() => formatHeading(category), [category]);

  // Filters and sorting state
  const [filters, setFilters] = useState({
    department: "",
    role: "",
    status: "",
    date: "",
    searchTerm: "",
    sortBy: "",
    sortDirection: "asc",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // User data and loading state
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to update filters and reset page
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Load users once on mount
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

      <UserAccessFilters
        category={normalizedCategory}
        department={filters.department}
        role={filters.role}
        setRole={(val) => updateFilter("role", val)}
        status={filters.status}
        setStatus={(val) => updateFilter("status", val)}
        date={filters.date}
        setDate={(val) => updateFilter("date", val)}
        sortBy={filters.sortBy}
        sortDirection={filters.sortDirection}
        onFilterChange={(newFilters) => {
          Object.entries(newFilters).forEach(([key, value]) =>
            updateFilter(key, value)
          );
        }}
        searchTerm={filters.searchTerm}
        setSearchTerm={(val) => updateFilter("searchTerm", val)}
      />

      <div className="user-access-table-wrapper">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="spinner" />
          </div>
        ) : (
          <UserAccessTable
            category={normalizedCategory}
            users={users}
            filters={filters}
            sortBy={filters.sortBy}
            sortDirection={filters.sortDirection}
            onSortChange={(key, direction) => {
              updateFilter("sortBy", key);
              updateFilter("sortDirection", direction);
            }}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onTotalItemsChange={setTotalItems}
          />
        )}
      </div>

      <TablePagination
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        initialItemsPerPage={itemsPerPage}  
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default UserAccess;
