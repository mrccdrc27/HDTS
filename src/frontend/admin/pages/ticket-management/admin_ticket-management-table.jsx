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

  const [showCloseModal, setShowCloseModal] = useState(false);
  const [ticketToClose, setTicketToClose] = useState(null);

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

  return (
    <div className="ticket-management-container">
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
            {filteredTickets.length > 0
              ? filteredTickets.map(renderTicketRow)
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
