// ticketReports.js

import { getTickets } from '../../storage/ticketStorage';

// Date range checks
const isToday = (date) => {
  const now = new Date();
  const d = new Date(date);
  return d.toDateString() === now.toDateString();
};

const isThisWeek = (date) => {
  const now = new Date();
  const d = new Date(date);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
  endOfWeek.setHours(23, 59, 59, 999);
  return d >= startOfWeek && d <= endOfWeek;
};

const isThisMonth = (date) => {
  const now = new Date();
  const d = new Date(date);
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

// Generate ticket report for a date range
const generate = (range = 'all') => {
  const tickets = getTickets();

  const filterByDate = (ticket) => {
    if (range === 'today') return isToday(ticket.dateCreated);
    if (range === 'week') return isThisWeek(ticket.dateCreated);
    if (range === 'month') return isThisMonth(ticket.dateCreated);
    return true;
  };

  const result = {
    total: 0,
    byStatus: {},
    byPriority: {},
  };

  tickets.filter(filterByDate).forEach(ticket => {
    result.total += 1;

    const status = ticket.status;
    const priority = ticket.priorityLevel;

    // Count by status
    if (!result.byStatus[status]) result.byStatus[status] = 0;
    result.byStatus[status] += 1;

    // Count by priority
    if (!result.byPriority[priority]) result.byPriority[priority] = 0;
    result.byPriority[priority] += 1;
  });

  return result;
};

// Export structured reports
export const ticketReports = {
  today: generate('today'),
  week: generate('week'),
  month: generate('month'),
  all: generate(),
};

// For use in dynamic report viewer
export const generateTicketReports = () => ({
  today: ticketReports.today,
  week: ticketReports.week,
  month: ticketReports.month,
});
