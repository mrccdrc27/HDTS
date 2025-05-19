import { useEffect, useState } from 'react';
import TicketManagementToolbar from './admin_ticket-management-toolbar.jsx';
import TicketManagementTable from './admin_ticket-management-table.jsx';
import { loadTickets } from '../../../../utilities/ticket-data/ticketData.js';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  // Load tickets on mount
  useEffect(() => {
    const fetchedTickets = loadTickets();
    setTickets(Array.isArray(fetchedTickets) ? fetchedTickets : []);
  }, []);

  // Filter & sort tickets based on filters
  const filteredTickets = tickets
    .filter(ticket => {
      // Search filter
      if (searchQuery && !ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (categoryFilter && ticket.category !== categoryFilter) {
        return false;
      }

      // Subcategory filter
      if (subcategoryFilter && ticket.subCategory !== subcategoryFilter) {
        return false;
      }

      // Status filter
      if (statusFilter) {
        const normalizedStatus = statusFilter === 'Open' ? 'Approved/Open' : statusFilter;
        if (ticket.status !== normalizedStatus) {
          return false;
        }
      }

      // Date range filters
      const ticketDate = new Date(ticket.dateCreated);
      if (dateFrom && ticketDate < new Date(dateFrom)) {
        return false;
      }
      if (dateTo && ticketDate > new Date(dateTo)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateCreated);
      const dateB = new Date(b.dateCreated);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="active-tickets-layout">
      <div className="active-tickets-header">
        <h2>Ticket Management</h2>
      </div>
      <div className="active-tickets-toolbar">
        <TicketManagementToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          subcategoryFilter={subcategoryFilter}
          setSubcategoryFilter={setSubcategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          sortAsc={sortAsc}
          setSortAsc={setSortAsc}
          tickets={tickets} // optional, for dropdown options
        />
      </div>
      <div className="active-tickets-content">
        <TicketManagementTable filteredTickets={filteredTickets} />
      </div>
    </div>
  );
};

export default TicketManagement;
