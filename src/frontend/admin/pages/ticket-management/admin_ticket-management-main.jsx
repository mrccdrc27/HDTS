import { useEffect, useState } from 'react';
import TicketManagementToolbar from './admin_ticket-management-toolbar.jsx';
import TicketManagementTable from './admin_ticket-management-table.jsx';
import { loadTickets, updateTicketStatus } from '../../../../utilities/ticket-data/ticketData.js';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Handle ticket status updates
  const handleStatusUpdate = async (ticketNumber, newStatus) => {
    try {
      setIsLoading(true);
      await updateTicketStatus(ticketNumber, newStatus);
      
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.number === ticketNumber ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error('Failed to update ticket status:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Filter & sort tickets based on filters
  const filteredTickets = tickets
    .filter(ticket => {
      // Search filter (checks subject and ticket number)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!ticket.subject?.toLowerCase().includes(query) && 
            !ticket.number?.toString().toLowerCase().includes(query)) {
          return false;
        }
      }

      // Category filter
      if (categoryFilter && ticket.category !== categoryFilter) {
        return false;
      }

      // Subcategory filter
      if (subcategoryFilter && ticket.subCategory !== subcategoryFilter) {
        return false;
      }

      // Status filter (with mapping for 'Open' to 'Approved/Open')
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
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59); // Include entire end day
        if (ticketDate > toDate) {
          return false;
        }
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
        {isLoading && <div className="loading-indicator">Loading...</div>}
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
          tickets={tickets}
        />
      </div>
      
      <div className="active-tickets-content">
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