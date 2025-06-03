import "./user_ticket-details-status-timeline.css";

const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return (
    date.toLocaleDateString(undefined, { month: 'long', day: '2-digit', year: 'numeric' }) +
    ' : ' +
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
};

const getStatusDetails = (status) => {
  switch (status) {
    case "Approved":
      return {
        title: "Ticket Approved",
        description: "Ticket is already assigned to IT Department.",
        icon: (
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        ),
      };
    case "Submitted":
      return {
        title: "Delivered to IT Department",
        description: "Please wait for the Ticket Agent.",
        icon: (
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
        ),
      };
    default:
      return {
        title: status,
        description: "Status update recorded.",
        icon: (
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
        ),
      };
  }
};

const UserTicketTimeline = ({ statusHistory = [] }) => {
  if (!statusHistory.length) {
    return <div className="timeline-card">No status updates available.</div>;
  }

  return (
    <div className="timeline-card">
      {[...statusHistory].reverse().map((entry, index) => {
        const { title, description, icon } = getStatusDetails(entry.status);
        return (
          <div className="timeline-item" key={index}>
            <div className="timeline-icon timeline-icon-green">
              {icon}
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3 className="timeline-title">{title}</h3>
                <span className="timeline-description">{description}</span>
              </div>
              <p className="timeline-date">{formatDateTime(entry.timestamp)}</p>
            </div>
            {index < statusHistory.length - 1 && <div className="timeline-connector"></div>}
          </div>
        );
      })}
    </div>
  );
};

export default UserTicketTimeline;
