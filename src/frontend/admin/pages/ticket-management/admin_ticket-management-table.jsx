import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AdminOpenTicket from '../../components/modals/ticket-management/admin_ticket-management-open-ticket.jsx';
import AdminRejectTicket from '../../components/modals/ticket-management/admin_ticket-management-reject-ticket.jsx';
import { getTickets } from '../../../../utilities/storage/ticketStorage.js';

import './admin_ticket-management-table.css';

const statusClassMap = {
  all: 'ticket-management-status-all',
  new: 'ticket-management-status-new',
  pending: 'ticket-management-status-pending',
  open: 'ticket-management-status-open',
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

const normalize = (str) => (typeof str === 'string' ? str.trim().toLowerCase() : '');

const getDisplayStatus = (status) => {
  if (normalize(status) === 'submitted') return 'New';
  return status;
};

const TicketManagementTable = ({
  searchTerm = '',
  departmentFilter = '',
  categoryFilter = '',
  subcategoryFilter = '',
  statusFilter = '',
  priorityFilter = '',
  startDate = '',
  endDate = '',
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

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [ticketToReject, setTicketToReject] = useState(null);

  const [showOpenModal, setShowOpenModal] = useState(false);
  const [ticketToOpen, setTicketToOpen] = useState(null);

  useEffect(() => {
    const storedTickets = getTickets() || [];
    console.log('Initial tickets loaded:', storedTickets); // Debug log
    setTickets(storedTickets);
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (statusFilter && normalize(statusFilter) !== 'all') {
      filtered = filtered.filter(
        (t) => normalize(getDisplayStatus(t.status)) === normalize(statusFilter)
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter((t) => normalize(t.department) === normalize(departmentFilter));
    }

    if (categoryFilter) {
      filtered = filtered.filter((t) => normalize(t.category) === normalize(categoryFilter));
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

    if (startDate) {
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      filtered = filtered.filter((t) => {
        const ticketDate = new Date(t.dateCreated).getTime();
        return !isNaN(ticketDate) && ticketDate >= start;
      });
    }

    if (endDate) {
      const end = new Date(endDate).setHours(23, 59, 59, 999);
      filtered = filtered.filter((t) => {
        const ticketDate = new Date(t.dateCreated).getTime();
        return !isNaN(ticketDate) && ticketDate <= end;
      });
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.ticketNumber.toString().toLowerCase().includes(lowerSearch) ||
          (t.subject && t.subject.toLowerCase().includes(lowerSearch))
      );
    }

    console.log('Filtered tickets:', filtered); // Debug log
    setFilteredTickets(filtered);
  }, [
    tickets,
    statusFilter,
    departmentFilter,
    categoryFilter,
    subcategoryFilter,
    priorityFilter,
    startDate,
    endDate,
    searchTerm,
  ]);

  useEffect(() => {
    if (onTotalItemsChange) {
      onTotalItemsChange(filteredTickets.length);
    }
  }, [filteredTickets, onTotalItemsChange]);

  const sortedTickets = useMemo(() => {
    if (!sortBy) return filteredTickets;

    return [...filteredTickets].sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (['dateCreated', 'lastUpdated', 'scheduledRequest'].includes(sortBy)) {
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
  }, [filteredTickets, sortBy, sortDirection]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = sortedTickets.slice(startIndex, startIndex + itemsPerPage);

  const getStatusClass = (status) =>
    statusClassMap[normalize(status)] || 'ticket-management-status-unknown';

  const getPriorityClass = (priority) =>
    priorityClassMap[normalize(priority)] || 'ticket-management-priority-low';

  const handleReject = (e, ticketNumber) => {
    e.stopPropagation();
    console.log('Attempting to reject ticket:', ticketNumber); // Debug log
    setTicketToReject(ticketNumber);
    setShowRejectModal(true);
  };

  const handleOpen = (e, ticketNumber) => {
    e.stopPropagation();
    setTicketToOpen(ticketNumber);
    setShowOpenModal(true);
  };

  return (
    <div className="ticket-management-container">
      <div className="ticket-management-table-wrapper">
        <table className="ticket-management-table" role="grid" aria-label="Ticket Management Table">
          <thead>
            <tr>
              <th>Ticket Number</th>
              <th>Subject</th>
              <th>Created By</th>
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
                <td colSpan="12">No tickets found.</td>
              </tr>
            ) : (
              paginatedTickets
                .filter((ticket) => ticket && ticket.ticketNumber)
                .map((ticket) => {
                  const displayStatus = getDisplayStatus(ticket.status);
                  const normalizedDisplayStatus = normalize(displayStatus);

                  console.log(`Rendering ticket ${ticket.ticketNumber} with status: ${displayStatus} (normalized: ${normalizedDisplayStatus})`); // Debug log

                  return (
                    <tr
                      key={ticket.ticketNumber}
                      className="ticket-management-row"
                      onClick={() => navigate(`/admin/ticket-details/${ticket.ticketNumber}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{ticket.ticketNumber || '—'}</td>
                      <td>{ticket.subject || '—'}</td>
                      <td>{ticket.createdBy?.name || '—'}</td>
                      <td>
                        <span
                          className={`ticket-management-status-badge ${getStatusClass(
                            displayStatus
                          )}`}
                        >
                          {displayStatus}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`ticket-management-priority-badge ${getPriorityClass(
                            ticket.priorityLevel
                          )}`}
                        >
                          {ticket.priorityLevel || '—'}
                        </span>
                      </td>
                      <td>{ticket.department || '—'}</td>
                      <td>{ticket.category || '—'}</td>
                      <td>{ticket.subCategory || '—'}</td>
                      <td>
                        {ticket.scheduledRequest
                          ? formatDateTime(ticket.scheduledRequest)
                          : 'None'}
                      </td>
                      <td>{formatDateTime(ticket.dateCreated)}</td>
                      <td>{formatDateTime(ticket.lastUpdated)}</td>
                      <td>
                        <div className="ticket-management-action-buttons">
                          {['new', 'pending'].includes(normalizedDisplayStatus) && (
                            <>
                              <button
                                className="ticket-management-action-btn ticket-management-open-btn"
                                onClick={(e) => handleOpen(e, ticket.ticketNumber)}
                                title="Open Ticket"
                              >
                                Open
                              </button>
                              <button
                                className="ticket-management-action-btn ticket-management-reject-btn"
                                onClick={(e) => handleReject(e, ticket.ticketNumber)}
                                title="Reject Ticket"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>

      {showRejectModal && (
        <AdminRejectTicket
          onClose={() => setShowRejectModal(false)}
          ticketNumber={ticketToReject}
          onRejectConfirmed={(success) => {
            setShowRejectModal(false);
            if (success) {
              toast.success('Ticket rejected.');
              const updatedTickets = tickets.map((t) =>
                t.ticketNumber === ticketToReject 
                  ? { ...t, status: 'Rejected', lastUpdated: new Date().toISOString() } 
                  : t
              );
              setTickets(updatedTickets);
              localStorage.setItem('tickets', JSON.stringify(updatedTickets));
              if (onStatusUpdate) onStatusUpdate(ticketToReject, 'Rejected');
            } else {
              toast.error('Failed to reject ticket.');
            }
          }}
        />
      )}

      {showOpenModal && (
        <AdminOpenTicket
          onClose={() => setShowOpenModal(false)}
          ticketNumber={ticketToOpen}
          onOpenConfirmed={(success) => {
            setShowOpenModal(false);
            if (success) {
              toast.success('Ticket opened.');
              const updatedTickets = tickets.map((t) =>
                t.ticketNumber === ticketToOpen ? { ...t, status: 'Open', lastUpdated: new Date().toISOString() } : t
              );
              setTickets(updatedTickets);
              localStorage.setItem('tickets', JSON.stringify(updatedTickets));
              if (onStatusUpdate) onStatusUpdate(ticketToOpen, 'Open');
            } else {
              toast.error('Failed to open ticket.');
            }
          }}
        />
      )}
    </div>
  );
};

export default TicketManagementTable;