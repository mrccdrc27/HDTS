import { useEffect, useState } from 'react';
import ActiveTicketsToolbar from '../pages/user/active-tickets/active-tickets-components/user_active-tickets-toolbar.jsx';
import { loadTickets } from '../../utilities/ticket-data/ticketData.js';
import { Outlet } from 'react-router-dom';

const ActiveTicketsLayout = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Load the tickets when the component mounts
    const fetchedTickets = loadTickets();
    setTickets(fetchedTickets);
  }, []);

  return (
    <div className="active-tickets-layout">
      <div className="active-tickets-toolbar">
        <ActiveTicketsToolbar tickets={tickets} /> {/* Pass tickets to the toolbar */}
      </div>
      <div className="active-tickets-content">
        <Outlet context={{ tickets }} /> {/* Pass tickets to nested routes via Outlet */}
      </div>
    </div>
  );
};

export default ActiveTicketsLayout;
