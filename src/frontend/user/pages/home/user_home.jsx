// UserHome.jsx
import React, { useEffect, useState } from 'react';
import { Plus, Search, Menu, Bot, HelpCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SupportChatModal from '../chatbot/user_chatbot.jsx';
import './user_home.css';

const UserHome = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [tickets, setTickets] = useState([]);

  const handleToggle = () => {
    if (!showModal) setIsExpanded(!isExpanded);
  };

  const openModal = () => {
    setIsExpanded(false);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const name = localStorage.getItem("firstName");
    if (name) setFirstName(name);

    // Fetch tickets for the user with refresh token logic
    const fetchTickets = async () => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      let token = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');

      const fetchWithToken = async (accessToken) => {
        return axios.get(`${API_BASE_URL}/api/tickets/`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      };

      let response;
      try {
        response = await fetchWithToken(token);
      } catch (err) {
        // Handle 401 Unauthorized with token refresh
        if (err.response?.status === 401 && refreshToken) {
          try {
            const refreshRes = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
              refresh: refreshToken,
            });
            const newAccess = refreshRes.data.access;
            localStorage.setItem('authToken', newAccess);
            response = await fetchWithToken(newAccess);
          } catch (refreshErr) {
            console.error('Token refresh failed:', refreshErr);
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            setTickets([]);
            return;
          }
        } else {
          setTickets([]);
          return;
        }
      }
      setTickets(response.data);
    };

    fetchTickets();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return 'N/A';
    return date.toLocaleString();
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="welcome">
          Welcome, <span className="username">{firstName}!</span>
        </h1>
      </header>

      <div className="action-buttons">
        <Link to="/user/request-ticket">
          <button className="button submit-button">
            <Plus size={18} /> Submit a Ticket
          </button>
        </Link>

        <Link to="/user/ticket-records/all-ticket-records">
          <button className="button view-button">
            <Search size={18} /> View Tickets
          </button>
        </Link>
      </div>

      <hr className="divider" />

      <section className="notice">
        <h2 className="notice-title">NOTICE!</h2>
        <p className="notice-content">
          Our support team operates during <strong className="highlight">8:00 AM - 5:00 PM</strong>.
        </p>
        <ul className="notice-list">
          <li>
            Tickets submitted outside working hours will be placed in the{' '}
            <span className="pending">Pending</span> queue.
          </li>
          <li>
            Once working hours resume, tickets will move to <strong>Open</strong> or{' '}
            <strong>In Progress</strong> based on priority.
          </li>
        </ul>
        <p className="notice-content">Thank you for your patience!</p>
      </section>

      <hr className="divider" />

      <section>
        <h2 className="section-title">Ticket Status</h2>
        <div className="ticket-scroll-container">
          {tickets.length === 0 ? (
            <div>No tickets found.</div>
          ) : (
            [...tickets].reverse().map(ticket => (
              <div className="ticket-card" key={ticket.id}>
                <div className="ticket-header">
                  <div>
                    <div className="ticket-number">Ticket Number: {ticket.ticket_number || ticket.id}</div>
                    <div className="ticket-details-row">
                      <div className="ticket-title">Subject: {ticket.subject}</div>
                      <div className="ticket-assigned">Assigned to: {ticket.assigned_to_name || 'Unassigned'}</div>
                    </div>
                  </div>
                  <div className="ticket-status-container">
                    <span className={`ticket-status ticket-status-${(ticket.status || '').toLowerCase().replace(/\s/g, '-')}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
                <div className="ticket-info">
                  <p className="ticket-message">{ticket.latest_update || ticket.description}</p>
                  <div className="ticket-dates">
                    <span>Last Update: {formatDate(ticket.last_update || ticket.updated_at || ticket.update_date)}</span>
                    <span>Submitted Date: {formatDate(ticket.created_at || ticket.submit_date)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Floating Button Menu */}
      <div className="floating-menu">
        <div className={`floating-options ${isExpanded ? 'showing' : 'hidden'}`}>
          <button
            className="float-button help-button"
            onClick={() => navigate('/user/frequently-asked-questions')}
            title="FAQs"
          >
            <HelpCircle size={24} />
          </button>

          <button className="float-button message-button" onClick={openModal} title="Chat">
            <Bot size={24} />
          </button>
        </div>

        <button
          className={`float-button main-button ${isExpanded ? 'rotated' : ''}`}
          onClick={handleToggle}
        >
          <Menu size={24} />
        </button>
      </div>

      {showModal && <SupportChatModal closeModal={closeModal} />}
    </div>
  );
};

export default UserHome;