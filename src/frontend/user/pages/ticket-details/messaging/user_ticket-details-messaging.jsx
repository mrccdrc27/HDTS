import { useEffect, useState } from 'react';
import { getTicketByNumber } from '../../../../../utilities/storage/ticketStorage.js';
import './user_ticket-details-messaging.css';

const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return (
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
    ' | ' +
    date.toLocaleDateString(undefined, { month: 'long', day: '2-digit', year: 'numeric' })
  );
};

const UserDetailsTicketMessaging = ({ ticketNumber }) => {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (ticketNumber) {
      const data = getTicketByNumber(ticketNumber);
      setTicket(data);
    }
  }, [ticketNumber]);

  if (!ticket) return <div>Loading messaging data...</div>;

  const statusHistory = ticket.statusHistory || [];

  return (
    <div className="ticket-messaging-container">
      {/* Process Tabs */}
      <div className="process-tabs">
        {statusHistory.map((entry, index) => (
          <div
            key={index}
            className={`tab ${index === statusHistory.length - 1 ? 'active' : 'completed'}`}
          >
            {entry.status}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="messaging-content">
        {/* Date Header */}
        <div className="date-header">
          {formatDateTime(ticket.dateCreated)}
        </div>

        {/* Agent Message */}
        <div className="message-group agent-message">
          <div className="message-header">
            <div className="avatar"></div>
            <div className="agent-info">
              <span className="agent-name">{ticket.assignedTo?.name || '[Agent Name]'}</span>
              <span className="timestamp">
                {formatDateTime(ticket.lastUpdated)}
              </span>
            </div>
          </div>
          <div className="message-bubble agent-bubble">
            {ticket.agentMessage || "Hi, we're currently looking into your issue. Please expect an update shortly."}
          </div>
        </div>

        {/* User Message */}
        <div className="message-group user-message">
          <div className="message-bubble user-bubble">
            {ticket.userMessage || "Thank you! Looking forward to your feedback."}
          </div>
          <div className="message-timestamp">
            {formatDateTime(ticket.dateCreated)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn">Reply</button>
          <button className="action-btn">Close Ticket</button>
          <button className="action-btn">Reopen</button>
          <button className="action-btn">Escalate</button>
        </div>

        {/* Message Input */}
        <div className="message-input-container">
          <div className="input-wrapper">
            <div className="attach-btn">📎</div>
            <input 
              type="text" 
              placeholder="What's your message?" 
              className="message-input"
            />
            <button className="send-btn">➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsTicketMessaging;
