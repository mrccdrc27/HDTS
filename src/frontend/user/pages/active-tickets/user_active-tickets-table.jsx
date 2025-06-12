import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import UserWithdrawTicket from '../../components/modals/active-tickets/user_withdraw-ticket.jsx';
import UserCloseTicket from '../../components/modals/active-tickets/user_close-ticket.jsx';

import { getTickets } from '../../../../utilities/storage/ticketStorage.js';

import './user_active-tickets-table.css';

const statusConfig = {
  Submitted: 'user-active-status-submitted',
  Open: 'user-active-status-open',
  Pending: 'user-active-status-pending',
  'On Progress': 'user-active-status-progress',
  'On Hold': 'user-active-status-hold',
  Resolved: 'user-active-status-resolved',
};

const priorityClassMap = {
  Low: 'user-active-priority-low',
  Medium: 'user-active-priority-medium',
  High: 'user-active-priority-high',
  Critical: 'user-active-priority-critical',
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

const noTicketsMessageMap = {
  'all-active-tickets': 'No submitted, open, pending, on progress, on hold, or resolved tickets.',
  'submitted-tickets': 'No submitted tickets.',
  'open-tickets': 'No open tickets.',
  'pending-tickets': 'No pending tickets.',
  'on-progress-tickets': 'No on progress tickets.',
  'on-hold-tickets': 'No on hold tickets.',
  'resolved-tickets': 'No resolved tickets.',
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
  searchTerm = '',
  ticketStatus = 'all-active-tickets',

  currentPage = 1,
  itemsPerPage = 10,
  onTotalItemsChange,
}) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  useEffect(() => {
    const loadedTickets = getTickets();
    setTickets(loadedTickets);
  }, []);

  const statusMap = {
    'all-active-tickets': ['Submitted', 'Open', 'Pending', 'On Progress', 'On Hold', 'Resolved'],
    'submitted-tickets': ['Submitted'],
    'open-tickets': ['Open'],
    'pending-tickets': ['Pending'],
    'on-progress-tickets': ['On Progress'],
    'on-hold-tickets': ['On Hold'],
    'resolved-tickets': ['Resolved'],
  };

  const activeStatuses = useMemo(
    () => statusMap[ticketStatus] || statusMap['all-active-tickets'],
    [ticketStatus]
  );

  const normalize = (str) => (str ? str.trim().toLowerCase() : '');

  const applyStatusFilter = (status) => {
    const normalized = normalize(statusFilter);
    return normalized ? normalize(status) === normalized : activeStatuses.includes(status);
  };

  const applyDateRangeFilter = (dateCreated) => {
    if (!dateCreated) return false;
    const created = new Date(dateCreated);
    if (isNaN(created)) return false;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    return (!start || created >= start) && (!end || created <= end);
  };

  const applySearchFilter = (ticket) => {
    const term = normalize(searchTerm);
    if (!term) return true;
    return ['ticketNumber', 'subject', 'department'].some((key) =>
      ticket[key]?.toLowerCase().includes(term)
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (!ticket) return false;

    if (!applyStatusFilter(ticket.status)) return false;
    if (departmentFilter && normalize(ticket.department) !== normalize(departmentFilter)) return false;
    if (categoryFilter && normalize(ticket.category) !== normalize(categoryFilter)) return false;
    if (subcategoryFilter && normalize(ticket.subCategory) !== normalize(subcategoryFilter)) return false;
    if (priorityFilter && normalize(ticket.priorityLevel) !== normalize(priorityFilter)) return false;
    if (!applyDateRangeFilter(ticket.dateCreated)) return false;
    if (!applySearchFilter(ticket)) return false;

    return true;
  });

  useEffect(() => {
    if (typeof onTotalItemsChange === 'function') {
      onTotalItemsChange(filteredTickets.length);
    }
  }, [filteredTickets, onTotalItemsChange]);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = sortedTickets.slice(startIndex, startIndex + itemsPerPage);

  const handleView = (ticket) => {
    if (!ticket.ticketNumber) return console.warn('Missing ticket number.');
    navigate(`/user/ticket-details/${ticket.ticketNumber}`);
  };

  const handleWithdraw = (e, ticketNumber) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTicket(ticketNumber);
    setShowWithdrawModal(true);
  };

    const handleClose = (e, ticketNumber) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTicket(ticketNumber);
    setShowCloseModal(true);
  };

  const handleWithdrawTicket = (ticketNumber) => {
  const updatedTickets = tickets.map(ticket =>
      ticket.ticketNumber === ticketNumber
        ? { ...ticket, status: 'Withdrawn', lastUpdated: new Date().toISOString() }
        : ticket
    );

    const isUpdated = updatedTickets.some(
      ticket => ticket.ticketNumber === ticketNumber && ticket.status === 'Withdrawn'
    );

    if (!isUpdated) {
      toast.error('Failed to withdraw the ticket. Please try again.');
      return;
    }

    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));

    toast.success('Ticket withdrawn successfully!');
    closeWithdrawModal();
  };

  const handleCloseTicket = (ticketNumber) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.ticketNumber === ticketNumber
        ? { ...ticket, status: 'Closed', lastUpdated: new Date().toISOString() }
        : ticket
    );

    const isUpdated = updatedTickets.some(
      ticket => ticket.ticketNumber === ticketNumber && ticket.status === 'Closed'
    );

    if (!isUpdated) {
      toast.error('Failed to close the ticket. Please try again.');
      return;
    }

    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));

    toast.success('Ticket closed successfully!');
    closeCloseModal();
  };

  const closeWithdrawModal = () => {
    setShowWithdrawModal(false);
    setSelectedTicket(null);
  };

  const closeCloseModal = () => {
    setShowCloseModal(false);
    setSelectedTicket(null);
  };

  const noTicketsMessage = noTicketsMessageMap[ticketStatus] || 'No tickets found.';

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
              <th>Scheduled Request</th>
              <th>Date Created</th>
              <th>Last Updated</th>
              <th>Action</th>
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
                  scheduledRequest,
                  dateCreated,
                  lastUpdated,
                } = ticket;

                const statusClass = statusConfig[status] || 'user-active-status-default';
                const priorityClass = priorityClassMap[priorityLevel] || 'user-active-priority-low';

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
                    <td className="user-active-scheduled-request-cell">
                      {scheduledRequest ? formatDateTime(scheduledRequest) : 'None'}
                    </td>
                    <td>{formatDateTime(dateCreated)}</td>
                    <td>{formatDateTime(lastUpdated)}</td>
                    <td>
                      <div className="user-active-ticket-actions">
                        {['Submitted', 'Open', 'On Progress', 'On Hold', 'Pending'].includes(status) && (
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
                <td colSpan="11">{noTicketsMessage}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <UserWithdrawTicket
        isOpen={showWithdrawModal}
        onClose={closeWithdrawModal}
        ticketNumber={selectedTicket}
        onConfirm={() => handleWithdrawTicket(selectedTicket)}
      />

      <UserCloseTicket
        isOpen={showCloseModal}
        onClose={closeCloseModal}
        onConfirm={() => handleCloseTicket(selectedTicket)}
      />

    </div>
  );
};

export default UserActiveTicketsTable;
