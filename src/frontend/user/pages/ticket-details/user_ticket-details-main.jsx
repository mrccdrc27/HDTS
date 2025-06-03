import { useParams } from "react-router-dom";
import "./user_ticket-details-main.css";
import UserTicketDetailsInformation from "./ticket-information/user_ticket-details-information.jsx";
import UserTicketDetailsStatus from "./status/user_ticket-details-status.jsx";
import UserTicketDetailsMessaging from "./messaging/user_ticket-details-messaging.jsx";

const UserTicketDetails = () => {
  const { ticketNumber } = useParams(); // get ticketNumber from URL

  if (!ticketNumber) {
    return (
      <div className="user-ticket-details-container">
        <p className="error-message">No ticket number specified in URL.</p>
      </div>
    );
  }

  return (
    <div className="user-ticket-details-container">
      {/* Removed header-row with back button */}
      <div className="row-two-columns">
        <div className="section column">
          <UserTicketDetailsInformation ticketNumber={ticketNumber} />
        </div>
        <div className="section column">
          {/* Uncomment if you want to show status */}
          {/* <UserTicketDetailsStatus ticketNumber={ticketNumber} /> */}
        </div>
      </div>

      <div className="section">
        {/* Uncomment if you want to show messaging */}
        {/* <UserTicketDetailsMessaging ticketNumber={ticketNumber} /> */}
      </div>
    </div>
  );
};

export default UserTicketDetails;
