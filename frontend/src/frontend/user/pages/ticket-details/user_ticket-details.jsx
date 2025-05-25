import React from 'react';

// Assuming ticket is passed as a prop now
const TicketDetails = ({ ticket }) => {
  if (!ticket) {
    return <div>Ticket not found.</div>;
  }

  const formattedSchedule = ticket.schedule ? new Date(ticket.schedule).toLocaleDateString() : 'N/A';

  return (
    <div className="ticket-details-container">
      <div className="ticket-detail-group">
        <label>Ticket ID:</label>
        <span>{ticket.ticketNumber}</span>
      </div>
      
      <div className="ticket-detail-group">
        <label>Subject:</label>
        <span>{ticket.subject}</span>
      </div>

      <div className="ticket-detail-group">
        <label>Category:</label>
        <span>{ticket.category}</span>
      </div>

      <div className="ticket-detail-group">
        <label>Sub-Category:</label>
        <span>{ticket.subCategory}</span>
      </div>

      <div className="ticket-detail-group">
        <label>Description:</label>
        <p>{ticket.description}</p>
      </div>

      <div className="ticket-detail-group">
        <label>Schedule Date:</label>
        <span>{formattedSchedule}</span>
      </div>

      {/* Files section */}
      {ticket.files && ticket.files.length > 0 && (
        <div className="ticket-detail-group">
          <label>Attached Files:</label>
          <ul>
            {ticket.files.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
