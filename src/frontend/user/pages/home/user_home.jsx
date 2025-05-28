// UserHome.jsx
import React, { useEffect, useState } from 'react';
import { Plus, Search, Menu, Bot, HelpCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import SupportChatModal from '../chatbot/user_chatbot.jsx';
import './user_home.css';

const UserHome = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");

  const handleToggle = () => {
    if (!showModal) {
      setIsExpanded(!isExpanded);
    }
  };

  const openModal = () => {
    setIsExpanded(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const name = localStorage.getItem("firstName");
    if (name) setFirstName(name);
  }, []);

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

        <Link to="/user/all-records">
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
            Tickets submitted outside working hours will be placed in the{''} 
            <span className="pending">Pending</span> queue.
          </li>
          <li>
            Once working hours resume, tickets will move to <strong>Open</strong> or{''} 
            <strong>In Progress</strong> based on priority.
          </li>
        </ul>
        <p className="notice-content">Thank you for your patience!</p>
      </section>

      <hr className="divider" />

      <section>
        <h2 className="section-title">Ticket Status</h2>
        <div className="ticket-card">
          <div className="ticket-header">
            <div>
              <div className="ticket-number">Ticket Number: TX0123</div>
              <div className="ticket-details-row">
                <div className="ticket-title">Subject: Laptop Requesting</div>
                <div className="ticket-assigned">Assigned to: John Doe</div>
              </div>
            </div>
            <div className="ticket-status-container">
              <span className="ticket-status">In Progress</span>
            </div>
          </div>

          <div className="ticket-info">
            <p className="ticket-message">Status update: Working on procurement process.</p>
            <div className="ticket-dates">
              <span>Last Update: 2025-04-20</span>
              <span>Submitted Date: 2025-04-19</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Button Menu */}
      <div className="floating-menu">
        {/* Expanded Options */}
        <div className={`floating-options ${isExpanded ? "showing" : "hidden"}`}>
          <button
            className="float-button help-button"
            onClick={() => navigate('/user/frequently-asked-questions')}
            title="FAQs"
          >
            <HelpCircle size={24} />
          </button>

          <button
            className="float-button message-button"
            onClick={openModal}
            title="Chat"
          >
            <Bot size={24} />
          </button>
        </div>

        {/* Main Expand Button */}
        <button
          className={`float-button main-button ${isExpanded ? 'rotated' : ''}`}
          onClick={handleToggle}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Show the Chat Modal */}
      {showModal && <SupportChatModal closeModal={closeModal} />}
    </div>
  );
};

export default UserHome;
