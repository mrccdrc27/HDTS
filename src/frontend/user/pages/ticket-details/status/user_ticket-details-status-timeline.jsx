import "./user_ticket-details-status-timeline.css";

const UserTicketTimeline = () => {
  return (
    <div className="timeline-card">
      {/* Ticket Approved */}
      <div className="timeline-item">
        <div className="timeline-icon timeline-icon-green">
          {/* Approved Icon */}
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </div>
        <div className="timeline-content">
          <div className="timeline-header">
            <h3 className="timeline-title">Ticket Approved</h3>
            <span className="timeline-description">Ticket is already assigned to IT Department.</span>
          </div>
          <p className="timeline-date">June 01, 2025 : 10:10pm</p>
        </div>
        <div className="timeline-connector"></div>
      </div>

      {/* Ticket Submitted */}
      <div className="timeline-item">
        <div className="timeline-icon timeline-icon-green">
          {/* Submitted Icon */}
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <div className="timeline-content">
          <div className="timeline-header">
            <h3 className="timeline-title">Delivered to IT Department</h3>
            <span className="timeline-description">Please wait for the Ticket Agent.</span>
          </div>
          <p className="timeline-date">June 02, 2025 : 11:50pm</p>
        </div>
      </div>
    </div>
  );
};

export default UserTicketTimeline;
