import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import AdminTicketManagementSearch from './admin_ticket-management-search.jsx';
import TicketManagementFilters from './admin_ticket-management-filters-and-sort.jsx';
import TicketManagementTable from './admin_ticket-management-table.jsx';
import TablePagination from '../../components/shared/table-pagination.jsx';
import AdminTicketManagementReviewNewTicket from '../../components/modals/ticket-management/admin_ticket-management-review-ticket.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TicketManagement = () => {
  const { category } = useParams();

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

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
        setIsLoading(true);

        let accessToken = localStorage.getItem("adminAuthToken");
        const refreshToken = localStorage.getItem("adminRefreshToken");

        if (!accessToken || !refreshToken) {
          setError("Missing authentication tokens.");
          setIsLoading(false);
          return;
        }

        // Check expiration
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);

        if (payload.exp < now) {
          // Token expired, attempt refresh
          const refreshResponse = await fetch("http://localhost:8000/api/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            accessToken = refreshData.access;
            localStorage.setItem("adminAuthToken", accessToken);
          } else {
            setError("Session expired. Please log in again.");
            setIsLoading(false);
            return;
          }
        }

        // Proceed with valid token
        const response = await axios.get(`${API_BASE_URL}/api/tickets/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const mappedTickets = response.data.map(ticket => ({
          id: ticket.id,
          number: ticket.ticket_number,
          subject: ticket.subject,
          department: ticket.department,
          category: ticket.category,
          subCategory: ticket.sub_category,
          status: ticket.status,
          dateCreated: ticket.submit_date,
          lastUpdated: ticket.update_date,
        }));

        setTickets(mappedTickets);
      } catch (error) {
        console.error("Failed to load tickets:", error);
        setError("Unable to load tickets.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [category]);

  const updateTicketStatus = async (ticketId, newStatus) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const filteredTickets = tickets
    .filter(ticket => {
      if (category === 'new-tickets' && ticket.status !== 'New') return false;
      if (category === 'open-tickets' && ticket.status !== 'Open') return false;
      if (category === 'on-progress-tickets' && ticket.status !== 'On Progress') return false;
      if (category === 'pending-tickets' && ticket.status !== 'Pending') return false;
      if (category === 'rejected-tickets' && ticket.status !== 'Rejected') return false;
      if (categoryFilter && ticket.category !== categoryFilter) return false;
      if (subcategoryFilter && ticket.subCategory !== subcategoryFilter) return false;
      if (statusFilter && ticket.status !== statusFilter) return false;

      const created = new Date(ticket.dateCreated);
      if (dateFrom && created < new Date(dateFrom)) return false;
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59);
        if (created > end) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dA = new Date(a.dateCreated);
      const dB = new Date(b.dateCreated);
      return sortAsc ? dA - dB : dB - dA;
    });

  const handleReviewClick = (ticketId) => {
    setSelectedTicketId(ticketId);
    setShowReviewModal(true);
  };

  const handleCloseReview = () => {
    setSelectedTicketId(null);
    setShowReviewModal(false);
  };

  if (error) {
    return (
      <div className="ticket-management-main">
        <div className="error-message">
          <h2>Error Loading Tickets</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ticket-management-main">
      <div className="ticket-management-main-header">
        <h1>{getFormattedCategory(category)}</h1>
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
            onStatusUpdate={updateTicketStatus}
            currentCategory={category}
            onReviewClick={handleReviewClick}
          />
        )}
      </div>

      <div className="pagination">
        <TablePagination />
      </div>

      {showReviewModal && selectedTicketId && (
        <AdminTicketManagementReviewNewTicket
          ticketId={selectedTicketId}
          onClose={handleCloseReview}
          onTicketUpdated={updateTicketStatus}
        />
      )}
    </div>
  );
};

export default TicketManagement;