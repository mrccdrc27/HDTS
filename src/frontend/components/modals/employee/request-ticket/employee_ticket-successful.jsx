import React from 'react';
import { Link } from 'react-router-dom';// Import the CSS

const ModalTicketSuccessful = ({ isOpen, onClose, ticketData }) => {
  if (!isOpen) return null;
  
  // Format the date as "April 09, 2025"
  const formattedDate = ticketData?.date 
    ? ticketData.date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      })
    : new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      });

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <p className="success-message">Ticket successfully created!</p>
        </div>
        
        {/* Ticket Number */}
        <div className="ticket-number-section">
          <p className="ticket-number-label">Ticket Number</p>
          <h2 className="ticket-number">{ticketData?.ticketNumber || "TX0405"}</h2>
        </div>
        
        {/* Date - right aligned */}
        <p className="ticket-date">{formattedDate}</p>
        
        {/* Ticket Details */}
        <div className="ticket-details">
          <div className="ticket-detail-row">
            <span className="detail-label">Subject:</span>
            <span className="detail-value">{ticketData?.subject || "Request for personal app installation"}</span>
          </div>
          
          <div className="ticket-detail-row">
            <span className="detail-label">Category:</span>
            <span className="detail-value">{ticketData?.category || "Software"}</span>
          </div>
          
          <div className="ticket-detail-row">
            <span className="detail-label">Sub Category:</span>
            <span className="detail-value">{ticketData?.subCategory || "Unauthorized Apps"}</span>
          </div>
          
          <div className="ticket-detail-row">
            <span className="detail-label">Attached File:</span>
            <span className="detail-value">{ticketData?.attachedFile || "Not Applicable"}</span>
          </div>
        </div>
        
        {/* Footer with buttons */}
        <div className="modal-footer">
          <Link to="/user/home">
            <button className="close-button" onClick={onClose}>
              CLOSE
            </button>
          </Link>
          
          <Link to={`/user/ticket-details/${ticketData?.ticketNumber || "TX0405"}`}>
            <button className="view-ticket-button">
              VIEW TICKET
            </button>
          </Link>
        </div>
        
        {/* Submit another link */}
        <div className="submit-another">
          Submit another request? 
          <Link to="/user/request-ticket" className="submit-link"> Click here</Link>
        </div>
      </div>
    </div>
  );
};

export default ModalTicketSuccessful;