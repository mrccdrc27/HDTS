import { X, AlertTriangle } from "lucide-react";
import "./user_withdraw-ticket.css";

const UserWithdrawTicket = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="uwt-modal-overlay">
      <div className="uwt-modal-content">
        <div className="uwt-modal-header">
          <div className="uwt-modal-title">
            <AlertTriangle className="uwt-icon-warning" />
            <h2>Withdraw Ticket</h2>
          </div>
          <button onClick={onClose} className="uwt-close-button">
            <X />
          </button>
        </div>
        <p className="uwt-modal-message">Do you want to withdraw your ticket?</p>
        <div className="uwt-modal-actions">
          <button onClick={onClose} className="uwt-btn cancel">Cancel</button>
          <button onClick={onConfirm} className="uwt-btn withdraw">Withdraw</button>
        </div>
      </div>
    </div>
  );
};

export default UserWithdrawTicket;
