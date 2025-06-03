import { Routes, Route } from 'react-router-dom';

import UserLayout from '../user/layouts/pages/user_layout.jsx';
import UserHome from '../user/pages/home/user_home.jsx';
import FrequentlyAskedQuestions from '../user/pages/faqs/user_faqs.jsx';
import RequestTicket from '../user/pages/request-ticket/user_request-ticket.jsx';
import UserTicketDetails from '../user/pages/ticket-details/user_ticket-details-main.jsx';
import ActiveTickets from '../user/pages/active-tickets/user_active-tickets-main.jsx';
import TicketRecords from '../user/pages/ticket-records/user_ticket-records-main.jsx';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/user" element={<UserLayout />}>
        <Route path="home" element={<UserHome />} />
        <Route path="frequently-asked-questions" element={<FrequentlyAskedQuestions />} />
        <Route path="request-ticket" element={<RequestTicket />} />

        {/* Added :ticketNumber param to route */}
        <Route path="ticket-details/:ticketNumber" element={<UserTicketDetails />} />

        <Route path="active-tickets/:category" element={<ActiveTickets />} />
        <Route path="ticket-records/:category" element={<TicketRecords />} />
      </Route>
    </Routes>
  );
};
