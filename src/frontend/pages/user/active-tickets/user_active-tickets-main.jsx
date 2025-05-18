import { useEffect, useState } from 'react';
import ActiveTicketsToolbar from './user_active-tickets-toolbar.jsx';
import ActiveTicketsTable from './user_active-tickets-table.jsx';
import { loadTickets } from '../../../../utilities/ticket-data/ticketData.js';

const ActiveTickets = () => {
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
    if (!Array.isArray(fetchedTickets)) {
      setTickets([]);
    } else {
      setTickets(fetchedTickets);
    }
  }, []);

  // Filter & sort tickets based on filters
  const filteredTickets = tickets
    .filter(ticket => {
      // Only active statuses considered
      const activeStatuses = ['Submitted', 'Approved/Open', 'Pending', 'On Progress', 'On Hold'];
      if (!activeStatuses.includes(ticket.status)) return false;

      if (searchQuery && !ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (categoryFilter && ticket.category !== categoryFilter) return false;
      if (subcategoryFilter && ticket.subCategory !== subcategoryFilter) return false;

      // Map "Open" filter to "Approved/Open" status
      if (statusFilter) {
        const normalizedStatus = statusFilter === 'Open' ? 'Approved/Open' : statusFilter;
        if (ticket.status !== normalizedStatus) return false;
      }

      if (dateFrom && new Date(ticket.dateCreated) < new Date(dateFrom)) return false;
      if (dateTo && new Date(ticket.dateCreated) > new Date(dateTo)) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortAsc) return new Date(a.dateCreated) - new Date(b.dateCreated);
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    });

  return (
    <div className="active-tickets-layout">
      <div className="active-tickets-header">
        <h2>Active Tickets</h2>
      </div>
      <div className="active-tickets-toolbar">
        <ActiveTicketsToolbar
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
          tickets={tickets} // optional, if toolbar needs for dropdown options
        />
      </div>
      <div className="active-tickets-content">
        <ActiveTicketsTable filteredTickets={filteredTickets} />  
      </div>
    </div>
  );
};

export default ActiveTickets;
