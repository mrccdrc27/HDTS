import { useNavigate } from 'react-router-dom';
import { Eye, X } from 'lucide-react';

import './user_ticket-records-table.css';

const statusConfig = {
  Submitted: { class: 'ticket-management-status-submitted' },
  'Approved/Open': { class: 'ticket-management-status-open' },
  Open: { class: 'ticket-management-status-open' },
  Pending: { class: 'ticket-management-status-pending' },
  'On Process': { class: 'ticket-management-status-progress' },
  'On Progress': { class: 'ticket-management-status-progress' },
  'On Hold': { class: 'ticket-management-status-hold' },
  Closed: { class: 'ticket-management-status-closed' },
  Resolved: { class: 'ticket-management-status-resolved' },
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

const UserTicketRecordsTable = ({ filteredTickets }) => {
  const navigate = useNavigate();

  // Filter tickets to only Closed and Resolved statuses
  const records = filteredTickets.filter(
    (t) => t.status === 'Closed' || t.status === 'Resolved'
  );

  const handleView = (ticket) => {
    const { number } = ticket;
    if (!number) return console.warn('Missing ticket number.');
    navigate(`/user/ticket-details/${number}`);
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((ticket) => {
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
                    onClick={() => handleView(ticket)}
                  >
                    <td>{number}</td>
                    <td>{subject}</td>
                    <td>{department}</td>
                    <td>{category}</td>
                    <td>{subCategory}</td>
                    <td>
                      <span
                        className={`ticket-management-status-badge ${statusClass}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td>{formatDateTime(dateCreated)}</td>
                    <td>{formatDateTime(lastUpdated)}</td>
                    <td>
                      <div className="ticket-management-action-buttons">
                        <button
                          className="ticket-management-action-btn ticket-management-view-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(ticket);
                          }}
                          title="View Ticket"
                        >
                          <Eye size={16} /> View
                        </button>
                        <button
                          className="ticket-management-action-btn ticket-management-close-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Close ticket:', number);
                          }}
                          title="Close Ticket"
                        >
                          <X size={16} /> Close Ticket
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="ticket-management-no-tickets-row">
                <td colSpan="9">
                  <div className="ticket-management-no-tickets-message">
                    No ticket records found.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default UserTicketRecordsTable;
