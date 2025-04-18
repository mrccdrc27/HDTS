import React from 'react';
import { Link } from 'react-router-dom';

const UserNavBar = () => {
  return (
    <nav>
      <Link to="/home">Home</Link> | 
      <Link to="/all-tickets">All Tickets</Link> | 
      <Link to="/ticket-history">Ticket History</Link> 
    </nav>
  );
}

export default UserNavBar;