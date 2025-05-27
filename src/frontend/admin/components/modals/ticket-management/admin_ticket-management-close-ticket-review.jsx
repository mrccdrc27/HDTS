import { useState } from 'react';
import './admin_ticket-management-close-ticket-review.css';

const AdminTicketManagementCloseTicketReview = () => {
  const [showNoteModal, setShowNoteModal] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleNoteSubmit = () => {
    setShowNoteModal(false);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmationModal(false);
  };

  if (!showNoteModal && !showConfirmationModal) {
    return null; // 👈 This hides the overlay completely
  }

  return (
    <div className="modal-overlay">
      {showNoteModal && (
        <div className="modal note-modal">
          <h2>Close Ticket</h2>
          <label htmlFor="note">Add Note or Comment</label>
          <textarea id="note" placeholder="Enter your reason for closing this ticket..." />
          <div className="modal-actions">
            <button onClick={() => setShowNoteModal(false)}>Cancel</button>
            <button onClick={handleNoteSubmit}>Close Ticket</button>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="modal confirmation-modal">
          <h2>Ticket Closed!</h2>
          <p>This ticket has been successfully closed.</p>
          <div className="modal-actions">
            <button onClick={handleCloseConfirmation}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTicketManagementCloseTicketReview;
