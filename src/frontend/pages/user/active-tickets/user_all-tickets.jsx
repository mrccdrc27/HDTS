import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import '../../../styles/components/pages/user/user_alltickets.css'; // Adjust the path as necessary

const tickets = [
  {
    number: 'TX0001',
    subject: 'Printer not working',
    department: 'IT Department',
    category: 'Hardware',
    subCategory: 'Printer Issues',
    status: 'Pending',
    dateCreated: '2025-04-05 08:30 AM',
    lastUpdated: '2025-04-05 09:15 AM',
  },
  {
    number: 'TX0301',
    subject: 'Unable to connect to Wi-Fi',
    department: 'Operations',
    category: 'Network',
    subCategory: 'Wi-Fi',
    status: 'Open',
    dateCreated: '2025-04-05 09:00 AM',
    lastUpdated: '2025-04-05 09:45 AM',
  },
  {
    number: 'TX0011',
    subject: 'Request for additional RAM',
    department: 'Finance & Budgeting',
    category: 'Hardware Upgrade',
    subCategory: 'Memory',
    status: 'On Process',
    dateCreated: '2025-04-03 10:20 AM',
    lastUpdated: '2025-04-04 08:00 AM',
  },
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
  // Add more tickets as needed
];

const getStatusClass = (status) => {
  switch (status) {
    case 'Pending': return 'status-pending';
    case 'Open': return 'status-open';
    case 'On Process': return 'status-process';
    case 'On Hold': return 'status-hold';
    default: return '';
  }
};

const AllTickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate(); // Using the hook

  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleCreateTicket = () => {
    navigate('/user/request-ticket'); // Navigate to the request-ticket route
  };

  // Function to handle click on any row to navigate to ticket details
  const handleTicketClick = (ticketNumber) => {
    navigate(`/ticket-details/${ticketNumber}`); // Adjust based on your routing setup
  };

  return (
    <div className="tickets-page">
      <h1>All Tickets</h1>

      <div className="controls-section">
        <div className="top-controls">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
            />
            <Search className="search-icon" size={16} />
          </div>

          <button className="create-ticket-btn" onClick={handleCreateTicket}>
            <span>+</span> Create Ticket
          </button>
        </div>

        <div className="filter-sort-controls">
          <div className="filter-group">
            <span className="filter-label">Filter by:</span>
            <select className="filter-select">
              <option>Category</option>
            </select>
            <select className="filter-select">
              <option>Sub Category</option>
            </select>
            <select className="filter-select">
              <option>Department</option>
            </select>
            <select className="filter-select">
              <option>Status</option>
            </select>
          </div>

          <div className="sort-group">
            <span className="sort-label">Sort by:</span>
            <select className="sort-select">
              <option>Sort Order</option>
            </select>
            <select className="sort-select">
              <option>Date</option>
            </select>
          </div>
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
            {currentTickets.length > 0 ? (
              currentTickets.map((ticket, idx) => (
                <tr key={idx} onClick={() => handleTicketClick(ticket.number)}>
                  <td>{ticket.number}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.department}</td>
                  <td>{ticket.category}</td>
                  <td>{ticket.subCategory}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>{ticket.dateCreated}</td>
                  <td>{ticket.lastUpdated}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
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

          <button
            onClick={() => goToPage(2)}
            className={`pagination-page-button ${currentPage === 2 ? 'active' : ''}`}
          >
            2
          </button>

          <button
            onClick={() => goToPage(3)}
            className={`pagination-page-button ${currentPage === 3 ? 'active' : ''}`}
          >
            3
          </button>

          <span className="pagination-ellipsis">...</span>

          <button
            onClick={() => goToPage(67)}
            className={`pagination-page-button ${currentPage === 67 ? 'active' : ''}`}
          >
            67
          </button>

          <button
            onClick={() => goToPage(68)}
            className={`pagination-page-button ${currentPage === 68 ? 'active' : ''}`}
          >
            68
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

export default AllTickets;
