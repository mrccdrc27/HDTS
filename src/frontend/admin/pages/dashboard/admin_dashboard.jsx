import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample tickets data
const sampleTickets = [
  {
    ticketNumber: 'TCK-001',
    subject: 'VPN setup request',
    status: 'Submitted', 
    priorityLevel: 'Medium',
    department: 'IT Department',
    category: 'IT Category',
    subCategory: 'Technical Support & Troubleshooting',
    dateCreated: '2025-06-08T08:00:00Z',
    lastUpdated: '2025-06-08T08:00:00Z',
    createdBy: { userId: 'U001', role: 'User', name: 'Bonjing San Jose' }
  },
  {
    ticketNumber: 'TCK-002',
    subject: 'Monitor not turning on',
    status: 'Open',
    priorityLevel: 'High',
    department: 'Asset Department',
    category: 'Asset Category',
    subCategory: 'Asset Repair',
    dateCreated: '2025-06-01T09:15:00Z',
    lastUpdated: '2025-06-01T09:30:00Z',
    createdBy: { userId: 'U004', role: 'User', name: 'Alyssa Navarro' }
  },
  {
    ticketNumber: 'TCK-003',
    subject: 'Software update request',
    status: 'On Progress',
    priorityLevel: 'Low',
    department: 'IT Department',
    category: 'IT Category',
    subCategory: 'System Maintenance',
    dateCreated: '2025-05-31T14:00:00Z',
    lastUpdated: '2025-06-01T10:45:00Z',
    createdBy: { userId: 'U008', role: 'User', name: 'Joshua Tan' }
  },
  {
    ticketNumber: 'TCK-004',
    subject: 'Cloud service outage report',
    status: 'On Hold',
    priorityLevel: 'Critical',
    department: 'Budget Department',
    category: 'Budget Category',
    subCategory: 'Cloud Services',
    dateCreated: '2025-05-30T10:30:00Z',
    lastUpdated: '2025-06-01T08:30:00Z',
    createdBy: { userId: 'U001', role: 'User', name: 'Bonjing San Jose' }
  },
  {
    ticketNumber: 'TCK-005',
    subject: 'Request for training budget',
    status: 'Pending',
    priorityLevel: 'Medium',
    department: 'Budget Department',
    category: 'Budget Category',
    subCategory: 'Training & Certifications',
    dateCreated: '2025-05-29T12:45:00Z',
    lastUpdated: '2025-05-31T09:00:00Z',
    createdBy: { userId: 'U014', role: 'User', name: 'Luis Ramos' }
  },
  {
    ticketNumber: 'TCK-006',
    subject: 'Asset request rejected',
    status: 'Rejected',
    priorityLevel: 'Low',
    department: 'Asset Department',
    category: 'Asset Category',
    subCategory: 'Asset Check-out',
    dateCreated: '2025-05-28T08:00:00Z',
    lastUpdated: '2025-05-28T16:30:00Z',
    createdBy: { userId: 'U004', role: 'User', name: 'Alyssa Navarro' }
  },
  {
    ticketNumber: 'TCK-007',
    subject: 'Withdrawal of asset request',
    status: 'Withdrawn',
    priorityLevel: 'Low',
    department: 'Asset Department',
    category: 'Asset Category',
    subCategory: 'Asset Check-out',
    dateCreated: '2025-05-27T13:30:00Z',
    lastUpdated: '2025-05-27T15:00:00Z',
    createdBy: { userId: 'U008', role: 'User', name: 'Joshua Tan' }
  },
  {
    ticketNumber: 'TCK-008',
    subject: 'License renewal completed',
    status: 'Resolved',
    priorityLevel: 'High',
    department: 'Budget Department',
    category: 'Budget Category',
    subCategory: 'Software Subscriptions',
    dateCreated: '2025-05-26T11:00:00Z',
    lastUpdated: '2025-05-30T17:30:00Z',
    createdBy: { userId: 'U001', role: 'User', name: 'Bonjing San Jose' }
  },
  {
    ticketNumber: 'TCK-009',
    subject: 'Old asset returned',
    status: 'Closed',
    priorityLevel: 'Low',
    department: 'Asset Department',
    category: 'Asset Category',
    subCategory: 'Asset Check-in',
    dateCreated: '2025-05-25T10:20:00Z',
    lastUpdated: '2025-05-26T14:45:00Z',
    createdBy: { userId: 'U014', role: 'User', name: 'Luis Ramos' }
  }
];

// Storage functions (in-memory storage for this demo)
let ticketsStorage = [...sampleTickets];

const getTickets = () => {
  return ticketsStorage;
};

