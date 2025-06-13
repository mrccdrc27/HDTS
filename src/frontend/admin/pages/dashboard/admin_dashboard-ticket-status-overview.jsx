// components/TicketStatusCards.jsx
import './admin_dashboard-ticket-status-overview.css';

const TicketStatusCards = ({ ticketStats }) => {
  return (
    <div className="ticket-status-grid">
      {/* New Tickets */}
      <div className="status-card new-tickets">
        <h2 className="status-count">{ticketStats.new.toString().padStart(2, '0')}</h2>
        <p className="status-label">New Tickets</p>
      </div>
      
      {/* Pending Tickets */}
      <div className="status-card pending-tickets">
        <h2 className="status-count">{ticketStats.pending.toString().padStart(2, '0')}</h2>
        <p className="status-label">Pending Tickets</p>
      </div>
      
      {/* Open Tickets */}
      <div className="status-card open-tickets">
        <h2 className="status-count">{ticketStats.open.toString().padStart(2, '0')}</h2>
        <p className="status-label">Open</p>
      </div>
      
      {/* Total Tickets */}
      <div className="status-card total-tickets">
        <h2 className="status-count">{ticketStats.total.toString().padStart(2, '0')}</h2>
        <p className="status-label">Total Tickets</p>
      </div>
      
      {/* On Progress */}
      <div className="status-card on-progress">
        <h2 className="status-count">{ticketStats.onProgress.toString().padStart(2, '0')}</h2>
        <p className="status-label">On Progress</p>
      </div>
      
      {/* On Hold */}
      <div className="status-card on-hold">
        <h2 className="status-count">{ticketStats.onHold.toString().padStart(2, '0')}</h2>
        <p className="status-label">On Hold</p>
      </div>
      
      {/* Resolved */}
      <div className="status-card resolved">
        <h2 className="status-count">{ticketStats.resolved.toString().padStart(2, '0')}</h2>
        <p className="status-label">Resolved</p>
      </div>
    </div>
  );
};

export default TicketStatusCards;