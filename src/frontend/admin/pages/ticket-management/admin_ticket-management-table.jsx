import { useState } from 'react';
import {
  Clock, AlertCircle, CheckCircle2,
  HelpCircle, PauseCircle, Eye, X
} from 'lucide-react';

import SubmittedTicketReviewModal from '../admin_submitted-ticket-review.jsx';
import { useNavigate } from 'react-router-dom'; // Add this line

const statusConfig = {
  'Submitted': { class: 'status-submitted', icon: <Clock size={16} /> },
  'Open': { class: 'status-open', icon: <CheckCircle2 size={16} /> },
  'Pending': { class: 'status-pending', icon: <HelpCircle size={16} /> },
  'On Progress': { class: 'status-progress', icon: <Clock size={16} /> },
  'On Hold': { class: 'status-hold', icon: <PauseCircle size={16} /> },
  'Resolved': { class: 'status-resolved', icon: <CheckCircle2 size={16} /> },
  'Closed': { class: 'status-closed', icon: <X size={16} /> },
  'Unknown': { class: 'status-unknown', icon: <AlertCircle size={16} /> }
};

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Invalid Date' :
    date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
};

const TicketManagementTable = ({ filteredTickets }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const ticketsPerPage = 5;
  const navigate = useNavigate(); // initialize

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const currentTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  const handleTicketClick = (ticket) => {
    if (ticket.status === 'Submitted') {
      setSelectedTicket(ticket);
      setShowReviewModal(true);
    } else {
      navigate(`/admin/ticket-review/${ticket.number}`);
    }
  };

  const getStatusConfig = (status) => statusConfig[status] || statusConfig['Unknown'];

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="tickets-table-container">
      <table className="tickets-table">
        <thead>
          <tr>
            <th>Ticket Number</th>
            <th>Subject</th>
            <th>Department</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Last Update</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.length > 0 ? (
            currentTickets.map((ticket) => {
              const ticketNumber = ticket.number ?? ticket._id ?? 'N/A';
              const { class: statusClass, icon: statusIcon } = getStatusConfig(ticket.status);
              return (
                <tr key={ticketNumber} className="ticket-row">
                  <td>{ticketNumber}</td>
                  <td>{ticket.subject || 'No subject'}</td>
                  <td>{ticket.department || 'N/A'}</td>
                  <td>{ticket.category || 'N/A'}</td>
                  <td>{ticket.subCategory || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${statusClass}`}>
                      {statusIcon} {ticket.status || 'Unknown'}
                    </span>
                  </td>
                  <td>{formatDateTime(ticket.dateCreated)}</td>
                  <td>{formatDateTime(ticket.lastUpdated)}</td>
                  <td>
                    <button
                      className="action-btn view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTicketClick(ticket);
                      }}
                    >
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9">No tickets found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}x

      {showReviewModal && selectedTicket && (
  <SubmittedTicketReviewModal
    isOpen={true}
    onClose={() => {
      setShowReviewModal(false);
      setSelectedTicket(null); // Optional: clear selected ticket
    }}
    ticket={selectedTicket}
  />
)}

    </div>
  );
};

export default TicketManagementTable;
