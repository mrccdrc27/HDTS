// slaReports.js
import { getTickets } from "../../storage/ticketStorage";

const isToday = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isThisWeek = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return date >= startOfWeek && date <= endOfWeek;
};

const isThisMonth = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
};

const generateSLABlock = (tickets) => {
  const total = tickets.length;
  const compliant = tickets.filter(t => t.slaCompliant).length;
  const nonCompliant = total - compliant;
  const complianceRate = total ? ((compliant / total) * 100).toFixed(2) : '0.00';
  const avgResponseTime = total
    ? (tickets.reduce((sum, t) => sum + (t.responseTime || 0), 0) / total).toFixed(2)
    : '0.00';

  return {
    totalTickets: total,
    compliantTickets: compliant,
    nonCompliantTickets: nonCompliant,
    slaComplianceRate: complianceRate + '%',
    averageResponseTime: avgResponseTime,
  };
};

export const generateSLAComplianceReports = () => {
  const tickets = getTickets();

  const todayTickets = tickets.filter(t => isToday(t.dateCreated));
  const weekTickets = tickets.filter(t => isThisWeek(t.dateCreated));
  const monthTickets = tickets.filter(t => isThisMonth(t.dateCreated));

  return {
    today: generateSLABlock(todayTickets),
    week: generateSLABlock(weekTickets),
    month: generateSLABlock(monthTickets),
    allTime: generateSLABlock(tickets),
  };
};
