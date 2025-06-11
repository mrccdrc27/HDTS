import { getTickets, activeTicketCoordinators } from '../../storage/ticketStorage';

// Helpers
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

const calculateAverageResponseTime = (tickets) => {
  const totalTime = tickets.reduce((sum, t) => sum + (t.responseTime || 0), 0);
  return tickets.length ? (totalTime / tickets.length).toFixed(2) : '0.00';
};

const calculateSLACompliance = (tickets) => {
  const compliant = tickets.filter(t => t.slaCompliant).length;
  return tickets.length ? ((compliant / tickets.length) * 100).toFixed(0) + '%' : '0%';
};

const createCoordinatorBlock = (tickets) => {
  return activeTicketCoordinators.map((coordinator) => {
    const coordinatorTickets = tickets.filter(
      t => t.handledBy?.id === coordinator.id
    );

    return {
      coordinatorId: coordinator.id,
      name: coordinator.name,
      department: coordinator.department,
      totalTickets: coordinatorTickets.length,
      statusCounts: coordinatorTickets.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      }, {}),
      averageResponseTime: calculateAverageResponseTime(coordinatorTickets),
      slaCompliance: calculateSLACompliance(coordinatorTickets),
    };
  });
};

export const generateCoordinatorReports = () => {
  const tickets = getTickets() || [];
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

  Object.keys(reports).forEach((key) => {
    reports[key] = createCoordinatorBlock(reports[key]);
  });

  return reports;
};
