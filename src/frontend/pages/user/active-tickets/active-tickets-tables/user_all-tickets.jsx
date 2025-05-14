import { useNavigate } from 'react-router-dom';
import { loadTickets } from '../../../../../utilities/ticket-data/ticketData.js';

const getStatusClass = (status) => {
  switch (status) {
    case 'Pending': return 'status-pending';
    case 'Approved/Open': return 'status-open';
    case 'On Progress': return 'status-process';
    case 'On Hold': return 'status-hold';
    case 'Resolved': return 'status-resolved';
    case 'Closed': return 'status-closed';
    case 'Submitted': return 'status-submitted';
    default: return 'status-unknown';
  }
};

const AllTickets = () => {
  const navigate = useNavigate();

  // Load tickets from localStorage or other source
  let tickets = loadTickets();
  if (!Array.isArray(tickets)) {
    console.warn('Tickets loaded are not an array:', tickets);
    tickets = [];
  }

  // Navigate to ticket details page on click
  const handleTicketClick = (ticketNumber) => {
    if (ticketNumber) {
      navigate(`/user/ticket-details/${ticketNumber}`);
    } else {
      console.warn('Ticket number is undefined. Cannot navigate.');
    }
  };

  return (
    <div className="tickets-table-container">
      <table className="tickets-table">
        <thead>
          <tr>
            <th>Ticket Number</th>
            <th>Subject</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket, idx) => (
              <tr
                key={idx}
                onClick={() => handleTicketClick(ticket.number)}
                style={{ cursor: ticket.number ? 'pointer' : 'not-allowed' }}
              >
                <td>{ticket.number || 'N/A'}</td>
                <td>{ticket.subject || 'N/A'}</td>
                <td>{ticket.category || 'N/A'}</td>
                <td>{ticket.subCategory || 'N/A'}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                    {ticket.status || 'Unknown'}
                  </span>
                </td>
                <td>{ticket.dateCreated ? new Date(ticket.dateCreated).toLocaleString() : 'N/A'}</td>
                <td>{ticket.lastUpdated ? new Date(ticket.lastUpdated).toLocaleString() : 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                No tickets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllTickets;
