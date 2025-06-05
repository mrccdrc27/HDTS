import './admin_dashboard.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [newTickets, setNewTickets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setFirstName(payload.first_name || '');
    }
  }, []);

  useEffect(() => {
    const fetchNewTickets = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/tickets/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        // Filter tickets to only show those with "New" status
        const filteredTickets = response.data
          .filter(ticket => ticket.status === 'New')
          .map(ticket => ({
            id: ticket.ticket_number,
            subject: ticket.subject,
            category: ticket.category,
            subCategory: ticket.sub_category,
          }));

        setNewTickets(filteredTickets);
      } catch (error) {
        console.error('Error fetching new tickets:', error);
        setError('Unable to load new tickets for approval.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewTickets();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, <span className="user-name">{firstName}!</span></h1>
      </div>

      <div className="ticket-status-cards">
        <div className="status-card">
          <h2>00</h2>
          <p className="open">Open</p>
        </div>
        <div className="status-card">
          <h2>00</h2>
          <p className="on-process">On Process</p>
        </div>
        <div className="status-card">
          <h2>00</h2>
          <p className="pending">Pending</p>
        </div>
        <div className="status-card">
          <h2>00</h2>
          <p className="resolved">Resolved</p>
        </div>
        <div className="status-card blue">
          <h2>00</h2>
          <p>Total Tickets</p>
        </div>
      </div>

      <div className="manageapproval-section">
        <div className="manageapproval-header">
          <h2>Approval Requests</h2>
          <button className="manage-button" onClick={() => navigate('/admin/ticket-management-all-tickets')}>Manage Approvals</button>
        </div>

        <div className="approval-table-container">
          <table className="approval-table">
            <thead>
              <tr>
                <th>Ticket Number</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Sub Category</th>
              </tr>
            </thead>
            <tbody>
                {newTickets.length > 0 ? (
                  newTickets.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>{request.subject}</td>
                      <td>{request.category}</td>
                      <td>{request.subCategory}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-tickets-message">
                      No new tickets requiring approval.
                    </td>
                  </tr>
                )}
              </tbody>
          </table>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Tickets per Category</h3>
          <div className="donut-chart">
            {/* Placeholder for donut chart */}
            <div className="donut-placeholder"></div>
          </div>
        </div>
        <div className="chart-card">
          <h3>Tickets per Priority Level</h3>
          <div className="bar-chart">
            {/* Placeholder for bar chart */}
            <div className="bar-placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;