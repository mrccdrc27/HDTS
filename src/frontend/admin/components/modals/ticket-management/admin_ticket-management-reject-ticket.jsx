import { useState } from 'react';
import './admin_ticket-management-reject-ticket.css';

const AdminTicketManagementRejectTicket = () => {
  const [showNoteModal, setShowNoteModal] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleNoteSubmit = () => {
    // Logic for rejecting the ticket would go here
    console.log('Ticket rejected with note.');
    setShowNoteModal(false);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmationModal(false);
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
          />
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
