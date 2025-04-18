import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from "../pages/user/user_home.jsx";
import ActiveTickets from "../pages/user/user_active-tickets/user_active-tickets.jsx";
import TicketRecords from "../pages/user/user_ticket-records/user_ticket-records.jsx";

const User = () => {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/active-tickets" element={<ActiveTickets />} />
            <Route path="/ticket-records" element={<TicketRecords />} /> 
          </Routes> 
        </Router>
      </>
    )
  } 
  
  export default User;