import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import UserTicketRecordsSearch from './user_ticket-records-search';
import UserTicketRecordsFilterAndSort from './user_ticket-records-filter-and-sort.jsx';
import UserTicketRecordsTable from './user_ticket-records-table';

// Example mock tickets data (replace with actual data source or fetch)
const MOCK_TICKETS = [
  {
    number: 'TCKT-1001',
    subject: 'Cannot access email',
    department: 'IT Support',
    category: 'Software',
    subCategory: 'Email',
    status: 'Resolved',
    dateCreated: '2024-04-01T08:30:00Z',
    lastUpdated: '2024-04-02T12:45:00Z',
  },
  {
    number: 'TCKT-1002',
    subject: 'Printer not working',
    department: 'Facilities',
    category: 'Hardware',
    subCategory: 'Printer',
    status: 'Closed',
    dateCreated: '2024-04-03T09:15:00Z',
    lastUpdated: '2024-04-05T14:00:00Z',
  },
  {
    number: 'TCKT-1003',
    subject: 'Request for software installation',
    department: 'IT Support',
    category: 'Software',
    subCategory: 'Installation',
    status: 'Resolved',
    dateCreated: '2024-04-04T11:00:00Z',
    lastUpdated: '2024-04-06T10:20:00Z',
  },
  {
    number: 'TCKT-1004',
    subject: 'Network outage in building 2',
    department: 'Network',
    category: 'Network',
    subCategory: 'Outage',
    status: 'Closed',
    dateCreated: '2024-04-02T07:50:00Z',
    lastUpdated: '2024-04-04T13:30:00Z',
  },
  {
    number: 'TCKT-1005',
    subject: 'Password reset request',
    department: 'IT Support',
    category: 'Security',
    subCategory: 'Password',
    status: 'Resolved',
    dateCreated: '2024-04-05T14:25:00Z',
    lastUpdated: '2024-04-05T15:00:00Z',
  },
];


const TicketRecords = () => {
  const { category } = useParams();

  const categoryTitles = {
    'all-ticket-records': 'All Ticket Records',
    'closed-tickets': 'Closed Tickets',
    'rejected-tickets': 'Rejected Tickets',
    'withdrawn-tickets': 'Withdrawn Tickets',
  };

  // State for tickets, in real app you may fetch or get from context
  const [tickets, setTickets] = useState([]);

  // Simulate loading tickets on mount
  useEffect(() => {
    // Replace this with your real data loading logic
    setTickets(MOCK_TICKETS);
  }, []);

  // Filter tickets based on category param
  const filteredTickets = tickets.filter(ticket => {
    if (category === 'closed-tickets') return ticket.status === 'Closed';
    if (category === 'rejected-tickets') return ticket.status === 'Rejected';
    if (category === 'all-ticket-records') return ticket.status === 'Closed' || ticket.status === 'Resolved';
    return true; // fallback, show all
  });

  return (
    <div className="ticket-records">
      <h1>{categoryTitles[category] || 'Ticket Records'}</h1>

      <UserTicketRecordsSearch />
      
      <UserTicketRecordsFilterAndSort />

      <UserTicketRecordsTable filteredTickets={filteredTickets} />

      {/* Pagination removed as per your request */}
    </div>
  );
};

export default TicketRecords;
