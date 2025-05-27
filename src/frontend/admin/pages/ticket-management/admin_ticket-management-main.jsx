import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AdminTicketManagementSearch from './admin_ticket-management-search.jsx';
import TicketManagementFilters from './admin_ticket-management-filters-and-sort.jsx';
import TicketManagementTable from './admin_ticket-management-table.jsx';
import { loadTickets, updateTicketStatus } from '../../../../utilities/ticket-data/ticketData.js';

const TicketManagement = () => {
  const { category } = useParams();

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const getFormattedCategory = (key) => {
    const displayMap = {
      'all-tickets': 'All Tickets',
      'new-tickets': 'New Tickets',
      'open-tickets': 'Open Tickets',
      'on-progress-tickets': 'On Progress Tickets',
      'pending-tickets': 'Pending Tickets',
      'rejected-tickets': 'Rejected Tickets',
    };
    return displayMap[key] || key.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = loadTickets();
        setTickets(Array.isArray(fetchedTickets) ? fetchedTickets : []);
      } catch (error) {
        console.error('Failed to load tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleStatusUpdate = async (ticketNumber, newStatus) => {
    try {
      setIsLoading(true);
      await updateTicketStatus(ticketNumber, newStatus);
      setTickets(prev =>
        prev.map(ticket => ticket.number === ticketNumber ? { ...ticket, status: newStatus } : ticket)
      );
    } catch (error) {
      console.error('Failed to update ticket status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTickets = tickets
    .filter(ticket => {
      if (categoryFilter && ticket.category !== categoryFilter) return false;
      if (subcategoryFilter && ticket.subCategory !== subcategoryFilter) return false;
      if (statusFilter) {
        const normalized = statusFilter === 'Open' ? 'Approved/Open' : statusFilter;
        if (ticket.status !== normalized) return false;
      }
      const date = new Date(ticket.dateCreated);
      if (dateFrom && date < new Date(dateFrom)) return false;
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59);
        if (date > toDate) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dA = new Date(a.dateCreated);
      const dB = new Date(b.dateCreated);
      return sortAsc ? dA - dB : dB - dA;
    });

  return (
    <div className="ticket-management-main">
      <div className="ticket-management-main-header">
        <h2>{getFormattedCategory(category)}</h2>
      </div>

      <div className="ticket-management-main-search">
        <AdminTicketManagementSearch />
      </div>

      <div className="ticket-management-main-filters">
        <TicketManagementFilters
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
          tickets={tickets}
        />
      </div>

      <div className="ticket-management-main-table">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        ) : (
          <TicketManagementTable
            filteredTickets={filteredTickets}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default TicketManagement;
