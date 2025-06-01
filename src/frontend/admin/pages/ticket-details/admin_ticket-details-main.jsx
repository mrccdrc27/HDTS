import "./admin_ticket-details-main.css";
import AdminTicketDetailsInformation from "./admin_ticket-details-information.jsx";
import AdminTicketDetailsStatus from "./admin_ticket-details-status.jsx";

const AdminTicketDetails = () => {
  return (
    <div className="admin-ticket-details-container">
      <h1>Admin Ticket Details Layout</h1>

      <div className="admin-row-two-columns">
        <div className="admin-section column">
          <AdminTicketDetailsInformation />
        </div>
        <div className="admin-section column">
          <AdminTicketDetailsStatus />
        </div>
      </div>

    </div>
  );
};

export default AdminTicketDetails;
