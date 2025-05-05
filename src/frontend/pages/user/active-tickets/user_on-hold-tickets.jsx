import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CreateTicketButton from '../../../components/buttons/user/create-ticket.jsx';
import '../../../styles/pages/user/user_alltickets.css'; // Import the shared CSS

const onHoldTickets = [
  {
    number: 'TX0215',
    subject: 'Incorrect budget report in system',
    department: 'Finance & Budgeting',
    category: 'Software',
    subCategory: 'Reporting',
    status: 'On Hold',
    dateCreated: '2025-04-04 02:30 PM',
    lastUpdated: '2025-04-04 03:00 PM',
  },
  // Add more "On Hold" tickets here as needed
];

const statusStyles = {
  'On Hold': 'status-hold', // Reuse earlier CSS class for status
};

const OnHoldTickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = onHoldTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(onHoldTickets.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="tickets-page"> {/* Reused the main container class */}
      <h1>On Hold Tickets</h1>

      <div className="controls-section"> {/* Reused controls-section */}
        <div className="top-controls">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
            />
            <Search className="search-icon" size={16} />
          </div>
          <CreateTicketButton />
        </div>

        <div className="filter-sort-controls">
          <span>Filter by:</span>
          <select className="filter-select">
            <option>Category</option>
          </select>
          <select className="filter-select">
            <option>Sub Category</option>
          </select>
          <select className="filter-select">
            <option>Department</option>
          </select>
          <span>Sort by:</span>
          <select className="sort-select">
            <option>Sort Order</option>
          </select>
          <select className="sort-select">
            <option>Date</option>
          </select>
        </div>
      </div>

      <div className="tickets-table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket Number</th>
              <th>Subject</th>
              <th>Department</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map((ticket, idx) => (
              <tr key={idx}>
                <td>{ticket.number}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.department}</td>
                <td>{ticket.category}</td>
                <td>{ticket.subCategory}</td>
                <td>
                  <span className={`status-badge ${statusStyles[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>{ticket.dateCreated}</td>
                <td>{ticket.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        {/* Reuse the pagination structure */}
        <div className="pagination-items-display">
          <span>Show</span>
          <select className="pagination-items-select">
            <option>20</option>
          </select>
          <span>items per page</span>
        </div>

        <div className="pagination-controls">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="pagination-nav-button"
          >
            ← Previous
          </button>

          <button
            onClick={() => goToPage(1)}
            className={`pagination-page-button ${currentPage === 1 ? 'active' : ''}`}
          >
            1
          </button>

          <span className="pagination-ellipsis">...</span>

          <button
            onClick={() => goToPage(totalPages)}
            className={`pagination-page-button ${currentPage === totalPages ? 'active' : ''}`}
          >
            {totalPages}
          </button>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="pagination-nav-button"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnHoldTickets;
