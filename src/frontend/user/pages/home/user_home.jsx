import React, { useEffect, useState } from 'react';
import { Plus, Search, Menu, Bot, HelpCircle, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import UserHomeActiveTicketsOverview from './user_active-tickets-overview.jsx';
import SupportChatModal from '../chatbot/user_chatbot.jsx';
import { getTickets } from '../../../../utilities/storage/ticketStorage.js';
import './user_home.css';

const UserHome = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [userTickets, setUserTickets] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', 'U001');
      localStorage.setItem('firstName', 'Bonjing');
      localStorage.setItem('role', 'User');
    }

    const name = localStorage.getItem('firstName');
    if (name) setFirstName(name);

    const userId = localStorage.getItem('userId');
    if (userId) {
      const allTickets = getTickets();
      const userTickets = allTickets
        .filter(ticket => ticket.createdBy?.userId === userId)
        .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      setUserTickets(userTickets);
    }
  }, []);

  const handleToggle = () => {
    if (!showModal) setIsExpanded(!isExpanded);
  };

  const openModal = () => {
    setIsExpanded(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'Submitted': 'user-active-status-submitted',
      'Open': 'user-active-status-open',
      'Pending': 'user-active-status-pending',
      'In Progress': 'user-active-status-progress',
      'On Hold': 'user-active-status-hold',
      'Resolved': 'user-active-status-resolved',
      'Closed': 'user-active-status-closed'
    };
    return statusMap[status] || '';
  };

  return (
    <div className="user-home">
      <header className="header">
        <h1 className="welcome">
          Welcome, <span className="username">{firstName}!</span>
          <span className="ticket-count">You have {userTickets.length} tickets.</span>
        </h1>
      </header>

      <section className="action-buttons">
        <Link to="/user/request-ticket" className="button-link">
          <button className="button primary">
            <Plus size={18} />
            Submit a Ticket
          </button>
        </Link>
        <Link to="/user/all-records" className="button-link">
          <button className="button secondary">
            <Search size={18} />
            View All Tickets
          </button>
        </Link>
      </section>

      <section className="notice-card">
        <h2 className="notice-title">NOTICE!</h2>
        <div className="notice-content">
          <p>Our support team operates during <strong className="highlight">8:00 AM - 5:00 PM</strong>.</p>
          <ul className="notice-list">
            <li>Tickets will be processed within <strong className="highlight">1 business day</strong> after submission</li>
            <li>Urgent requests? Call <strong className="highlight">+63 912 345 6789</strong></li>
          </ul>
        </div>
      </section>

      <section className="tickets-container">
        <div className="section-header">
          <h2 className="section-title">My Recent Tickets</h2>
          {userTickets.length > 3 && (
            <Link to="/user/all-records" className="view-all">
              View All <ChevronRight size={16} />
            </Link>
          )}
        </div>

        {userTickets.length === 0 ? (
          <div className="no-tickets">
            <p>You haven't submitted any tickets yet.</p>
            <Link to="/user/request-ticket" className="button primary">
              Create Your First Ticket
            </Link>
          </div>
        ) : (
          <div className="tickets-grid">
            {userTickets.slice(0, 3).map((ticket) => (
              <div key={ticket.ticketNumber} className="ticket-card">
                <div className="ticket-header">
                  <div className="ticket-number">{ticket.ticketNumber}</div>
                  <div className={`ticket-status ${getStatusClass(ticket.status)}`}>
                    {ticket.status}
                  </div>
                </div>
                
                <div className="ticket-content">
                  <div className="ticket-row">
                    <div className="ticket-value">{ticket.subject}</div>
                  </div>
                  
                  <div className="ticket-row">
                    <div className="ticket-label">Priority</div>
                    <div className="ticket-value">{ticket.priorityLevel || 'Not specified'}</div>
                  </div>
                  
                  <div className="ticket-row">
                    <div className="ticket-label">Category</div>
                    <div className="ticket-value">
                      {ticket.category} {ticket.subCategory && `> ${ticket.subCategory}`}
                    </div>
                  </div>
                  
                  <div className="ticket-row">
                    <div className="ticket-label">Assigned</div>
                    <div className="ticket-value">{ticket.assignedTo?.name || 'Unassigned'}</div>
                  </div>
                  
                  <div className="ticket-row">
                    <div className="ticket-label">Created by</div>
                    <div className="ticket-value">{ticket.createdBy?.name}</div>
                  </div>
                  
                  <Link 
                    to={`/user/ticket-details/${ticket.ticketNumber}`} 
                    className="view-details-link"
                  >
                    View Details <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Button Menu */}
      <div className="floating-menu">
        <div className={`floating-options ${isExpanded ? 'showing' : 'hidden'}`}>
          <button
            className="float-button"
            onClick={() => navigate('/user/frequently-asked-questions')}
            title="FAQs"
          >
            <HelpCircle size={24} />
          </button>
          <button className="float-button" onClick={openModal} title="Chat">
            <Bot size={24} />
          </button>
        </div>
        <button
          className={`float-button main ${isExpanded ? 'rotated' : ''}`}
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