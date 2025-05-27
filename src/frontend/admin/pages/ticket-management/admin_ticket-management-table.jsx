import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, AlertCircle, CheckCircle2,
  HelpCircle, PauseCircle, Eye, X,
} from 'lucide-react';

import AdminTicketManagementCloseTicketReview from '../../components/modals/ticket-management/admin_ticket-management-close-ticket-review.jsx';
import './admin_ticket-management-table.css';

const statusConfig = {
  Submitted: { class: 'status-submitted', icon: <Clock size={16} /> },
  Open: { class: 'status-open', icon: <CheckCircle2 size={16} /> },
  Pending: { class: 'status-pending', icon: <HelpCircle size={16} /> },
  'On Progress': { class: 'status-progress', icon: <Clock size={16} /> },
  'On Hold': { class: 'status-hold', icon: <PauseCircle size={16} /> },
  Resolved: { class: 'status-resolved', icon: <CheckCircle2 size={16} /> },
  Closed: { class: 'status-closed', icon: <X size={16} /> },
  Unknown: { class: 'status-unknown', icon: <AlertCircle size={16} /> },
};

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isNaN(date) ? 'Invalid Date' : date.toLocaleString(undefined, {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
};

const TicketManagementTable = ({ filteredTickets = [], onStatusUpdate }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage, setTicketsPerPage] = useState(5);
  const [inputValue, setInputValue] = useState('5');

  const [showCloseModal, setShowCloseModal] = useState(false);
  const [ticketToClose, setTicketToClose] = useState(null);

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const currentTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  const handleNavigate = (ticket) => {
    const { number, status } = ticket;
    if (!number) return console.warn('Missing ticket number.');
    const route = status === 'Submitted'
      ? `/admin/submitted-ticket-review/${number}`
      : `/admin/ticket-review/${number}`;
    navigate(route);
  };

  const handleView = (e, ticket) => {
    e.stopPropagation();
    handleNavigate(ticket);
  };

  const handleClose = (e, ticket) => {
    e.stopPropagation();
    setTicketToClose(ticket);
    setShowCloseModal(true);
  };

  const renderTicketRow = (ticket) => {
    const {
      number, subject, department, category,
      subCategory, status, dateCreated, lastUpdated,
    } = ticket;

    const ticketNumber = number ?? ticket._id ?? 'N/A';
    const { class: statusClass } = statusConfig[status] || statusConfig.Unknown;

    return (
      <tr key={ticketNumber} className="ticket-row" onClick={() => handleNavigate(ticket)}>
        <td className="ticket-number-cell">{ticketNumber}</td>
        <td className="subject-cell">{subject || 'No subject'}</td>
        <td className="department-cell">{department || 'N/A'}</td>
        <td className="category-cell">{category || 'N/A'}</td>
        <td className="subcategory-cell">{subCategory || 'N/A'}</td>
        <td className="status-cell">
          <span className={`status-badge ${statusClass}`}>{status || 'Unknown'}</span>
        </td>
        <td className="date-cell">{formatDateTime(dateCreated)}</td>
        <td className="date-cell">{formatDateTime(lastUpdated)}</td>
        <td className="actions-cell">
          <div className="action-buttons">
            <button className="action-btn view-btn" onClick={(e) => handleView(e, ticket)} title="View Ticket">
              View
            </button>
            {status !== 'Closed' && status !== 'Resolved' && (
              <button className="action-btn close-btn" onClick={(e) => handleClose(e, ticket)} title="Close Ticket">
                Close Ticket
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  };

  const renderPagination = () => (
    <div className="pagination-controls">
      <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="pagination-btn">
        Previous
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="pagination-btn">
        Next
      </button>
    </div>
  );

  const renderItemsPerPageInput = () => (
    <div className="table-controls-row">
      <div className="items-per-page">
        <label htmlFor="itemsPerPageInput">Show </label>
        <input
          type="text"
          id="itemsPerPageInput"
          value={inputValue}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || /^\d+$/.test(val)) {
              setInputValue(val);
            }
          }}
          onBlur={() => {
            let num = parseInt(inputValue, 10);
            if (isNaN(num) || num <= 0) num = 5;
            else if (num > 100) num = 100;
            setTicketsPerPage(num);
            setCurrentPage(1);
            setInputValue(num.toString());
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.target.blur();
            }
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          style={{ width: '3rem', textAlign: 'center' }}
        />
        <span> items per page</span>
      </div>
    </div>
  );

  return (
    <div className="ticket-management-container">
      {renderItemsPerPageInput()}

      <div className="table-wrapper">
        <table className="ticket-management-table">
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
            {currentTickets.length > 0
              ? currentTickets.map(renderTicketRow)
              : (
                <tr className="no-tickets-row">
                  <td colSpan="9">
                    <div className="no-tickets-message">
                      No tickets match your current filters.
                    </div>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && renderPagination()}

      {showCloseModal && (
        <AdminTicketManagementCloseTicketReview
          ticket={ticketToClose}
          onClose={() => setShowCloseModal(false)}
        />
      )}
    </div>
  );
};

export default TicketManagementTable;
