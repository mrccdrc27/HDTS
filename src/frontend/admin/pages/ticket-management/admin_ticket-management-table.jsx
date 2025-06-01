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

// TEMP MOCK DATA
const mockTickets = [
  {
    number: 'TCKT-1001',
    subject: 'Unable to access intranet portal',
    department: 'IT',
    category: 'Access Issue',
    subCategory: 'Intranet',
    status: 'New',
    dateCreated: '2025-05-01T09:00:00',
    lastUpdated: '2025-05-01T10:00:00',
  },
  {
    number: 'TCKT-1002',
    subject: 'Broken desk drawer',
    department: 'Facilities',
    category: 'Furniture',
    subCategory: 'Desk',
    status: 'Open',
    dateCreated: '2025-05-02T08:30:00',
    lastUpdated: '2025-05-02T09:00:00',
  },
  {
    number: 'TCKT-1003',
    subject: 'Slow internet connection',
    department: 'IT',
    category: 'Network',
    subCategory: 'Speed',
    status: 'On Progress',
    dateCreated: '2025-05-03T11:15:00',
    lastUpdated: '2025-05-03T12:30:00',
  },
  {
    number: 'TCKT-1004',
    subject: 'Air conditioning not working',
    department: 'Facilities',
    category: 'HVAC',
    subCategory: 'Air Conditioning',
    status: 'On Hold',
    dateCreated: '2025-05-04T14:00:00',
    lastUpdated: '2025-05-04T16:00:00',
  },
  {
    number: 'TCKT-1005',
    subject: 'Request for new software installation',
    department: 'IT',
    category: 'Software',
    subCategory: 'Installation',
    status: 'Pending',
    dateCreated: '2025-05-05T09:45:00',
    lastUpdated: '2025-05-05T10:00:00',
  },
  {
    number: 'TCKT-1006',
    subject: 'Printer not working',
    department: 'IT',
    category: 'Hardware',
    subCategory: 'Printer',
    status: 'Resolved',
    dateCreated: '2025-05-06T13:00:00',
    lastUpdated: '2025-05-06T15:30:00',
  },
  {
    number: 'TCKT-1007',
    subject: 'Request to close old account',
    department: 'HR',
    category: 'Account',
    subCategory: 'Closure',
    status: 'Closed',
    dateCreated: '2025-05-07T10:30:00',
    lastUpdated: '2025-05-07T11:00:00',
  },
  {
    number: 'TCKT-1008',
    subject: 'Unrecognized error message',
    department: 'Support',
    category: 'Error',
    subCategory: 'Unknown',
    status: 'Unknown',
    dateCreated: '2025-05-08T12:00:00',
    lastUpdated: '2025-05-08T12:15:00',
  },
];


const TicketManagementTable = () => {
  const navigate = useNavigate();
  const [tickets] = useState(mockTickets);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleNavigate = (ticket) => {
    const { number } = ticket;
    if (!number) return console.warn('Missing ticket number.');
    navigate(`/admin/ticket-details/`);
  };

  const handleView = (e, ticket) => {
    e.stopPropagation();
    handleNavigate(ticket);
  };

  const handleReject = (e, ticket) => {
    e.stopPropagation();
    setSelectedTicket(ticket);
    setShowRejectModal(true);
  };

  const handleReview = (e, ticket) => {
    e.stopPropagation();
    setSelectedTicket(ticket);
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
            {tickets.length > 0 ? (
              tickets.map((ticket) => {
                const {
                  number,
                  subject,
                  department,
                  category,
                  subCategory,
                  status,
                  dateCreated,
                  lastUpdated,
                } = ticket;

                const statusClass =
                  statusConfig[status]?.class || statusConfig.Unknown.class;

                return (
                  <tr
                    key={number}
                    className="ticket-management-row"
                    onClick={() =>
                      status !== 'New' && handleNavigate(ticket)
                    }
                  >
                    <td className="ticket-management-ticket-number-cell">
                      {number}
                    </td>
                    <td className="ticket-management-subject-cell">
                      {subject}
                    </td>
                    <td className="ticket-management-department-cell">
                      {department}
                    </td>
                    <td className="ticket-management-category-cell">
                      {category}
                    </td>
                    <td className="ticket-management-subcategory-cell">
                      {subCategory}
                    </td>
                    <td className="ticket-management-status-cell">
                      <span className={`ticket-management-status-badge ${statusClass}`}>
                        {status}
                      </span>
                    </td>
                    <td className="ticket-management-date-cell">
                      {formatDateTime(dateCreated)}
                    </td>
                    <td className="ticket-management-date-cell">
                      {formatDateTime(lastUpdated)}
                    </td>
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
                    No tickets available.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showReviewModal && selectedTicket && (
        <AdminTicketManagementReviewNewTicket
          ticket={selectedTicket}
          onClose={() => setShowReviewModal(false)}
        />
      )}

      {showRejectModal && selectedTicket && (
        <AdminTicketManagementRejectTicketReview
          ticket={selectedTicket}
          onClose={() => setShowRejectModal(false)}
        />
      )}
    </div>
  );
};

export default TicketManagementTable;
