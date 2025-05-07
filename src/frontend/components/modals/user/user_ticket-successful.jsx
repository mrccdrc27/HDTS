import React from 'react';
import '../../../styles/components/modals/user/user_ticket-successful.css'; 

const TicketSuccessful = ({ isOpen, onClose, ticketData }) => {
  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div className="ticket-successful-modal">
      <div className="modal-content">
        <h2>Ticket Submitted Successfully!</h2>
        <p><strong>Ticket Number:</strong> {ticketData.ticketNumber || 'N/A'}</p>
        <p><strong>Subject:</strong> {ticketData.subject}</p>
        <p><strong>Category:</strong> {ticketData.category}</p>
        <p><strong>Sub-Category:</strong> {ticketData.subCategory}</p>
        <p><strong>Description:</strong> {ticketData.description}</p>
        <p><strong>File:</strong> {ticketData.file ? ticketData.file.name : 'No file attached'}</p>
        <p><strong>Schedule Date:</strong> {ticketData.scheduleDate}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TicketSuccessful;
