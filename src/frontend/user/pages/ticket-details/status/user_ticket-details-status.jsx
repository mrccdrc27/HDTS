import "./user_ticket-details-status.css";
import UserTicketProgress from "./user_ticket-details-progress-bar.jsx";
import UserTicketTimeline from "./user_ticket-details-status-timeline.jsx";

const UserTicketDetailsStatus = ({ ticketNumber }) => {
  if (!ticketNumber) {
    return (
      <div className="ticket-status-container">
        <p className="error-message">No ticket number provided.</p>
      </div>
    );
  }

  return (
    <div className="ticket-status-container">
      {/* Section Title for Progress Bar */}
      <UserTicketProgress ticketNumber={ticketNumber} />

      <hr className="divider" />

      <div className="timeline-scroll-container">
        <UserTicketTimeline ticketNumber={ticketNumber} />
      </div>
    </div>
  );
};

export default UserTicketDetailsStatus;
