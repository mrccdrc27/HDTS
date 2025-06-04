import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicketByNumber } from "../../../../utilities/storage/ticketStorage";
import "./admin_ticket-details-main.css";
import AdminTicketDetailsInformation from "./admin_ticket-details-information.jsx";
import AdminTicketDetailsStatus from "./admin_ticket-details-status.jsx";

const AdminTicketDetails = () => {
  const { ticketNumber } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (ticketNumber) {
      const data = getTicketByNumber(ticketNumber);
      setTicket(data);
    }
  }, [ticketNumber]);

  if (!ticket) return <div>Loading ticket...</div>;

  const isNewTicket = ticket.status?.toLowerCase() === "new";

  return (
    <div className="admin-ticket-details-container">
      {/* Row 1: Action Buttons */}
      {isNewTicket && (
        <div className="ticket-approval-buttons-container">
          <button className="approve-button">Approve</button>
          <button className="reject-button">Reject</button>
        </div>
      )}

      {/* Row 2: Two Columns */}
      <div className="admin-row-two-columns">
        <div className="admin-section column">
          <AdminTicketDetailsInformation ticketNumber={ticketNumber} />
        </div>
        <div className="admin-section column">
          <AdminTicketDetailsStatus ticketNumber={ticketNumber} />
        </div>
      </div>
    </div>
  );
};

export default AdminTicketDetails;
