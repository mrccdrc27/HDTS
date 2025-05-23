import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, AlertCircle, CheckCircle2,
  HelpCircle, PauseCircle, Eye, X, ArrowUpDown, ArrowUp, ArrowDown
} from 'lucide-react';
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
  return isNaN(date.getTime())
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

const TicketManagementTable = ({ filteredTickets = [], onStatusUpdate }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const ticketsPerPage = 5;

  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    
    // Handle ticket number sorting
    if (sortConfig.key === 'number') {
      aValue = a.number ?? a._id ?? '';
      bValue = b.number ?? b._id ?? '';
    }
    
    // Handle date sorting
    if (sortConfig.key === 'dateCreated' || sortConfig.key === 'lastUpdated') {
      aValue = new Date(aValue || 0);
      bValue = new Date(bValue || 0);
    }
    
    // Handle string sorting
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTickets.length / ticketsPerPage);
  const currentTickets = sortedTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  const handleTicketClick = (ticket) => {
    const number = ticket?.number;
    if (!number) return console.warn('Missing ticket number.');
    navigate(ticket.status === 'Submitted'
      ? `/admin/submitted-ticket-review/${number}`
      : `/admin/ticket-review/${number}`);
  };

  const handleViewClick = (e, ticket) => {
    e.stopPropagation();
    handleTicketClick(ticket);
  };

  const handleCloseClick = async (e, ticket) => {
    e.stopPropagation();
    try {
      await onStatusUpdate(ticket.number, 'Closed');
    } catch (error) {
      console.error('Failed to close ticket:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={14} className="sort-icon inactive" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp size={14} className="sort-icon active" />
      : <ArrowDown size={14} className="sort-icon active" />;
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getStatusConfig = (status) => statusConfig[status] || statusConfig.Unknown;

  return (
    <div className="ticket-management-container">
      <div className="table-wrapper">
        <table className="ticket-management-table">
          <thead>
            <tr>
              <th 
                className="sortable-header" 
                onClick={() => handleSort('number')}
              >
                <div className="header-content">
                  <span>Ticket Number</span>
                  {getSortIcon('number')}
                </div>
              </th>
              <th 
                className="sortable-header" 
                onClick={() => handleSort('subject')}
              >
                <div className="header-content">
                  <span>Subject</span>
                  {getSortIcon('subject')}
                </div>
              </th>
              <th 
                className="sortable-header" 
                onClick={() => handleSort('department')}
              >
                <div className="header-content">
                  <span>Department</span>
                  {getSortIcon('department')}
                </div>
              </th>
              <th 
                className="sortable-header" 
                onClick={() => handleSort('category')}
              >
                <div className="header-content">
                  <span>Category</span>
                  {getSortIcon('category')}
                </div>
              </th>
              <th 
                className="sortable-header" 
                onClick={() => handleSort('subCategory')}
              >
                <div className="header-content">
                  <span>Sub Category</span>
                  {getSortIcon('subCategory')}
                </div>
              </th>
              <th 
                className="sortable-header" 
                onClick={() => handleSort('status')}
              >
                <div className="header-content">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th 
                className="sortable-header" 
                onClick={() => handleSort('dateCreated')}
              >
                <div className="header-content">
                  <span>Date Created</span>
                  {getSortIcon('dateCreated')}
                </div>
              </th>
              <th 
                className="sortable-header" 
                onClick={() => handleSort('lastUpdated')}
              >
                <div className="header-content">
                  <span>Last Update</span>
                  {getSortIcon('lastUpdated')}
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.length > 0 ? (
              currentTickets.map((ticket) => {
                const ticketNumber = ticket.number ?? ticket._id ?? 'N/A';
                const { class: statusClass } = getStatusConfig(ticket.status);

                return (
                  <tr
                    key={ticketNumber}
                    className="ticket-row"
                    onClick={() => handleTicketClick(ticket)}
                  >
                    <td className="ticket-number-cell">{ticketNumber}</td>
                    <td className="subject-cell">
                      {ticket.subject || 'No subject'}
                    </td>
                    <td className="department-cell">{ticket.department || 'N/A'}</td>
                    <td className="category-cell">{ticket.category || 'N/A'}</td>
                    <td className="subcategory-cell">{ticket.subCategory || 'N/A'}</td>
                    <td className="status-cell">
                      <span className={`status-badge ${statusClass}`}>
                        {ticket.status || 'Unknown'}
                      </span>
                    </td>
                    <td className="date-cell">{formatDateTime(ticket.dateCreated)}</td>
                    <td className="date-cell">{formatDateTime(ticket.lastUpdated)}</td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={(e) => handleViewClick(e, ticket)}
                          title="View Ticket"
                        >
                          View
                        </button>
                        {ticket.status !== 'Closed' && ticket.status !== 'Resolved' && (
                          <button
                            className="action-btn close-btn"
                            onClick={(e) => handleCloseClick(e, ticket)}
                            title="Close Ticket"
                          >
                            Close Ticket
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
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

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketManagementTable;