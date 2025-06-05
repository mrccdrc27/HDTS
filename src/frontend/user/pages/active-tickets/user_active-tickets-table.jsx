import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './user_active-tickets-table.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserActiveTicketsTable = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/tickets/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        const mapped = response.data.map(ticket => ({
          number: ticket.ticket_number,
          subject: ticket.subject,
          status: ticket.status,
          priority: ticket.priority,
          department: ticket.department,
          category: ticket.category,
          subCategory: ticket.sub_category,
          dateCreated: ticket.submit_date,
          lastUpdated: ticket.update_date,
        }));

        setTickets(mapped);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Unable to load tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const statusConfig = {
    New: { class: 'user-active-status-new' },
    Open: { class: 'user-active-status-open' },
    'On Progress': { class: 'user-active-status-progress' },
    'On Hold': { class: 'user-active-status-hold' },
    Pending: { class: 'user-active-status-pending' },
    Resolved: { class: 'user-active-status-resolved' },
    Closed: { class: 'user-active-status-closed' },
    Unknown: { class: 'user-active-status-unknown' },
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

  const handleView = (ticket) => {
    const { number } = ticket;
    if (!number) return console.warn('Missing ticket number.');
    navigate(`/user/ticket-details/${number}`);
  };

  if (loading) return <div>Loading tickets...</div>;
  if (error) return <div>Error: {error}</div>;

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
            {tickets.length > 0 ? (
              tickets.map((ticket) => {
                const {
                  number,
                  subject,
                  status,
                  priority,
                  department,
                  category,
                  subCategory,
                  dateCreated,
                  lastUpdated,
                } = ticket;

                const statusClass =
                  statusConfig[status]?.class || statusConfig.Unknown.class;

                const priorityClass =
                  priorityClassMap[priority] || 'user-active-priority-low';

                return (
                  <tr
                    key={number}
                    className="user-active-tickets-row"
                    onClick={() => handleView(ticket)}
                  >
                    <td className="user-active-ticket-number-cell">{number}</td>
                    <td className="user-active-subject-cell">{subject}</td>
                    <td>
                      <span
                        className={`user-active-status-badge ${statusClass}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`user-active-status-badge ${priorityClass}`}
                      >
                        {priority}
                      </span>
                    </td>
                    <td>{department}</td>
                    <td>{category}</td>
                    <td>{subCategory}</td>
                    <td>{formatDateTime(dateCreated)}</td>
                    <td>{formatDateTime(lastUpdated)}</td>
                    <td>
                      <div className="user-active-ticket-actions">
                        <button
                          className="user-active-ticket-btn user-active-ticket-view-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(ticket);
                          }}
                          title="View Ticket"
                        >
                          View
                        </button>
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