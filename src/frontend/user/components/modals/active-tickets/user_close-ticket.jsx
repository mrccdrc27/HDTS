import { X, CheckCircle } from 'lucide-react';
import './user_close-ticket.css';

const UserCloseTicket = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="user-close-ticket-overlay" onClick={onClose}>
      <div className="user-close-ticket-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="user-close-ticket-title">Close Ticket</h2>
        <p className="user-close-ticket-message">Are you sure you want to close this ticket?</p>
        <div className="user-close-ticket-actions">
          <button className="user-close-ticket-btn cancel" onClick={onClose}>
            <X size={16} />
            Cancel
          </button>
          <button className="user-close-ticket-btn confirm" onClick={onConfirm}>
            <CheckCircle size={16} />
            Yes, Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCloseTicket;
