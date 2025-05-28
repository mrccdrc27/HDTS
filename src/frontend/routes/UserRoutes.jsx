import { Routes, Route } from 'react-router-dom';

import UserLayout from '../user/layouts/pages/user_layout.jsx';
import UserHome from '../user/pages/home/user_home.jsx';
import FrequentlyAskedQuestions from '../user/pages/faqs/user_faqs.jsx';
import RequestTicket from '../user/pages/request-ticket/user_request-ticket.jsx';
import TicketDetailsLayout from '../user/layouts/user_ticket-details-layout.jsx';
import ActiveTickets from '../user/pages/active-tickets/user_active-tickets-main.jsx';
import TicketRecords from '../user/pages/ticket-records/user_ticket-records-main.jsx';

// ticket details layout to be edited
export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/user" element={<UserLayout />}>
        <Route path="home" element={<UserHome />} />
        <Route path="frequently-asked-questions" element={<FrequentlyAskedQuestions />} />
        <Route path="request-ticket" element={<RequestTicket />} />
        <Route path="ticket-details/:ticketNumber" element={<TicketDetailsLayout />} />
        <Route path="active-tickets" element={<ActiveTickets />} />
        <Route path="ticket-records" element={<TicketRecords />} />

      </Route>
    </Routes>
  );
};
