import { useNavigate } from "react-router-dom";
import "./user_ticket-details-main.css";
import UserTicketDetailsInformation from "./ticket-information/user_ticket-details-information.jsx";
import UserTicketDetailsStatus from "./status/user_ticket-details-status.jsx";
import UserTicketDetailsMessaging from "./messaging/user_ticket-details-messaging.jsx";

const UserTicketDetails = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes back to previous page
  };

  return (
    <div className="user-ticket-details-container">
      <div className="header-row">
        <button className="back-button" onClick={handleBack}>
          ← 
        </button>
      </div>

      <div className="row-two-columns">
        <div className="section column">
          <UserTicketDetailsInformation />
        </div>
        <div className="section column">
          <UserTicketDetailsStatus />
        </div>
      </div>

      <div className="section">
        <UserTicketDetailsMessaging />
      </div>
    </div>
  );
};

export default UserTicketDetails;
