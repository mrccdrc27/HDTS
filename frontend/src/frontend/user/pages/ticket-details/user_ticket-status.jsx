import React from 'react';
import { TICKET_STATUSES } from "../../../../utilities/ticket-data/ticketData.js";

// Visual status bar component
const TicketStatusBar = ({ currentStatus }) => {
  // Normalize status by matching with TICKET_STATUSES (case-insensitive)
  const normalizedStatus = TICKET_STATUSES.find(
    status => status.toLowerCase() === currentStatus?.toLowerCase()
  );

  return (
    <div>
      <h3>Status Bar</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
        {TICKET_STATUSES.map((status, index) => {
          const isActive = status === normalizedStatus;
          const isCompleted = TICKET_STATUSES.indexOf(normalizedStatus) > index;

          return (
            <div
              key={status}
              style={{
                padding: '8px 12px',
                borderRadius: '20px',
                backgroundColor: isCompleted ? '#4CAF50' : isActive ? '#2196F3' : '#e0e0e0',
                color: isActive || isCompleted ? '#fff' : '#333',
                fontWeight: isActive ? 'bold' : 'normal',
              }}
            >
              {status}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Shows status and last updated info
const TicketStatusUpdate = ({ ticket }) => {
  return (
    <div>
      <h4>Status Updates</h4>
      <p>Current Status: <strong>{ticket?.status || 'N/A'}</strong></p>
      <p>Last Updated: <strong>{ticket?.lastUpdated ? new Date(ticket.lastUpdated).toLocaleString() : 'N/A'}</strong></p>
    </div>
  );
};

// ✅ Expecting ticket as prop
const UserTicketStatus = ({ ticket }) => {
  if (!ticket) {
    return <p>Ticket not found.</p>;
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Ticket Status</h2>
      <TicketStatusBar currentStatus={ticket.status} />
      <TicketStatusUpdate ticket={ticket} />
    </div>
  );
};

export default UserTicketStatus;
