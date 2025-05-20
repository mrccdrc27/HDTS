import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import child components
import TicketDetails from '../pages/ticket-details/user_ticket-details.jsx';
import UserTicketStatus from '../pages/ticket-details/user_ticket-status.jsx';
import UserTicketMessaging from '../pages/ticket-details/user_ticket-messaging.jsx';

// Utility loader
const loadAllTickets = () => {
  const active = JSON.parse(localStorage.getItem('activeTickets')) || [];
  const records = JSON.parse(localStorage.getItem('ticketRecords')) || [];
  return [...active, ...records]; // Merge all possible ticket sources
};

const TicketDetailsLayout = () => {
  const { ticketNumber } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const loadTicket = () => {
      const allTickets = loadAllTickets();
      const foundTicket = allTickets.find(t => t.number === ticketNumber);
      setTicket(foundTicket || null);
    };

    if (ticketNumber) {
      loadTicket();
    }
  }, [ticketNumber]);

  return (
    <div className="ticket-details-layout">
      <h1>Ticket Details</h1>
      {ticket ? (
        <div className="ticket-details-wrapper">
          <TicketDetails ticket={ticket} />
          <UserTicketStatus ticket={ticket} />
        </div>
      ) : (
        <p>Ticket not found for number: {ticketNumber}</p>
      )}
      {ticket && <UserTicketMessaging ticket={ticket} />}
    </div>
  );
};

export default TicketDetailsLayout;
