import { useState } from 'react';
import adminTicketService from '../../../../../utilities/ticket/adminTicketService';
import './admin_ticket-management-reject-ticket.css';

const AdminTicketManagementRejectTicket = ({ ticketId, ticketStatus, onClose, onRejected }) => {
  const [showNoteModal, setShowNoteModal] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleNoteSubmit = async () => {
    setError('');
    if (ticketStatus !== 'New') {
      setError('Only tickets with status "New" can be rejected.');
      return;
    }
    if (!note.trim()) {
      setError('Please provide a reason for rejection.');
      return;
    }
    try {
      await adminTicketService.rejectTicket(ticketId, note);
      setShowNoteModal(false);
      setShowConfirmationModal(true);
      if (onRejected) onRejected();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        'Failed to reject ticket.'
      );
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmationModal(false);
    if (onClose) onClose();
  };

  if (!showNoteModal && !showConfirmationModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      {showNoteModal && (
        <div className="modal note-modal">
          <h2>Reject Ticket</h2>
          <label htmlFor="note">Reason for Rejection</label>
          <textarea
            id="note"
            placeholder="Enter your reason for rejecting this ticket..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          {error && <div className="error-message">{error}</div>}
          <div className="modal-actions">
            <button onClick={() => setShowNoteModal(false)}>Cancel</button>
            <button onClick={handleNoteSubmit}>Reject Ticket</button>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="modal confirmation-modal">
          <h2>Ticket Rejected!</h2>
          <p>This ticket has been successfully rejected.</p>
          <div className="modal-actions">
            <button onClick={handleCloseConfirmation}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTicketManagementRejectTicket;
