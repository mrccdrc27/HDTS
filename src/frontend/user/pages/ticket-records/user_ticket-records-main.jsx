import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import UserTicketRecordsSearch from './user_ticket-records-search';
import UserTicketRecordsFilterAndSort from './user_ticket-records-filter-and-sort.jsx';
import UserTicketRecordsTable from './user_ticket-records-table';

const TicketRecords = () => {
  const { category } = useParams();
  const [tickets, setTickets] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const categoryTitles = {
    'all-ticket-records': 'All Ticket Records',
    'closed-tickets': 'Closed Tickets',
    'rejected-tickets': 'Rejected Tickets',
    'resolved-tickets': 'Resolved Tickets', // <-- add this line
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');

      const fetchWithToken = async (accessToken) => {
        return axios.get(`${API_BASE_URL}/api/tickets/`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      };

      let response;
      try {
        response = await fetchWithToken(token);
      } catch (err) {
        if (err.response?.status === 401 && refreshToken) {
          try {
            const refreshRes = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
              refresh: refreshToken,
            });
            const newAccess = refreshRes.data.access;
            localStorage.setItem('authToken', newAccess);
            response = await fetchWithToken(newAccess);
          } catch (refreshErr) {
            setTickets([]);
            return;
          }
        } else {
          setTickets([]);
          return;
        }
      }
      setTickets(response.data);
    };

    fetchTickets();
  }, []);

  // Map backend fields to frontend fields
  const mappedTickets = tickets.map(ticket => ({
    number: ticket.ticket_number || ticket.ticketNumber || ticket.id || 'N/A',
    subject: ticket.subject || 'N/A',
    department: ticket.department || 'N/A',
    category: ticket.category || 'N/A',
    subCategory: ticket.sub_category || ticket.subCategory || 'N/A',
    status: ticket.status || 'Unknown',
    dateCreated: ticket.submit_date || ticket.createdAt || ticket.created_at || 'N/A',
    lastUpdated: ticket.update_date || ticket.lastUpdated || ticket.updated_at || 'N/A',
  }));

  // Filter mapped tickets based on category param
  const filteredTickets = mappedTickets.filter(ticket => {
    if (category === 'closed-tickets') return ticket.status === 'Closed';
    if (category === 'rejected-tickets') return ticket.status === 'Rejected';
    if (category === 'resolved-tickets') return ticket.status === 'Resolved';
    if (category === 'all-ticket-records') return (
      ticket.status === 'Closed' ||
      ticket.status === 'Resolved' ||
      ticket.status === 'Rejected'
    );
    return true;
  });

  return (
    <div className="ticket-records">
      <h1>{categoryTitles[category] || 'Ticket Records'}</h1>
      <UserTicketRecordsSearch />
      <UserTicketRecordsFilterAndSort />
      <UserTicketRecordsTable filteredTickets={filteredTickets} />
    </div>
  );
};

export default TicketRecords;
