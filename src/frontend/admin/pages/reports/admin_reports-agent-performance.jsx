import React, { useState } from 'react';
import '../../../styles/pages/admin/admin_reports-agent-performance.css';

const ReportsAgentPerformanceReport = () => {
  // For demonstration of filter dropdowns
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSortOrder, setSelectedSortOrder] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1 className="page-title">Ticket Reports</h1>
        <button className="print-button">Print Report</button>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="search-filter-container">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search" 
            className="search-input"
          />
          <div className="search-icon">
            <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="filters-sort-container">
          <div className="filters-container">
            <span className="filter-label">Filter by:</span>
            <div className="select-container">
              <select 
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Category</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="general">General</option>
              </select>
              <div className="select-arrow">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="select-container">
              <select 
                className="filter-select"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
              >
                <option value="">Sub Category</option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="network">Network</option>
              </select>
              <div className="select-arrow">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="select-container">
              <select 
                className="filter-select"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Department</option>
                <option value="it">IT Department</option>
                <option value="finance">Finance Department</option>
                <option value="hr">HR Department</option>
              </select>
              <div className="select-arrow">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="select-container">
              <select 
                className="filter-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Role</option>
                <option value="agent">Agent</option>
                <option value="supervisor">Supervisor</option>
                <option value="manager">Manager</option>
              </select>
              <div className="select-arrow">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="select-container">
              <select 
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <div className="select-arrow">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="sort-container">
            <span className="sort-label">Sort by:</span>
            <div className="select-container">
              <select 
                className="sort-select"
                value={selectedSortOrder}
                onChange={(e) => setSelectedSortOrder(e.target.value)}
              >
                <option value="">Sort Order</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priority">Priority</option>
              </select>
              <div className="select-arrow">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="select-container">
              <select 
                className="sort-select"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">Date</option>
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
              <div className="select-arrow">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area - Empty in the reference image */}
      <div className="reports-content">
        {/* Content would go here - empty as per screenshot */}
      </div>
      
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="pagination-container">
        <div className="items-per-page">
          <span>Show</span>
          <select className="per-page-select">
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>Items per page</span>
        </div>
        
        <div className="pagination-controls">
          <button className="prev-button">
            <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <div className="page-numbers">
            <button className="page-number active">1</button>
            <button className="page-number">2</button>
            <button className="page-number">3</button>
            <span className="ellipsis">...</span>
            <button className="page-number">67</button>
            <button className="page-number">68</button>
          </div>
          
          <button className="next-button">
            Next
            <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAgentPerformanceReport;