import React, { useState } from 'react';
import '../../../styles/pages/admin/admin_user-access-all-users.css';

const UserAccessAllUsers = () => {
  // Sample data matching the image
  const [users] = useState([
    { id: 'IT0001', lastName: 'San Jose', firstName: 'Bonjing', middleName: 'Peralta', suffix: 'Jr.', department: 'Finance Department', role: 'Accountant', status: 'active' },
    { id: 'IT0001', lastName: 'San Jose', firstName: 'Bonjing', middleName: 'Peralta', suffix: 'Jr.', department: 'Finance Department', role: 'Accountant', status: 'inactive' },
    { id: 'IT0001', lastName: 'San Jose', firstName: 'Bonjing', middleName: 'Peralta', suffix: 'Jr.', department: 'Finance Department', role: 'Accountant', status: 'pending' }
  ]);

  // For demonstration of filter dropdowns
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  
  return (
    <div className="user-management-container">
      <div className="header-actions">
        <h1 className="page-title">All Users</h1>
        <button 
          className="add-admin-button"
          onClick={() => {
            console.log('Open Add Admin Form');
          }}
        >
          + Add Admin
        </button>
      </div>

      
      {/* Search and Filter Bar */}
      <div className="controls-container">
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
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Department</option>
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
                <option value="accountant">Accountant</option>
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
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
              <select className="sort-select">
                <option>Sort Order</option>
                <option>A-Z</option>
                <option>Z-A</option>
                <option>Newest</option>
                <option>Oldest</option>
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
      
      {/* Users Table */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Company ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Suffix</th>
              <th>Department</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              let statusClass = "";
              if (user.status === "active") statusClass = "status-active";
              else if (user.status === "inactive") statusClass = "status-inactive";
              else if (user.status === "pending") statusClass = "status-pending";
              
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.lastName}</td>
                  <td>{user.firstName}</td>
                  <td>{user.middleName}</td>
                  <td>{user.suffix}</td>
                  <td>{user.department}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={`status-indicator ${statusClass}`}></div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
          <span>items per page</span>
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
      
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default UserAccessAllUsers;