import './admin_dashboard.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [newTickets, setNewTickets] = useState([]);
  const [openCount, setOpenCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [onProcessCount, setOnProcessCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("adminAuthToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setFirstName(payload.first_name || "");
      } catch (err) {
        console.warn("Failed to decode token:", err);
      }
    }
  }, []);

  const fetchTicketStats = async () => {
    let accessToken = localStorage.getItem("adminAuthToken");
    const refreshToken = localStorage.getItem("adminRefreshToken");

    if (!accessToken || !refreshToken) {
      console.warn("Missing tokens.");
      setError("Authentication error.");
      setLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) {
        const refreshResponse = await fetch("http://localhost:8000/api/token/refresh/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          accessToken = refreshData.access;
          localStorage.setItem("adminAuthToken", accessToken);
        } else {
          throw new Error("Unable to refresh token.");
        }
      }
    } catch (err) {
      console.error("Token validation/refresh failed:", err);
      setError("Authentication failed.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/tickets/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const tickets = response.data;
      setOpenCount(tickets.filter(ticket => ticket.status === "Open").length);
      setPendingCount(tickets.filter(ticket => ticket.status === "Pending").length);
      setResolvedCount(tickets.filter(ticket => ticket.status === "Resolved").length);
      setRejectedCount(tickets.filter(ticket => ticket.status === "Rejected").length);
      setOnProcessCount(tickets.filter(ticket => ticket.status === "On Process").length);
      setTotalCount(tickets.length);

      const filteredTickets = tickets
        .filter((ticket) => ticket.status === "New")
        .map((ticket) => ({
          id: ticket.ticket_number,
          subject: ticket.subject,
          category: ticket.category,
          subCategory: ticket.sub_category,
        }));
      setNewTickets(filteredTickets);

    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError("Unable to load ticket stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketStats();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, <span className="user-name">{firstName}!</span></h1>
      </div>

      <div className="ticket-status-cards">
        <div className="status-card">
          <h2>{openCount.toString().padStart(2, '0')}</h2>
          <p><span className="open">Open</span></p>
        </div>
        <div className="status-card purple">
          <h2>{onProcessCount.toString().padStart(2, '0')}</h2>
          <p><span className="on-process">On Process</span></p>
        </div>
        <div className="status-card orange">
          <h2>{pendingCount.toString().padStart(2, '0')}</h2>
          <p><span className="pending">Pending</span></p>
        </div>
        <div className="status-card green">
          <h2>{resolvedCount.toString().padStart(2, '0')}</h2>
          <p><span className="resolved">Resolved</span></p>
        </div>
        <div className="status-card blue">
          <h2>{totalCount.toString().padStart(2, '0')}</h2>
          <p><span className="total">Total Tickets</span></p>
        </div>
      </div>

      <div className="manageapproval-section">
        <div className="manageapproval-header">
          <h2>Approval Requests</h2>
          <button className="manage-button" onClick={() => navigate('/admin/ticket-management/all-tickets')}>Manage Approvals</button>
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