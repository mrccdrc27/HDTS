import { useState, useEffect } from 'react';
import TicketStatusCards from './admin_dashboard-ticket-status-overview';
import ChartsLayout from './admin_dashboard-charts';
import TicketsOverview  from './admin_dashboard-tickets-overview';
import { getTickets } from '../../../../utilities/storage/ticketStorage';

const AdminDashboard = () => {
  // State for chart data
  const [statusChartData, setStatusChartData] = useState([]);
  const [priorityChartData, setPriorityChartData] = useState([]);

  // State for live ticket data
  const [tickets, setTickets] = useState([]);

  // Ticket stats for overview cards
  const ticketStats = {
    new: tickets.filter(t => t.status === 'New' || t.status === 'Submitted').length,
    pending: tickets.filter(t => t.status === 'Pending').length,
    open: tickets.filter(t => t.status === 'Open').length,
    onProgress: tickets.filter(t => t.status === 'On Progress').length,
    onHold: tickets.filter(t => t.status === 'On Hold').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    total: tickets.length
  };

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

  const generateChartData = (ticketList) => {
    const statusCounts = {};
    const priorityCounts = {};

    ticketList.forEach(ticket => {
      const status = ticket.status === 'New' || ticket.status === 'Submitted' ? 'New/Submitted' : ticket.status;
      statusCounts[status] = (statusCounts[status] || 0) + 1;

      const priority = ticket.priorityLevel;
      priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;
    });

    const statusData = Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
      color: STATUS_COLORS[status] || '#666'
    }));

    const priorityData = Object.entries(priorityCounts).map(([priority, count]) => ({
      name: priority,
      value: count,
      color: PRIORITY_COLORS[priority] || '#666'
    }));

    setStatusChartData(statusData);
    setPriorityChartData(priorityData);
  };

  useEffect(() => {
    const fetchData = () => {
      const latestTickets = getTickets();
      setTickets(latestTickets);
      generateChartData(latestTickets);
    };

    fetchData();

    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', margin: 0 }}>
          Welcome, <span style={{ color: '#007bff' }}>Sino ka man</span>
        </h1>
      </div>

      <TicketStatusCards ticketStats={ticketStats} />

      <ChartsLayout
        statusChartData={statusChartData}
        priorityChartData={priorityChartData}
      />

      <TicketsOverview />

    </div>
  );
};

export default AdminDashboard;
