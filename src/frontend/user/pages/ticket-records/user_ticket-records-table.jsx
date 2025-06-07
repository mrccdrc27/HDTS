import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTickets } from '../../../../utilities/storage/ticketStorage.js';

import './user_ticket-records-table.css';

const statusConfig = {
  New: 'user-ticket-records-status-new',
  Open: 'user-ticket-records-status-open',
  'On Progress': 'user-ticket-records-status-progress',
  'On Hold': 'user-ticket-records-status-hold',
  Pending: 'user-ticket-records-status-pending',
  Resolved: 'user-ticket-records-status-resolved',
  Closed: 'user-ticket-records-status-closed',
  Withdrawn: 'user-ticket-records-status-withdrawn',
  Rejected: 'user-ticket-records-status-rejected',
};

const priorityClassMap = {
  Low: 'user-ticket-records-priority-low',
  Medium: 'user-ticket-records-priority-medium',
  High: 'user-ticket-records-priority-high',
  Critical: 'user-ticket-records-priority-critical',
};

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
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

// Map ticketStatus prop values to arrays of statuses
const statusMap = {
  'closed-withdrawn-rejected': ['Closed', 'Rejected', 'Withdrawn'],
  closed: ['Closed'],
  rejected: ['Rejected'],
  withdrawn: ['Withdrawn'],
};

const noTicketsMessageMap = {
  'closed-withdrawn-rejected': 'No closed, rejected, or withdrawn tickets.',
  closed: 'No closed tickets.',
  rejected: 'No rejected tickets.',
  withdrawn: 'No withdrawn tickets.',
};

const UserTicketRecordsTable = ({
  departmentFilter = '',
  categoryFilter = '',
  subcategoryFilter = '',
  statusFilter = '',
  priorityFilter = '',
  sortBy = '',
  sortDirection = 'asc',
  startDate = null,
  endDate = null,
  searchTerm = '',
  ticketStatus = 'closed-withdrawn-rejected',
  currentPage = 1,
  itemsPerPage = 10,
  onTotalItemsChange = () => {},
}) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  // Load tickets once on mount
  useEffect(() => {
    const loadedTickets = getTickets();
    setTickets(loadedTickets);
  }, []);

  // Determine active statuses for filtering based on ticketStatus prop
  const activeStatuses = useMemo(
    () => statusMap[ticketStatus] || statusMap['closed-withdrawn-rejected'],
    [ticketStatus]
  );

  // Normalize utility
  const normalize = (str) => (str ? str.trim().toLowerCase() : '');

  // Normalized filter inputs
  const normalizedStatusFilter = normalize(statusFilter);
  const normalizedSearchTerm = normalize(searchTerm);
  const normalizedDepartmentFilter = normalize(departmentFilter);
  const normalizedCategoryFilter = normalize(categoryFilter);
  const normalizedSubcategoryFilter = normalize(subcategoryFilter);
  const normalizedPriorityFilter = normalize(priorityFilter);

  // Status filter logic: if no explicit status filter, allow all active statuses
  const applyStatusFilter = (status) => {
    if (!normalizedStatusFilter) return activeStatuses.includes(status);
    return normalize(status) === normalizedStatusFilter;
  };

  // Date range filter with startDate at 00:00:00 and endDate at 23:59:59 for inclusiveness
  const applyDateRangeFilter = (dateCreated) => {
    if (!dateCreated) return false;
    const created = new Date(dateCreated);
    if (isNaN(created)) return false;

    let start = startDate ? new Date(startDate) : null;
    let end = endDate ? new Date(endDate) : null;

    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    return (!start || created >= start) && (!end || created <= end);
  };

  // Search filter across ticketNumber, subject, department
  const applySearchFilter = (ticket) => {
    if (!normalizedSearchTerm) return true;
    return ['ticketNumber', 'subject', 'department'].some((key) =>
      ticket[key]?.toLowerCase().includes(normalizedSearchTerm)
    );
  };

  // Apply all filters to tickets
  const filteredTickets = tickets.filter((ticket) => {
    if (!ticket) return false;
    if (!applyStatusFilter(ticket.status)) return false;
    if (normalizedDepartmentFilter && normalize(ticket.department) !== normalizedDepartmentFilter)
      return false;
    if (normalizedCategoryFilter && normalize(ticket.category) !== normalizedCategoryFilter) return false;
    if (normalizedSubcategoryFilter && normalize(ticket.subCategory) !== normalizedSubcategoryFilter)
      return false;
    if (normalizedPriorityFilter && normalize(ticket.priorityLevel) !== normalizedPriorityFilter) return false;
    if (!applyDateRangeFilter(ticket.dateCreated)) return false;
    if (!applySearchFilter(ticket)) return false;
    return true;
  });

  // Notify parent component on total filtered tickets change
  useEffect(() => {
    if (typeof onTotalItemsChange === 'function') {
      onTotalItemsChange(filteredTickets.length);
    }
  }, [filteredTickets, onTotalItemsChange]);

  // Sort filtered tickets
  const sortedTickets = [...filteredTickets];
  if (sortBy) {
    sortedTickets.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (['dateCreated', 'lastUpdated'].includes(sortBy)) {
        valA = valA ? new Date(valA).getTime() : 0;
        valB = valB ? new Date(valB).getTime() : 0;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      return 0;
    });
  }

  // Pagination: slice sorted tickets for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = sortedTickets.slice(startIndex, startIndex + itemsPerPage);

  // Handle row click to navigate to ticket details
  const handleView = (ticket) => {
    if (!ticket.ticketNumber) return console.warn('Missing ticket number.');
    navigate(`/user/ticket-details/${ticket.ticketNumber}`);
  };

  const noTicketsMessage = noTicketsMessageMap[ticketStatus] || noTicketsMessageMap['closed-withdrawn-rejected'];

  return (
    <div className="user-ticket-records-container">
      <div className="user-ticket-records-table-wrapper">
        <table className="user-ticket-records-table">
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
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.length > 0 ? (
              paginatedTickets.map((ticket) => {
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

                const statusClass = statusConfig[status] || 'user-ticket-records-status-default';
                const priorityClass = priorityClassMap[priorityLevel] || 'user-ticket-records-priority-low';

                return (
                  <tr
                    key={ticketNumber}
                    className="user-ticket-records-row"
                    onClick={() => handleView(ticket)}
                  >
                    <td className="user-ticket-records-ticket-number-cell">{ticketNumber}</td>
                    <td className="user-ticket-records-subject-cell">{subject}</td>
                    <td>
                      <span className={`user-ticket-records-status-badge ${statusClass}`}>{status}</span>
                    </td>
                    <td>
                      <span className={`user-ticket-records-priority-badge ${priorityClass}`}>
                        {priorityLevel}
                      </span>
                    </td>
                    <td>{department}</td>
                    <td>{category}</td>
                    <td>{subCategory}</td>
                    <td>{formatDateTime(dateCreated)}</td>
                    <td>{formatDateTime(lastUpdated)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="user-ticket-records-no-tickets">
                  {noTicketsMessage}
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