const AdminDashboard = () => {
  const [ticketStats, setTicketStats] = useState({
    new: 0,
    pending: 0,
    open: 0,
    onProgress: 0,
    onHold: 0,
    resolved: 0,
    total: 0
  });

  const [approvalRequests, setApprovalRequests] = useState([]);
  const [statusChartData, setStatusChartData] = useState([]);
  const [priorityChartData, setPriorityChartData] = useState([]);

  // Chart colors
  const STATUS_COLORS = {
    'New/Submitted': '#17a2b8',
    'Open': '#28a745',
    'On Progress': '#ffc107',
    'On Hold': '#6c757d',
    'Pending': '#fd7e14',
    'Resolved': '#dc3545',
    'Closed': '#343a40',
    'Rejected': '#e83e8c',
    'Withdrawn': '#6f42c1'
  };

  const PRIORITY_COLORS = {
    'Critical': '#dc3545',
    'High': '#fd7e14',
    'Medium': '#ffc107',
    'Low': '#28a745'
  };

  // Calculate ticket statistics and chart data from real data
  const calculateTicketStats = () => {
    const tickets = getTickets();
    
    const stats = {
      new: tickets.filter(ticket => ticket.status === 'New' || ticket.status === 'Submitted').length,
      pending: tickets.filter(ticket => ticket.status === 'Pending').length,
      open: tickets.filter(ticket => ticket.status === 'Open').length,
      onProgress: tickets.filter(ticket => ticket.status === 'On Progress').length,
      onHold: tickets.filter(ticket => ticket.status === 'On Hold').length,
      resolved: tickets.filter(ticket => ticket.status === 'Resolved').length,
      total: tickets.length
    };

    setTicketStats(stats);
    
    // Prepare status chart data
    const statusData = [];
    const statusCounts = {};
    
    tickets.forEach(ticket => {
      const status = ticket.status === 'New' || ticket.status === 'Submitted' ? 'New/Submitted' : ticket.status;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    Object.entries(statusCounts).forEach(([status, count]) => {
      statusData.push({
        name: status,
        value: count,
        color: STATUS_COLORS[status] || '#666'
      });
    });
    
    setStatusChartData(statusData);
    
    // Prepare priority chart data
    const priorityCounts = {};
    tickets.forEach(ticket => {
      priorityCounts[ticket.priorityLevel] = (priorityCounts[ticket.priorityLevel] || 0) + 1;
    });
    
    const priorityData = Object.entries(priorityCounts).map(([priority, count]) => ({
      name: priority,
      value: count,
      color: PRIORITY_COLORS[priority] || '#666'
    }));
    
    setPriorityChartData(priorityData);
    
    // Get tickets that need approval (for the new tickets table)
    const pendingTickets = tickets.filter(ticket => 
      ticket.status === 'Submitted' || 
      ticket.status === 'New' || 
      ticket.status === 'Pending'
    ).map(ticket => ({
      id: ticket.ticketNumber,
      subject: ticket.subject,
      createdBy: ticket.createdBy.name,
      category: ticket.category,
      subCategory: ticket.subCategory,
      scheduledRequest: 'N/A',
      dateCreated: new Date(ticket.dateCreated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }));
    
    setApprovalRequests(pendingTickets);
  };

  // Simulate status updates for demo purposes
  const simulateStatusUpdates = () => {
    const statuses = ['Open', 'On Progress', 'Pending', 'On Hold', 'Resolved', 'Closed'];
    const randomIndex = Math.floor(Math.random() * ticketsStorage.length);
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    ticketsStorage[randomIndex].status = randomStatus;
    ticketsStorage[randomIndex].lastUpdated = new Date().toISOString();
    
    calculateTicketStats();
  };

  useEffect(() => {
    // Calculate initial stats
    calculateTicketStats();
    
    // Set up interval to refresh data every 10 seconds (for demo)
    const interval = setInterval(simulateStatusUpdates, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const handleManageApprovals = () => {
    alert('Navigate to ticket management page');
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Dashboard Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#333',
          margin: 0 
        }}>
          Welcome <span style={{ color: '#007bff' }}>Bogart</span>,
        </h1>
      </div>

      {/* Ticket Status Cards - New Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 200px',
        gridTemplateRows: '1fr 1fr',
        gap: '20px',
        marginBottom: '40px',
        height: '200px'
      }}>
        {/* Row 1: New Tickets */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '3px solid #17a2b8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 10px 0', 
            color: '#333' 
          }}>
            {ticketStats.new.toString().padStart(2, '0')}
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#17a2b8', 
            fontWeight: 'bold' 
          }}>
            New Tickets
          </p>
        </div>
        
        {/* Row 1: Pending Tickets */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '3px solid #fd7e14',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 10px 0', 
            color: '#333' 
          }}>
            {ticketStats.pending.toString().padStart(2, '0')}
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#fd7e14', 
            fontWeight: 'bold' 
          }}>
            Pending Tickets
          </p>
        </div>
        
        {/* Row 1: Open Tickets */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '3px solid #28a745',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 10px 0', 
            color: '#333' 
          }}>
            {ticketStats.open.toString().padStart(2, '0')}
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#28a745', 
            fontWeight: 'bold' 
          }}>
            Open
          </p>
        </div>
        
        {/* Total Tickets - Spanning both rows */}
        <div style={{
          backgroundColor: '#007bff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
          color: 'white',
          gridRow: '1 / 3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            margin: '0 0 10px 0' 
          }}>
            {ticketStats.total.toString().padStart(2, '0')}
          </h2>
          <p style={{ 
            margin: 0, 
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            Total Tickets
          </p>
        </div>
        
        {/* Row 2: On Progress */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '3px solid #ffc107',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 10px 0', 
            color: '#333' 
          }}>
            {ticketStats.onProgress.toString().padStart(2, '0')}
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#ffc107', 
            fontWeight: 'bold' 
          }}>
            On Progress
          </p>
        </div>
        
        {/* Row 2: On Hold */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '3px solid #6c757d',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 10px 0', 
            color: '#333' 
          }}>
            {ticketStats.onHold.toString().padStart(2, '0')}
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#6c757d', 
            fontWeight: 'bold' 
          }}>
            On Hold
          </p>
        </div>
        
        {/* Row 2: Resolved */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '3px solid #dc3545',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 10px 0', 
            color: '#333' 
          }}>
            {ticketStats.resolved.toString().padStart(2, '0')}
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#dc3545', 
            fontWeight: 'bold' 
          }}>
            Resolved
          </p>
        </div>
      </div>

      {/* Charts Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {/* Ticket Status Distribution Chart */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 25px 0', 
            color: '#333',
            fontSize: '1.4rem',
            fontWeight: 'bold'
          }}>
            Ticket Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Priority Level Distribution Chart */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 25px 0', 
            color: '#333',
            fontSize: '1.4rem',
            fontWeight: 'bold'
          }}>
            Priority Level Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {priorityChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* New Tickets Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '40px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#333',
            fontSize: '1.8rem',
            fontWeight: 'bold'
          }}>
            New Tickets
          </h2>
          <button 
            onClick={handleManageApprovals}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Manage Tickets
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '10px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{
                  padding: '15px 12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  fontSize: '0.95rem'
                }}>
                  Ticket Number
                </th>
                <th style={{
                  padding: '15px 12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  fontSize: '0.95rem'
                }}>
                  Subject
                </th>
                <th style={{
                  padding: '15px 12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  fontSize: '0.95rem'
                }}>
                  Created by
                </th>
                <th style={{
                  padding: '15px 12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  fontSize: '0.95rem'
                }}>
                  Category
                </th>
                <th style={{
                  padding: '15px 12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  fontSize: '0.95rem'
                }}>
                  Sub Category
                </th>
                <th style={{
                  padding: '15px 12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  fontSize: '0.95rem'
                }}>
                  Scheduled Request
                </th>
                <th style={{
                  padding: '15px 12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  fontSize: '0.95rem'
                }}>
                  Date Created
                </th>
              </tr>
            </thead>
            <tbody>
              {approvalRequests.length > 0 ? (
                approvalRequests.map((request, index) => (
                  <tr key={request.id} style={{
                    backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa'
                  }}>
                    <td style={{
                      padding: '15px 12px',
                      borderBottom: '1px solid #dee2e6',
                      fontSize: '0.9rem'
                    }}>
                      {request.id}
                    </td>
                    <td style={{
                      padding: '15px 12px',
                      borderBottom: '1px solid #dee2e6',
                      fontSize: '0.9rem'
                    }}>
                      {request.subject}
                    </td>
                    <td style={{
                      padding: '15px 12px',
                      borderBottom: '1px solid #dee2e6',
                      fontSize: '0.9rem'
                    }}>
                      {request.createdBy}
                    </td>
                    <td style={{
                      padding: '15px 12px',
                      borderBottom: '1px solid #dee2e6',
                      fontSize: '0.9rem'
                    }}>
                      {request.category}
                    </td>
                    <td style={{
                      padding: '15px 12px',
                      borderBottom: '1px solid #dee2e6',
                      fontSize: '0.9rem'
                    }}>
                      {request.subCategory}
                    </td>
                    <td style={{
                      padding: '15px 12px',
                      borderBottom: '1px solid #dee2e6',
                      fontSize: '0.9rem'
                    }}>
                      {request.scheduledRequest}
                    </td>
                    <td style={{
                      padding: '15px 12px',
                      borderBottom: '1px solid #dee2e6',
                      fontSize: '0.9rem'
                    }}>
                      {request.dateCreated}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{
                    padding: '30px',
                    textAlign: 'center',
                    color: '#666',
                    fontStyle: 'italic',
                    fontSize: '1rem'
                  }}>
                    No new tickets available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div style={{
          marginTop: '15px',
          padding: '8px 12px',
          backgroundColor: '#e9ecef',
          borderRadius: '4px',
          fontSize: '0.85rem',
          color: '#6c757d',
          fontStyle: 'italic'
        }}>
          💡 This table shows an overview of new tickets for quick reference
        </div>
      </div>

      {/* Status indicator */}
      <div style={{
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '4px',
        color: '#155724',
        fontSize: '0.9rem'
      }}>
        📊 Dashboard updates automatically every 10 seconds with live ticket data
      </div>
    </div>
  );
};

export default AdminDashboard;