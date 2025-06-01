import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTickets } from '../../../../utilities/storage/ticketStorage.js';

import './user_active-tickets-table.css';

const statusConfig = {
  New: { class: 'user-active-status-new' },
  Open: { class: 'user-active-status-open' },
  'On Progress': { class: 'user-active-status-progress' },
  'On Hold': { class: 'user-active-status-hold' },
  Pending: { class: 'user-active-status-pending' },
  Resolved: { class: 'user-active-status-resolved' },
  Closed: { class: 'user-active-status-closed' },
};

const priorityClassMap = {
  Low: 'user-active-priority-low',
  Medium: 'user-active-priority-medium',
  High: 'user-active-priority-high',
  Critical: 'user-active-priority-critical',
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

const UserActiveTicketsTable = ({
  departmentFilter = '',
  categoryFilter = '',
  subcategoryFilter = '',
  statusFilter = '',
  priorityFilter = '',
  sortBy = '',
  sortDirection = 'asc',
  startDate,
  endDate,
  searchTerm = '', // new prop for search input
}) => {
  const navigate = useNavigate();
  const { ticketStatus } = useParams();
  const [tickets] = useState(getTickets());

  const statusMap = {
    'all-active-tickets': ['Open', 'On Progress', 'On Hold', 'Pending', 'Resolved'],
    'open-tickets': ['Open'],
    'on-progress-tickets': ['On Progress'],
    'on-hold-tickets': ['On Hold'],
    'pending-tickets': ['Pending'],
    'resolved-tickets': ['Resolved'],
  };

  const activeStatuses = statusMap[ticketStatus] || statusMap['all-active-tickets'];

  const normalizedStatusFilter = statusFilter.trim().toLowerCase();
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const applyStatusFilter = (ticketStatus) => {
    if (!normalizedStatusFilter) {
      return activeStatuses.includes(ticketStatus);
    }
    return ticketStatus.toLowerCase() === normalizedStatusFilter;
  };

  const applyDateRangeFilter = (dateCreated) => {
    const created = new Date(dateCreated);
    if (isNaN(created)) return false;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && created < start) return false;
    if (end && created > end) return false;

    return true;
  };

  const applySearchFilter = (ticket) => {
    if (!normalizedSearchTerm) return true;
    return (
      (ticket.ticketNumber && ticket.ticketNumber.toLowerCase().includes(normalizedSearchTerm)) ||
      (ticket.subject && ticket.subject.toLowerCase().includes(normalizedSearchTerm)) ||
      (ticket.department && ticket.department.toLowerCase().includes(normalizedSearchTerm))
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (!applyStatusFilter(ticket.status)) return false;
    if (departmentFilter && ticket.department !== departmentFilter) return false;
    if (categoryFilter && ticket.category !== categoryFilter) return false;
    if (subcategoryFilter && ticket.subCategory !== subcategoryFilter) return false;
    if (priorityFilter && ticket.priorityLevel !== priorityFilter) return false;
    if (!applyDateRangeFilter(ticket.dateCreated)) return false;
    if (!applySearchFilter(ticket)) return false;
    return true;
  });

  const sortedTickets = [...filteredTickets];
  if (sortBy) {
    sortedTickets.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === 'dateCreated' || sortBy === 'lastUpdated') {
        valA = valA ? new Date(valA).getTime() : 0;
        valB = valB ? new Date(valB).getTime() : 0;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      return 0;
    });
  }

  const handleView = (ticket) => {
    const { ticketNumber } = ticket;
    if (!ticketNumber) return console.warn('Missing ticket number.');
    navigate(`/user/ticket-details/${ticketNumber}`);
  };

  const handleWithdraw = (e, ticketNumber) => {
    e.stopPropagation();
    console.log(`Withdraw ticket ${ticketNumber}`);
  };

  const handleClose = (e, ticketNumber) => {
    e.stopPropagation();
    console.log(`Close ticket ${ticketNumber}`);
  };

  return (
    <div className="user-active-tickets-container">
      <div className="user-active-tickets-table-wrapper">
        <table className="user-active-tickets-table">
          <thead>
            <tr>
              <th>Ticket Number</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Priority Level</th>
              <th>Department</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Date Created</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedTickets.length > 0 ? (
              sortedTickets.map((ticket) => {
                const {
                  ticketNumber,
                  subject,
                  status,
                  priorityLevel,
                  department,
                  category,
                  subCategory,
                  dateCreated,
                  lastUpdated,
                } = ticket;

                const statusClass = statusConfig[status]?.class || 'user-active-status-default';
                const priorityClass = priorityClassMap[priorityLevel] || priorityClassMap.Low;

                return (
                  <tr
                    key={ticketNumber}
                    className="user-active-tickets-row"
                    onClick={() => handleView(ticket)}
                  >
                    <td className="user-active-ticket-number-cell">{ticketNumber}</td>
                    <td className="user-active-subject-cell">{subject}</td>
                    <td>
                      <span className={`user-active-status-badge ${statusClass}`}>{status}</span>
                    </td>
                    <td>
                      <span className={`user-active-priority-badge ${priorityClass}`}>{priorityLevel}</span>
                    </td>
                    <td>{department}</td>
                    <td>{category}</td>
                    <td>{subCategory}</td>
                    <td>{formatDateTime(dateCreated)}</td>
                    <td>{formatDateTime(lastUpdated)}</td>
                    <td>
                      <div className="user-active-ticket-actions">
                        {['Open', 'On Progress', 'On Hold', 'Pending'].includes(status) && (
                          <button
                            className="user-active-ticket-btn user-active-ticket-withdraw-btn"
                            onClick={(e) => handleWithdraw(e, ticketNumber)}
                            title="Withdraw Ticket"
                          >
                            Withdraw
                          </button>
                        )}
                        {status === 'Resolved' && (
                          <button
                            className="user-active-ticket-btn user-active-ticket-close-btn"
                            onClick={(e) => handleClose(e, ticketNumber)}
                            title="Close Ticket"
                          >
                            Close
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="user-active-no-tickets-row">
                <td colSpan="10">No active tickets.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserActiveTicketsTable;
