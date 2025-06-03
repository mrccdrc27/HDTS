import { useEffect, useState } from 'react';
import { getTicketByNumber } from '../../../../../utilities/storage/ticketStorage.js';
import './user_ticket-details-information.css';

const UserTicketDetailsInformation = ({ ticketNumber }) => {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (ticketNumber) {
      const data = getTicketByNumber(ticketNumber);
      setTicket(data);
    }
  }, [ticketNumber]);

  if (!ticket) return <div>Loading ticket details...</div>;

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h1 className="ticket-id">{ticket.ticketNumber || 'Unknown Ticket'}</h1>
        <span className="status-button">{ticket.status || 'N/A'}</span>
      </div>

      <div className="ticket-metadata">
        <span>Priority: {ticket.priorityLevel || 'N/A'}</span>
        <span>Department: {ticket.department || 'N/A'}</span>
        <span>Created: {ticket.dateCreated ? new Date(ticket.dateCreated).toLocaleString() : 'N/A'}</span>
        <span>Last Updated: {ticket.lastUpdated ? new Date(ticket.lastUpdated).toLocaleString() : 'N/A'}</span>
        <span>Assigned Agent: {ticket.assignedTo?.name || 'Unassigned'}</span>
      </div>

      <div className="field-group">
        <label className="field-label">Subject:</label>
        <textarea
          className="field-input"
          value={ticket.subject || ''}
          readOnly
        />
      </div>

      <div className="form-row">
        <div className="form-column">
          <label className="form-label">Category:</label>
          <input 
            type="text" 
            value={ticket.category || ''}
            className="form-input"
            readOnly
          />
        </div>
        <div className="form-column">
          <label className="form-label">Sub-Category:</label>
          <input 
            type="text" 
            value={ticket.subCategory || ''}
            className="form-input"
            readOnly
          />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Description:</label>
        <textarea 
          className="description-textarea"
          value={ticket.description || ''}
          readOnly
        />
      </div>

      <div className="file-upload-section">
        <label className="form-label">File Uploaded:</label>
        {ticket.fileUploaded ? (
          <button className="file-button">
            <svg className="file-icon" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" 
                clipRule="evenodd" 
              />
            </svg>
            {ticket.fileUploaded}
          </button>
        ) : (
          <span>No file uploaded</span>
        )}
      </div>

      <div className="field-group">
        <label className="field-label">Scheduled Request:</label>
        <input
          type="text"
          className="form-input"
          value={
            ticket.scheduledRequest
              ? new Date(ticket.scheduledRequest).toLocaleString()
              : 'N/A'
          }
          readOnly
        />
      </div>
    </div>
  );
};

export default UserTicketDetailsInformation;
