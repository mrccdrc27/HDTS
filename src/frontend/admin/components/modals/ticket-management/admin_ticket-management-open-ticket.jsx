import './admin_ticket-management-open-ticket.css';

const AdminOpenTicket = ({ onClose, ticketNumber, onOpenConfirmed }) => {
  const handleConfirm = () => {
    console.log(`Opened ticket ${ticketNumber}`);
    if (onOpenConfirmed) onOpenConfirmed(true);
    if (onClose) onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal confirm-modal">
        <h2>Open Ticket</h2>
        <p>Are you sure you want to open this ticket?</p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Yes, Open Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default AdminOpenTicket;
