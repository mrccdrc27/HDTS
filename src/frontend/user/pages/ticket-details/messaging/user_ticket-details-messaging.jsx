import './user_ticket-details-messaging.css';

const UserDetailsTicketMessaging = () => {
  return (
    <div className="ticket-messaging-container">
      {/* Process Tabs */}
      <div className="process-tabs">
        <div className="tab completed">Ticket Submitted</div>
        <div className="tab active">Ticket Approved</div>
        <div className="tab inactive">[Ticket Status]</div>
      </div>

      {/* Main Content */}
      <div className="messaging-content">
        {/* Date Header */}
        <div className="date-header">9:03 AM | APRIL 05, 2025</div>

        {/* Agent Message */}
        <div className="message-group agent-message">
          <div className="message-header">
            <div className="avatar"></div>
            <div className="agent-info">
              <span className="agent-name">[Agent Name]</span>
              <span className="timestamp">9:03 AM | APRIL 05, 2025</span>
            </div>
          </div>
          <div className="message-bubble agent-bubble">
            Hi, we're currently looking into your issue. Please expect an update shortly.
          </div>
        </div>

        {/* User Message */}
        <div className="message-group user-message">
          <div className="message-bubble user-bubble">
            Thank you! Looking forward to your feedback.
          </div>
          <div className="message-timestamp">9:05 AM | APRIL 05, 2025</div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn">Button Text</button>
          <button className="action-btn">Button Text</button>
          <button className="action-btn">Button Text</button>
          <button className="action-btn">Button Text</button>
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