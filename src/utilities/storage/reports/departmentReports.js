import { getTickets } from '../../storage/ticketStorage';

// Time filters
const isToday = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isThisWeek = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
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

// Creates a summary block for each department
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

// Filters tickets based on time range
const generateDepartmentReportsForRange = (range = 'all') => {
  const tickets = getTickets();

  const filteredTickets = tickets.filter(ticket => {
    if (!ticket.dateCreated) return false;
    if (range === 'today') return isToday(ticket.dateCreated);
    if (range === 'week') return isThisWeek(ticket.dateCreated);
    if (range === 'month') return isThisMonth(ticket.dateCreated);
    return true;
  });

  return generateReportByDepartment(filteredTickets);
};

// ✅ Export as a function that returns an object
export const generateDepartmentReports = () => ({
  today: generateDepartmentReportsForRange('today'),
  week: generateDepartmentReportsForRange('week'),
  month: generateDepartmentReportsForRange('month'),
  all: generateDepartmentReportsForRange('all'),
});
