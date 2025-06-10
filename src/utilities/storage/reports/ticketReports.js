// ticketReports.js
import { getTickets } from '../../storage/ticketStorage';

// Helper to get start of today (00:00 UTC)
const getTodayStart = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
};

// Helper to get start of the week (Sunday) for given date (00:00 UTC)
const getWeekStart = (date) => {
  const day = date.getUTCDay(); // 0=Sunday
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - day));
};

// Helper to get start of month (1st day) (00:00 UTC)
const getMonthStart = (date) => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
};

// Get tickets from localStorage via your getter
const tickets = getTickets();

const todayStart = getTodayStart();
const tomorrowStart = new Date(todayStart);
tomorrowStart.setUTCDate(tomorrowStart.getUTCDate() + 1);

const weekStart = getWeekStart(todayStart);
const monthStart = getMonthStart(todayStart);

// Filter tickets created **today**
export const todayTickets = tickets.filter(ticket => {
  const d = new Date(ticket.dateCreated);
  return d >= todayStart && d < tomorrowStart;
});

// Filter tickets created **this week** (from Sunday start of week to today)
export const weeklyTickets = tickets.filter(ticket => {
  const d = new Date(ticket.dateCreated);
  return d >= weekStart && d < tomorrowStart;
});

// Filter tickets created **this month** (from first of month to today)
export const monthlyTickets = tickets.filter(ticket => {
  const d = new Date(ticket.dateCreated);
  return d >= monthStart && d < tomorrowStart;
});
