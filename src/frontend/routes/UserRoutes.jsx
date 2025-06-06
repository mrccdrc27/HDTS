import { Routes, Route } from 'react-router-dom';

import UserLayout from '../user/layouts/pages/user_layout.jsx';
import UserHome from '../user/pages/home/user_home.jsx';
import FrequentlyAskedQuestions from '../user/pages/faqs/user_faqs.jsx';
import RequestTicket from '../user/pages/request-ticket/user_request-ticket.jsx';
import UserTicketDetails from '../user/pages/ticket-details/user_ticket-details-main.jsx';
import ActiveTickets from '../user/pages/active-tickets/user_active-tickets-main.jsx';
import TicketRecords from '../user/pages/ticket-records/user_ticket-records-main.jsx';

import ProtectedRoute from '../routes/ProtectedRoute';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/user" element={<UserLayout />}>
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="frequently-asked-questions"
          element={
            <ProtectedRoute>
              <FrequentlyAskedQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="request-ticket"
          element={
            <ProtectedRoute>
              <RequestTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="ticket-details/"
          element={
            <ProtectedRoute>
              <UserTicketDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="active-tickets/:category"
          element={
            <ProtectedRoute>
              <ActiveTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="ticket-records/:category"
          element={
            <ProtectedRoute>
              <TicketRecords />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
