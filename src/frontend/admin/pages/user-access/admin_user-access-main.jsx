import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import UserAccessSearchAndCreateUser from "./admin_user-access-search-and-create-user.jsx";
import UserAccessFilters from "./admin_user-access-filters.jsx";
import UserAccessTable from "./admin_user-access-tables.jsx";
import ApprovalsFilters from "./admin_user-access-approval-filters.jsx";
import ApprovalsTable from "./admin_user-access-approval-table.jsx";
import TablePagination from "../../../shared/components/table-pagination.jsx";

const categoryDisplayMap = {
  'all-users': 'All Users',
  'users': 'Users',
  'ticket-agents': 'Ticket Agents',
  'system-admins': 'System Admins',
  'for-approvals': 'For Approvals',
};

const formatHeading = (category) => {
  if (!category) return 'All Users';
  const normalized = category.toLowerCase();
  return categoryDisplayMap[normalized] || normalized.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

const UserAccess = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const normalizedCategory = category?.toLowerCase() || 'all-users';
  const heading = formatHeading(category);

  // Filters
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Sorting
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Users
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load users from storage
  useEffect(() => {
    setIsLoading(true);
    import('/src/utilities/storage/userStorage.js').then(({ users: storedUsers }) => {
      setUsers(Array.isArray(storedUsers) ? storedUsers : []);
      setIsLoading(false);
    }).catch((err) => {
      console.error("Failed to load users:", err);
      setUsers([]);
      setIsLoading(false);
    });
  }, []);

  // Reset page when filters/search/sort/category change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    departmentFilter,
    roleFilter,
    statusFilter,
    dateFrom,
    dateTo,
    sortBy,
    sortDirection,
    searchTerm,
    normalizedCategory,
  ]);

  // Auto navigate by role
  useEffect(() => {
    if (normalizedCategory !== 'for-approvals') {
      const roleToCategory = {
        'System Admin': 'system-admins',
        'Ticket Agent': 'ticket-agents',
        'User': 'users',
        '': 'all-users',
      };
      if (roleFilter && roleToCategory[roleFilter] && roleToCategory[roleFilter] !== normalizedCategory) {
        navigate(`/admin/user-access/${roleToCategory[roleFilter]}`);
      }
    }
  }, [roleFilter, normalizedCategory, navigate]);

  const handleStatusUpdate = useCallback((userId, newStatus) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  }, []);

  const sharedFilters = {
    department: departmentFilter,
    role: roleFilter,
    status: statusFilter,
    dateFrom,
    dateTo,
    sortBy,
    sortDirection,
    searchTerm,
    currentPage,
    itemsPerPage,
  };

  return (
    <div className="user-access-main">
      <header className="user-access-header">
        <h2>{heading}</h2>
      </header>

      <section className="user-access-search">
        <UserAccessSearchAndCreateUser searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </section>

      {normalizedCategory === 'for-approvals' ? (
        <ApprovalsFilters
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      ) : (
        <UserAccessFilters
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      )}

      <div className="user-access-table-wrapper">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="spinner" />
          </div>
        ) : normalizedCategory === 'for-approvals' ? (
          <ApprovalsTable
            filters={sharedFilters}
            onStatusUpdate={handleStatusUpdate}
            onTotalItemsChange={setTotalItems}
          />
        ) : (
          <UserAccessTable
            users={users}
            filters={sharedFilters}
            onStatusUpdate={handleStatusUpdate}
            onTotalItemsChange={setTotalItems}
            normalizedCategory={normalizedCategory}
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
