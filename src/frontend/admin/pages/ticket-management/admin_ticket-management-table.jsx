import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminTicketManagementReviewNewTicket from '../../components/modals/ticket-management/admin_ticket-management-review-ticket.jsx';
import AdminTicketManagementRejectTicketReview from '../../components/modals/ticket-management/admin_ticket-management-reject-ticket.jsx';
import './admin_ticket-management-table.css';

const statusConfig = {
  New: { class: 'ticket-management-status-new' },
  Open: { class: 'ticket-management-status-open' },
  'On Progress': { class: 'ticket-management-status-progress' },
  'On Hold': { class: 'ticket-management-status-hold' },
  Pending: { class: 'ticket-management-status-pending' },
  Resolved: { class: 'ticket-management-status-resolved' },
  Closed: { class: 'ticket-management-status-closed' },
  Unknown: { class: 'ticket-management-status-unknown' },
};

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isNaN(date)
    ? 'Invalid Date'
    : date.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
};

const TicketManagementTable = ({ filteredTickets, onStatusUpdate, currentCategory }) => {
  const navigate = useNavigate();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewTicketId, setReviewTicketId] = useState(null);
  const [rejectTicket, setRejectTicket] = useState(null);

  const handleNavigate = (ticket) => {
    const { number } = ticket;
    if (!number) {
      console.warn('Missing ticket number.');
      return;
    }
    navigate(`/admin/ticket-details/${number}`);
  };

  const handleView = (e, ticket) => {
    e.stopPropagation();
    handleNavigate(ticket);
  };

  const handleReject = (e, ticket) => {
    e.stopPropagation();
    setRejectTicket(ticket);
    setShowRejectModal(true);
  };

  const handleReview = (e, ticket) => {
    e.stopPropagation();
    setReviewTicketId(ticket.id);
    setShowReviewModal(true);
  };

  return (
    <div className="ticket-management-container">
      <div className="ticket-management-table-wrapper">
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
            {filteredTickets && filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => {
                const { id, number, subject, department, category, subCategory, status, dateCreated, lastUpdated } = ticket;
                const statusClass = statusConfig[status]?.class || statusConfig.Unknown.class;
                return (
                  <tr
                    key={id}
                    className="ticket-management-row"
                    onClick={() => status !== 'New' && handleNavigate(ticket)}
                  >
                    <td className="ticket-management-ticket-number-cell">{number}</td>
                    <td className="ticket-management-subject-cell">{subject}</td>
                    <td className="ticket-management-department-cell">{department}</td>
                    <td className="ticket-management-category-cell">{category}</td>
                    <td className="ticket-management-subcategory-cell">{subCategory}</td>
                    <td className="ticket-management-status-cell">
                      <span className={`ticket-management-status-badge ${statusClass}`}>
                        {status}
                      </span>
                    </td>
                    <td className="ticket-management-date-cell">{formatDateTime(dateCreated)}</td>
                    <td className="ticket-management-date-cell">{formatDateTime(lastUpdated)}</td>
                    <td className="ticket-management-actions-cell">
                      <div className="ticket-management-action-buttons">
                        {status === 'New' ? (
                          <>
                            <button
                              className="ticket-management-action-btn ticket-management-view-btn"
                              onClick={(e) => handleReview(e, ticket)}
                              title="Review Ticket"
                            >
                              Review
                            </button>
                            <button
                              className="ticket-management-action-btn ticket-management-reject-btn"
                              onClick={(e) => handleReject(e, ticket)}
                              title="Reject Ticket"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <button
                            className="ticket-management-action-btn ticket-management-view-btn"
                            onClick={(e) => handleView(e, ticket)}
                            title="View Ticket"
                          >
                            View
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="ticket-management-no-tickets-row">
                <td colSpan="9">
                  <div className="ticket-management-no-tickets-message">
                    {currentCategory === 'new-tickets'
                      ? 'No new tickets requiring review.'
                      : 'No tickets available.'}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showReviewModal && reviewTicketId && (
        <AdminTicketManagementReviewNewTicket
          ticketId={reviewTicketId}
          onClose={() => setShowReviewModal(false)}
          onStatusUpdate={onStatusUpdate}
        />
      )}

      {showRejectModal && rejectTicket && (
        <AdminTicketManagementRejectTicketReview
          ticket={rejectTicket}
          onClose={() => setShowRejectModal(false)}
          onStatusUpdate={onStatusUpdate}
        />
      )}
    </div>
  );
};

export default TicketManagementTable;
