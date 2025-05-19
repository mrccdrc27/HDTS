import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, AlertCircle, CheckCircle2,
  HelpCircle, PauseCircle, Eye, X
} from 'lucide-react';
import '../../../styles/pages/user/active-tickets/user_active-tickets-table.css';

// Status configuration object
const statusConfig = {
  'Submitted': { class: 'status-submitted', icon: <Clock size={16} /> },
  'Approved/Open': { class: 'status-open', icon: <CheckCircle2 size={16} /> },
  'Open': { class: 'status-open', icon: <CheckCircle2 size={16} /> },
  'Pending': { class: 'status-pending', icon: <HelpCircle size={16} /> },
  'On Progress': { class: 'status-progress', icon: <Clock size={16} /> },
  'On Process': { class: 'status-progress', icon: <Clock size={16} /> }, // Optional alias
  'On Hold': { class: 'status-hold', icon: <PauseCircle size={16} /> },
  'Resolved': { class: 'status-resolved', icon: <CheckCircle2 size={16} /> },
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
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const currentTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  const handleTicketClick = (ticketNumber) => {
    if (!ticketNumber) return console.warn('Missing ticket number.');
    navigate(`/admin/submitted-ticket-review/${ticketNumber}`);
  };

  const handleViewClick = (e, ticketNumber) => {
    e.stopPropagation();
    handleTicketClick(ticketNumber);
  };

  const handleCloseClick = (e, ticketNumber) => {
    e.stopPropagation();
    console.log('Close ticket:', ticketNumber);
    // Add logic here for closing tickets
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
                <tr key={ticketNumber} className="ticket-row" onClick={() => handleTicketClick(ticketNumber)}>
                  <td data-label="Ticket Number">{ticketNumber}</td>
                  <td data-label="Subject" className="subject-cell">{ticket.subject || 'No subject'}</td>
                  <td data-label="Department">{ticket.department || 'N/A'}</td>
                  <td data-label="Category">{ticket.category || 'N/A'}</td>
                  <td data-label="Sub Category">{ticket.subCategory || 'N/A'}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${statusClass}`}>
                      {statusIcon} {ticket.status || 'Unknown'}
                    </span>
                  </td>
                  <td data-label="Date Created">{formatDateTime(ticket.dateCreated)}</td>
                  <td data-label="Last Update">{formatDateTime(ticket.lastUpdated)}</td>
                  <td data-label="Actions" className="actions-cell">
                    <div className="action-buttons">
                      <button
                        className="action-btn view-btn"
                        onClick={(e) => handleViewClick(e, ticketNumber)}
                        title="View Ticket"
                        aria-label="View Ticket"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button
                        className="action-btn close-btn"
                        onClick={(e) => handleCloseClick(e, ticketNumber)}
                        title="Close Ticket"
                        aria-label="Close Ticket"
                      >
                        <X size={16} /> Close
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="no-tickets-row">
              <td colSpan="9">
                <div className="no-tickets-message">No tickets match your current filters.</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketManagementTable;
