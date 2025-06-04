import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import './admin_ticket-management-table.css';
import { getTickets } from '../../../../utilities/storage/ticketStorage.js';

const statusClassMap = {
  open: 'ticket-management-status-open',
  pending: 'ticket-management-status-pending',
  'on progress': 'ticket-management-status-progress',
  'on hold': 'ticket-management-status-hold',
  resolved: 'ticket-management-status-resolved',
  closed: 'ticket-management-status-closed',
  rejected: 'ticket-management-status-rejected',
  withdrawn: 'ticket-management-status-withdrawn',
};

const priorityClassMap = {
  low: 'ticket-management-priority-low',
  medium: 'ticket-management-priority-medium',
  high: 'ticket-management-priority-high',
  critical: 'ticket-management-priority-critical',
};

const formatDateTime = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return isNaN(date)
    ? value
    : date.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
};

const TicketManagementTable = ({
  searchTerm = '',
  departmentFilter = '',
  categoryFilter = '',
  subcategoryFilter = '',
  statusFilter = '',
  priorityFilter = '',
  sortBy = '',
  sortDirection = 'asc',
  currentPage = 1,
  itemsPerPage = 10,
  onStatusUpdate,
  onTotalItemsChange,
}) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  // Load tickets from storage on mount
  useEffect(() => {
    const storedTickets = getTickets() || [];
    setTickets(storedTickets);
  }, []);

  const normalize = (str) => (typeof str === 'string' ? str.trim().toLowerCase() : '');

  // Filtering logic
  useEffect(() => {
    let filtered = tickets;

    if (statusFilter) {
      filtered = filtered.filter(
        (t) => normalize(t.status) === normalize(statusFilter)
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter(
        (t) => normalize(t.department) === normalize(departmentFilter)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        (t) => normalize(t.category) === normalize(categoryFilter)
      );
    }

    if (subcategoryFilter) {
      filtered = filtered.filter(
        (t) => normalize(t.subCategory) === normalize(subcategoryFilter)
      );
    }

    if (priorityFilter) {
      filtered = filtered.filter(
        (t) => normalize(t.priorityLevel) === normalize(priorityFilter)
      );
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.ticketNumber.toString().toLowerCase().includes(lowerSearch) ||
          (t.subject && t.subject.toLowerCase().includes(lowerSearch))
      );
    }

    setFilteredTickets(filtered);
  }, [
    tickets,
    statusFilter,
    departmentFilter,
    categoryFilter,
    subcategoryFilter,
    priorityFilter,
    searchTerm,
  ]);

  // Notify parent of total filtered items for pagination
  useEffect(() => {
    if (onTotalItemsChange) {
      onTotalItemsChange(filteredTickets.length);
    }
  }, [filteredTickets, onTotalItemsChange]);

  // Sorting logic
  const sortedTickets = useMemo(() => {
    if (!sortBy) return filteredTickets;

    return [...filteredTickets].sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      // Normalize date fields for sorting
      if (['dateCreated', 'lastUpdated', 'scheduledRequest'].includes(sortBy)) {
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
  }, [filteredTickets, sortBy, sortDirection]);

  // Pagination slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = sortedTickets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleClose = (e, ticketNumber) => {
    e.stopPropagation();
    if (onStatusUpdate) onStatusUpdate(ticketNumber, 'Closed');
  };

  const handleReject = (e, ticketNumber) => {
    e.stopPropagation();
    if (onStatusUpdate) onStatusUpdate(ticketNumber, 'Rejected');
  };

  const getStatusClass = (status) =>
    statusClassMap[normalize(status)] || 'ticket-management-status-unknown';

  const getPriorityClass = (priority) =>
    priorityClassMap[normalize(priority)] || 'ticket-management-priority-low';

  return (
    <div className="ticket-management-container">
      <div className="ticket-management-table-wrapper">
        <table className="ticket-management-table" role="grid" aria-label="Ticket Management Table">
          <thead>
            <tr>
              <th>Ticket Number</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Priority Level</th>
              <th>Department</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Scheduled Request</th>
              <th>Date Created</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.length === 0 ? (
              <tr className="ticket-management-no-tickets-row">
                <td colSpan="11">No tickets found.</td>
              </tr>
            ) : (
              paginatedTickets.map((ticket) => (
                <tr key={ticket.ticketNumber} className="ticket-management-row">
                  <td className="ticket-management-ticket-number-cell">
                    {ticket.ticketNumber}
                  </td>
                  <td className="ticket-management-subject-cell">{ticket.subject}</td>
                  <td>
                    <span
                      className={`ticket-management-status-badge ${getStatusClass(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`ticket-management-priority-badge ${getPriorityClass(
                        ticket.priorityLevel
                      )}`}
                    >
                      {ticket.priorityLevel}
                    </span>
                  </td>
                  <td>{ticket.department}</td>
                  <td>{ticket.category}</td>
                  <td>{ticket.subCategory}</td>
                  <td>
                    {ticket.scheduledRequest
                      ? formatDateTime(ticket.scheduledRequest)
                      : 'None'}
                  </td>
                  <td>{formatDateTime(ticket.dateCreated)}</td>
                  <td>{formatDateTime(ticket.lastUpdated)}</td>
                  <td>
                    <div className="ticket-management-action-buttons">
                      {ticket.status.toLowerCase() !== 'closed' && (
                        <button
                          className="ticket-management-action-btn ticket-management-close-btn"
                          onClick={(e) => handleClose(e, ticket.ticketNumber)}
                          title="Close Ticket"
                        >
                          Close
                        </button>
                      )}
                      <button
                        className="ticket-management-action-btn ticket-management-reject-btn"
                        onClick={(e) => handleReject(e, ticket.ticketNumber)}
                        title="Reject Ticket"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketManagementTable;
