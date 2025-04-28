import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import SupportChatModal from './user_chatbot.jsx'; // <-- Correct import
import '../../styles/components/pages/user/user_home.css'; // Adjust path if needed

const UserHome = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false); // <-- Manage modal visibility

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="welcome">
          Welcome, <span className="username">User Name</span>
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
        <h2 className="notice-title">NOTICE</h2>
        <p className="notice-content">
          Our support team operates during <strong className="highlight">8:00 AM - 5:00 PM</strong>.
        </p>
        <ul className="notice-list">
          <li>Tickets submitted outside working hours will be placed in the <span className="pending">Pending</span> queue.</li>
          <li>Once working hours resume, tickets will move to <strong>Open</strong> or <strong>In Progress</strong> based on priority.</li>
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
              <div className="ticket-title">Subject: Laptop Requesting</div>
              <div className="ticket-assigned">Assigned to: John Doe</div>
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
        {/* Main Expand Button */}
        <button className="float-button main-button" onClick={handleToggle}>
          +
        </button>

        {/* Expanded Options */}
        {isExpanded && (
          <>
            {/* 💬 opens Modal now */}
            <button
              className="float-button message-button"
              onClick={openModal}
            >
              💬
            </button>

            {/* ❓ still navigates */}
            <button
              className="float-button help-button"
              onClick={() => navigate('/user/frequently-asked-questions')}
            >
              ❓
            </button>
          </>
        )}
      </div>

      {/* Show the Chat Modal */}
      {showModal && <SupportChatModal closeModal={closeModal} />}
    </div>
  );
};

export default UserHome;
