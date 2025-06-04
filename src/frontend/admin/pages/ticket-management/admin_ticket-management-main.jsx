import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import AdminTicketManagementSearch from './admin_ticket-management-search.jsx';
import TicketManagementFilters from './admin_ticket-management-filters-and-sort.jsx';
import TicketManagementTable from './admin_ticket-management-table.jsx';
import TablePagination from '../../../shared/components/table-pagination.jsx';

const categoryDisplayMap = {
  'all-tickets': 'All Tickets',
  'new-tickets': 'New Tickets',
  'open-tickets': 'Open Tickets',
  'on-progress-tickets': 'On Progress Tickets',
  'pending-tickets': 'Pending Tickets',
  'rejected-tickets': 'Rejected Tickets',
};

const formatHeading = (category) => {
  if (!category) return 'All Tickets';
  const normalized = category.toLowerCase();
  return categoryDisplayMap[normalized] || normalized.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

const TicketManagement = () => {
  const { category } = useParams();
  const normalizedCategory = category?.toLowerCase() || 'all-tickets';
  const heading = formatHeading(category);

  // Filters state
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  // Optional date filters, you can implement UI inputs later
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Sorting state
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  // Search term
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Tickets and loading
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tickets once on mount
  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const fetchedTickets = await loadTickets(); // Make sure this returns Promise
        setTickets(Array.isArray(fetchedTickets) ? fetchedTickets : []);
      } catch (err) {
        console.error('Failed to load tickets:', err);
        setTickets([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // Reset page when filters/sort/search/category change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    departmentFilter,
    categoryFilter,
    subcategoryFilter,
    statusFilter,
    priorityFilter,
    dateFrom,
    dateTo,
    sortBy,
    sortDirection,
    searchTerm,
    normalizedCategory,
  ]);

  // Update ticket status
  const handleStatusUpdate = useCallback(async (ticketNumber, newStatus) => {
    setIsLoading(true);
    try {
      await updateTicketStatus(ticketNumber, newStatus);
      setTickets(prev =>
        prev.map(ticket =>
          ticket.ticketNumber === ticketNumber ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (err) {
      console.error('Failed to update ticket status:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="ticket-management-main">
      <header className="ticket-management-main-header">
        <h2>{heading}</h2>
      </header>

      <section className="ticket-management-main-search">
        <AdminTicketManagementSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </section>

      <TicketManagementFilters
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        subcategoryFilter={subcategoryFilter}
        setSubcategoryFilter={setSubcategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      <div className="ticket-management-main-table">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="spinner" />
          </div>
        ) : (
          <TicketManagementTable
            tickets={tickets}
            searchTerm={searchTerm}
            departmentFilter={departmentFilter}
            categoryFilter={categoryFilter}
            subcategoryFilter={subcategoryFilter}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            dateFrom={dateFrom}
            dateTo={dateTo}
            sortBy={sortBy}
            sortDirection={sortDirection}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
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

export default TicketManagement;
