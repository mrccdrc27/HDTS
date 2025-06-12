import { useState } from 'react';
import './admin_ticket-management-reject-ticket.css';

const AdminRejectTicket = ({ onClose, ticketNumber, onRejectConfirmed }) => {
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    // Optional: Validate note if required
    console.log(`Rejected ticket ${ticketNumber} with note: ${note}`);
    if (onRejectConfirmed) onRejectConfirmed(note);
    if (onClose) onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal note-modal">
        <h2>Reject Ticket</h2>
        <label htmlFor="note">Reason for Rejection</label>
        <textarea
          id="note"
          placeholder="Enter your reason for rejecting this ticket..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Reject Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default AdminRejectTicket;
