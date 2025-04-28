import React, { useState } from 'react';

const TicketManagementAllTickets = () => {
  // Sample data for tickets
  const ticketsData = [
    { id: 'TX0001', subject: 'Printer not working', department: 'IT Department', category: 'Hardware', subCategory: 'Printer Issues' },
    { id: 'TX0301', subject: 'Unable to connect to Wi-Fi', department: 'Operations', category: 'Network', subCategory: 'Wi-Fi' },
    { id: 'TX0011', subject: 'Request for additional RAM', department: 'Finance & Budgeting', category: 'Hardware Upgrade', subCategory: 'Memory' },
    { id: 'TX0215', subject: 'Incorrect budget report in system', department: 'Finance & Budgeting', category: 'Software', subCategory: 'Reporting' },
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // For filter and sort dropdowns
  const [sortOrder, setSortOrder] = useState('Sort Order');
  const [dateFilter, setDateFilter] = useState('Date');
  
  // For filter dropdowns
  const [categoryFilter, setCategoryFilter] = useState('Category');
  const [subCategoryFilter, setSubCategoryFilter] = useState('Sub Category');
  const [departmentFilter, setDepartmentFilter] = useState('Department');
  const [statusFilter, setStatusFilter] = useState('Status');

  // Generate pagination numbers
  const totalPages = 68; // From the image
  const pageNumbers = [];
  
  // Create array of visible page numbers
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    pageNumbers.push(2);
    pageNumbers.push(3);
    
    if (currentPage > 5) {
      pageNumbers.push('...');
    }
    
    if (currentPage > 4 && currentPage < totalPages - 3) {
      pageNumbers.push(currentPage);
    }
    
    if (currentPage < totalPages - 4) {
      pageNumbers.push('...');
    }
    
    pageNumbers.push(67);
    pageNumbers.push(68);
  }

  return (
    <div className="tickets-container">
      <h1>All Tickets</h1>
      
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-button">
          <span className="search-icon">⌕</span>
        </button>
      </div>
      
      <div className="filters-section">
        <div className="filter-by">
          <span>Filter by:</span>
          <div className="dropdown">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option>Category</option>
              <option>Hardware</option>
              <option>Software</option>
              <option>Network</option>
            </select>
          </div>
          
          <div className="dropdown">
            <select value={subCategoryFilter} onChange={(e) => setSubCategoryFilter(e.target.value)}>
              <option>Sub Category</option>
              <option>Printer Issues</option>
              <option>Wi-Fi</option>
              <option>Memory</option>
              <option>Reporting</option>
            </select>
          </div>
          
          <div className="dropdown">
            <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
              <option>Department</option>
              <option>IT Department</option>
              <option>Operations</option>
              <option>Finance & Budgeting</option>
            </select>
          </div>
          
          <div className="dropdown">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
        
        <div className="sort-by">
          <span>Sort by:</span>
          <div className="dropdown">
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option>Sort Order</option>
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Priority High-Low</option>
              <option>Priority Low-High</option>
            </select>
          </div>
          
          <div className="dropdown">
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option>Date</option>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Custom Range</option>
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
            </tr>
          </thead>
          <tbody>
            {ticketsData.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.department}</td>
                <td>{ticket.category}</td>
                <td>{ticket.subCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination-container">
        <div className="items-per-page">
          <span>Show</span>
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>items per page</span>
        </div>
        
        <div className="pagination">
          <button className="pagination-arrow prev" disabled={currentPage === 1}>
            <span>◄ Previous</span>
          </button>
          
          {pageNumbers.map((num, index) => (
            <button 
              key={index} 
              className={`pagination-number ${num === currentPage ? 'active' : ''} ${num === '...' ? 'ellipsis' : ''}`}
              onClick={() => num !== '...' && setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
          
          <button className="pagination-arrow next" disabled={currentPage === totalPages}>
            <span>Next ►</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketManagementAllTickets;