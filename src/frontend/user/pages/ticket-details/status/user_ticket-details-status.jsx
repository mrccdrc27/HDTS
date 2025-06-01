import "./user_ticket-details-status.css";
import UserTicketProgress from "./user_ticket-details-progress-bar.jsx";
import UserTicketTimeline from "./user_ticket-details-status-timeline.jsx";

const UserTicketDetailsStatus = () => {
  return (
    <div className="ticket-status-container">
      <div className="header-card">
        <h1 className="header-title">Current Ticket Status</h1>
      </div>

      {/* ✅ Render progress bar component here */}
      <UserTicketProgress />

      <hr className="divider" />

      <div className="timeline-scroll-container">
        <UserTicketTimeline />
      </div>
    </div>
  );
};

export default UserTicketDetailsStatus;
