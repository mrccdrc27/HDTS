import { useEffect, useState } from 'react';
import { loadTickets } from '../../../utilities/ticket-data/ticketData';

const AdminSubmittedTicketReview = () => {
  const [submittedTickets, setSubmittedTickets] = useState([]);

  useEffect(() => {
    const tickets = loadTickets();
    const submitted = tickets.filter(ticket => ticket.status === 'submitted');
    setSubmittedTickets(submitted);
  }, []);

  return (
    <div className="admin-submitted-review-container">
      <h2>Submitted Tickets</h2>
      {submittedTickets.length === 0 ? (
        <p>No submitted tickets found.</p>
      ) : (
        <div className="ticket-list">
          {submittedTickets.map(ticket => (
            <div key={ticket.number} className="ticket-card">
              <h3>{ticket.subject}</h3>
              <p><strong>Ticket #:</strong> {ticket.number}</p>
              <p><strong>Category:</strong> {ticket.category}</p>
              <p><strong>Subcategory:</strong> {ticket.subcategory}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Date Created:</strong> {ticket.dateCreated}</p>
              <p><strong>Last Updated:</strong> {ticket.lastUpdated}</p>
              <button className="review-btn">Review Ticket</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSubmittedTicketReview;
