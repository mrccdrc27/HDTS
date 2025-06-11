// slaReports.js
import { getTickets } from "../../storage/ticketStorage";

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
  const date = new Date(dateStr);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const generateSLABlock = (tickets) => {
  const total = tickets.length;
  const compliant = tickets.filter((t) => t.slaCompliant).length;
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
  const reports = { today: [], all: tickets };

  tickets.forEach((t) => {
    if (!t.dateCreated) return;
    const dateStr = t.dateCreated;
    const weekIndex = getWeekIndex(dateStr);
    const monthIndex = getMonthIndex(dateStr);

    if (isToday(dateStr)) reports.today.push(t);

    if (weekIndex) {
      const key = `week-${weekIndex}`;
      if (!reports[key]) reports[key] = [];
      reports[key].push(t);
    }

    if (monthIndex) {
      const key = `month-${monthIndex}`;
      if (!reports[key]) reports[key] = [];
      reports[key].push(t);
    }
  });

  // Replace arrays with SLA summary blocks
  Object.keys(reports).forEach((key) => {
    reports[key] = generateSLABlock(reports[key]);
  });

  return reports;
};
