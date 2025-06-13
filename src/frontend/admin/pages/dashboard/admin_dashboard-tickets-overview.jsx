// TicketsOverview.jsx
import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { getTickets } from '../../../../utilities/storage/ticketStorage';
import './admin_dashboard-tickets-overview.css';

const TicketsOverview = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = () => {
      const allTickets = getTickets();
      const relevantTickets = allTickets.filter(ticket =>
        ['New', 'Submitted', 'Pending'].includes(ticket.status)
      );
      setTickets(relevantTickets);
    };

    fetchTickets();
    const interval = setInterval(fetchTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'New': '#17a2b8',
      'Submitted': '#17a2b8',
      'Pending': '#fd7e14'
    };
    return colors[status] || '#666';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Critical': '#dc3545',
      'High': '#fd7e14',
      'Medium': '#ffc107',
      'Low': '#28a745'
    };
    return colors[priority] || '#666';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="tickets-overview">
      <div className="tickets-overview-header">
        <h2>Recent Tickets</h2>
        <span className="count">{tickets.length} tickets</span>
      </div>
      <div className="tickets-overview-table">
        <table>
          <thead>
            <tr>
              <th>Ticket #</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="6">No recent tickets found.</td>
              </tr>
            ) : (
              tickets.map(ticket => (
                <tr key={ticket.ticketId}>
                  <td>{ticket.ticketNumber || ticket.ticketId}</td>
                  <td>{ticket.title}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(ticket.status) }}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(ticket.priorityLevel) }}
                    >
                      {ticket.priorityLevel}
                    </span>
                  </td>
                  <td>{formatDate(ticket.createdAt)}</td>
                  <td>
                    <button className="view-btn">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsOverview;
