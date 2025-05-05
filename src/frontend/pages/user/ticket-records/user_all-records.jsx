import React, { useState } from 'react';
import '../../../styles/pages/user/user_all-records.css'; // Import the CSS for AllRecords page

const allRecords = [
  {
    number: 'TX0012',
    subject: 'Printer fixed',
    department: 'IT Department',
    category: 'Hardware',
    subCategory: 'Printer Issues',
    status: 'Closed',
    dateCreated: '2025-04-05 08:30 AM',
    lastUpdated: '2025-04-06 11:00 AM',
  },
  {
    number: 'TX0302',
    subject: 'Wi-Fi connection restored',
    department: 'Operations',
    category: 'Network',
    subCategory: 'Wi-Fi',
    status: 'Closed',
    dateCreated: '2025-04-05 09:00 AM',
    lastUpdated: '2025-04-06 02:00 PM',
  },
  {
    number: 'TX0013',
    subject: 'Additional RAM installed',
    department: 'Finance & Budgeting',
    category: 'Hardware Upgrade',
    subCategory: 'Memory',
    status: 'Rejected',
    dateCreated: '2025-04-03 10:20 AM',
    lastUpdated: '2025-04-04 05:00 PM',
  },
  {
    number: 'TX0216',
    subject: 'Budget report corrected',
    department: 'Finance & Budgeting',
    category: 'Software',
    subCategory: 'Reporting',
    status: 'Rejected',
    dateCreated: '2025-04-04 02:30 PM',
    lastUpdated: '2025-04-05 08:30 AM',
  },
];

const statusStyles = {
  Closed: 'status-closed',
  Rejected: 'status-rejected',
};

const AllRecords = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentRecords = allRecords.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(allRecords.length / itemsPerPage);

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
    <div className="all-records-page">
      <div className="top-controls">
        <h1>All Records</h1>
        <div className="search-bar-container">
          <input type="text" placeholder="Search" className="search-bar" />
        </div>

        <div className="filter-sort-controls">
          <div className="filter-group">
            <label>Filter by</label>
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
            <label>Sort by</label>
            <select className="sort-select">
              <option>Sort Order</option>
            </select>
            <select className="sort-select">
              <option>Date</option>
            </select>
          </div>
        </div>
      </div>

      <div className="records-table-container">
        <table className="records-table">
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
            {currentRecords.map((ticket, idx) => (
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
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          &larr; Previous
        </button>
        <div className="pagination-items-display">
          <button onClick={() => goToPage(1)}>1</button>
          {currentPage > 2 && <span>...</span>}
          <button onClick={() => goToPage(totalPages)}>{totalPages}</button>
        </div>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default AllRecords;
