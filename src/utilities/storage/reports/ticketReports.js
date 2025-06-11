// ticketReports.js

import { getTickets } from '../../storage/ticketStorage';

const getWeekIndex = (dateStr) => {
  const date = new Date(dateStr);
  const firstDay = new Date(2025, 0, 1);
  firstDay.setHours(0, 0, 0, 0);
  const day = firstDay.getDay();
  if (day !== 0) firstDay.setDate(firstDay.getDate() - day);

  const diff = date - firstDay;
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
};

const getMonthIndex = (dateStr) => {
  const date = new Date(dateStr);
  return date.getFullYear() === 2025 ? date.getMonth() + 1 : null;
};

const isToday = (dateStr) => {
  const now = new Date();
  const d = new Date(dateStr);
  return d.toDateString() === now.toDateString();
};

const createEmptyReport = () => ({
  total: 0,
  byStatus: {},
  byPriority: {},
});

const generateBlock = (tickets) => {
  const result = createEmptyReport();

  tickets.forEach((ticket) => {
    result.total += 1;

    const status = ticket.status;
    const priority = ticket.priorityLevel;

    if (!result.byStatus[status]) result.byStatus[status] = 0;
    result.byStatus[status] += 1;

    if (!result.byPriority[priority]) result.byPriority[priority] = 0;
    result.byPriority[priority] += 1;
  });

  return result;
};

export const generateTicketReports = () => {
  const tickets = getTickets();
  const grouped = { today: [], all: tickets };

  tickets.forEach((ticket) => {
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
    if (monthIndex) {
      const monthKey = `month-${monthIndex}`;
      if (!grouped[monthKey]) grouped[monthKey] = [];
      grouped[monthKey].push(ticket);
    }
  });

  const summarized = {};
  Object.keys(grouped).forEach((key) => {
    summarized[key] = generateBlock(grouped[key]);
  });

  return summarized;
};
