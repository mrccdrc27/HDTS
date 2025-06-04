import { useEffect, useState } from 'react';
import { getTicketByNumber } from '../../../../utilities/storage/ticketStorage';
import { Paperclip } from 'lucide-react';
import './admin_ticket-details-information.css';

const AdminTicketDetailsInformation = ({ ticketNumber }) => {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (ticketNumber) {
      const data = getTicketByNumber(ticketNumber);
      setTicket(data);
    }
  }, [ticketNumber]);

  if (!ticket) return <div>Loading ticket details...</div>;

  return (
    <>
      <div className="ticket-header">
        <h1 className="ticket-id">{ticket.ticketNumber || 'Unknown Ticket'}</h1>
        <span className="status-badge">{ticket.status || 'N/A'}</span>
      </div>

      {/* Top row with Priority, Department, Assigned Agent */}
      <div className="form-row info-grid three-columns">
        <div className="form-column">
          <label className="form-label">Priority</label>
          <input
            type="text"
            className="form-input"
            value={ticket.priorityLevel || 'N/A'}
            readOnly
          />
        </div>
        <div className="form-column">
          <label className="form-label">Department</label>
          <input
            type="text"
            className="form-input"
            value={ticket.department || 'N/A'}
            readOnly
          />
        </div>
        <div className="form-column">
          <label className="form-label">Assigned Agent</label>
          <input
            type="text"
            className="form-input"
            value={ticket.assignedTo?.name || 'Unassigned'}
            readOnly
          />
        </div>
      </div>

      {/* Scheduled Request below */}
      <div className="form-row scheduled-request-row">
        <div className="form-column">
          <label className="form-label">Scheduled Request</label>
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

      <div className="date-info-row">
        <div>Created {ticket.dateCreated ? new Date(ticket.dateCreated).toLocaleString() : 'N/A'}</div>
        <div>Last Updated {ticket.lastUpdated ? new Date(ticket.lastUpdated).toLocaleString() : 'N/A'}</div>
      </div>

      <hr className="divider" />

      <div className="field-group">
        <div className="form-label">Subject</div>
        <textarea className="form-textarea" value={ticket.subject || ''} readOnly />
      </div>

      <div className="form-row">
        <div className="form-column">
          <div className="form-label">Category</div>
          <input type="text" className="form-input" value={ticket.category || ''} readOnly />
        </div>
        <div className="form-column">
          <div className="form-label">Subcategory</div>
          <input type="text" className="form-input" value={ticket.subCategory || ''} readOnly />
        </div>
      </div>

      <div className="field-group">
        <div className="form-label">Description</div>
        <textarea className="form-textarea" value={ticket.description || ''} readOnly />
      </div>

      <div className="field-group">
        <div className="form-label">File Uploaded</div>
        {ticket.fileUploaded ? (
          <button className="file-link-button">
            <Paperclip className="file-icon" size={16} />
            {ticket.fileUploaded}
          </button>
        ) : (
          <span className="info-item">No file uploaded</span>
        )}
      </div>
    </>
  );
};

export default AdminTicketDetailsInformation;
