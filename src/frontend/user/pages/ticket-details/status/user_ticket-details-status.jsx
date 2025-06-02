import "./user_ticket-details-status.css";
import UserTicketProgress from "./user_ticket-details-progress-bar.jsx";
import UserTicketTimeline from "./user_ticket-details-status-timeline.jsx";

const UserTicketDetailsStatus = () => {
  return (
    <div className="ticket-status-container">
      
      {/* ✅ Section Title for Progress Bar */}
      <UserTicketProgress />

      <hr className="divider" />

      <div className="timeline-scroll-container">
        <UserTicketTimeline />
      </div>
    </div>
  );
};

export default UserTicketDetailsStatus;
