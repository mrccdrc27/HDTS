// departmentReports.js

import { getTickets } from './ticketStorage';

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
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
  return d >= startOfWeek && d <= endOfWeek;
};

const isThisMonth = (date) => {
  const now = new Date();
  const d = new Date(date);
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

const generate = (range = 'all') => {
  const tickets = getTickets();

  const filterByDate = (ticket) => {
    if (range === 'today') return isToday(ticket.dateCreated);
    if (range === 'thisWeek') return isThisWeek(ticket.dateCreated);
    if (range === 'thisMonth') return isThisMonth(ticket.dateCreated);
    return true;
  };

  const reports = {};

  tickets.filter(filterByDate).forEach(ticket => {
    const { department, status } = ticket;

    if (!reports[department]) {
      reports[department] = {
        total: 0,
        statuses: {}
      };
    }

    reports[department].total += 1;

    if (!reports[department].statuses[status]) {
      reports[department].statuses[status] = 0;
    }

    reports[department].statuses[status] += 1;
  });

  return reports;
};

export const departmentReports = {
  today: generate('today'),
  thisWeek: generate('thisWeek'),
  thisMonth: generate('thisMonth'),
  all: generate()
};
