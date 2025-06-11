import { getTickets } from '../../storage/ticketStorage';

// Utility date checks
const isToday = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const getWeekIndex = (dateStr) => {
  const date = new Date(dateStr);
  const base = new Date(2025, 0, 1); // Jan 1, 2025
  const diffTime = date - base;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor((diffDays + base.getDay()) / 7) + 1;
};

const getMonthIndex = (dateStr) => {
  const date = new Date(dateStr);
  return date.getMonth() + 1; // 1-based index
};

// Aggregates tickets by department and status
const generateReportByDepartment = (tickets) => {
  const reports = {};

  tickets.forEach(({ department, status }) => {
    if (!department) return;

    if (!reports[department]) {
      reports[department] = {
        totalTickets: 0,
        statusCounts: {}
      };
    }

    reports[department].totalTickets += 1;
    reports[department].statusCounts[status] = (reports[department].statusCounts[status] || 0) + 1;
  });

  return reports;
};

export const generateDepartmentReports = () => {
  const tickets = getTickets();
  const grouped = {
    today: [],
  };

  tickets.forEach(ticket => {
    if (!ticket.dateCreated) return;

    const dateStr = ticket.dateCreated;

    // Today
    if (isToday(dateStr)) grouped.today.push(ticket);

    // Weekly
    const weekIndex = getWeekIndex(dateStr);
    const weekKey = `week-${weekIndex}`;
    if (!grouped[weekKey]) grouped[weekKey] = [];
    grouped[weekKey].push(ticket);

    // Monthly
    const monthIndex = getMonthIndex(dateStr);
    const monthKey = `month-${monthIndex}`;
    if (!grouped[monthKey]) grouped[monthKey] = [];
    grouped[monthKey].push(ticket);
  });

  // Convert arrays to summary reports
  const summarized = {};
  Object.keys(grouped).forEach(key => {
    summarized[key] = generateReportByDepartment(grouped[key]);
  });

  return summarized;
};
