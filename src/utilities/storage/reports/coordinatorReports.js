import { getTickets } from '../../storage/ticketStorage';
import { activeTicketCoordinators } from '../../storage/ticketStorage';

// Time filters
const isToday = (date) => new Date(date).toDateString() === new Date().toDateString();

const isThisWeek = (date) => {
  const d = new Date(date);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return d >= startOfWeek && d <= endOfWeek;
};

const isThisMonth = (date) => {
  const d = new Date(date);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

// Metrics
const calculateAverageResponseTime = (tickets) => {
  const totalTime = tickets.reduce((sum, t) => sum + (t.responseTime || 0), 0);
  return tickets.length ? (totalTime / tickets.length).toFixed(2) : '0.00';
};

const calculateSLACompliance = (tickets) => {
  const compliant = tickets.filter(t => t.slaCompliant).length;
  return tickets.length ? ((compliant / tickets.length) * 100).toFixed(0) + '%' : '0%';
};

// Create single coordinator report
const createCoordinatorReport = (coordinator, tickets) => ({
  coordinatorId: coordinator.id,
  name: coordinator.name,
  department: coordinator.department,
  totalTickets: tickets.length,
  statusCounts: tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {}),
  averageResponseTime: calculateAverageResponseTime(tickets),
  slaCompliance: calculateSLACompliance(tickets),
});

// Generate by range
const generate = (range = 'all') => {
  const tickets = getTickets() || [];

  const filterByDate = (ticket) => {
    if (range === 'today') return isToday(ticket.dateCreated);
    if (range === 'week') return isThisWeek(ticket.dateCreated);
    if (range === 'month') return isThisMonth(ticket.dateCreated);
    return true;
  };

  const result = [];

  activeTicketCoordinators.forEach(coordinator => {
    const coordinatorTickets = tickets.filter(
      t => t.handledBy?.id === coordinator.id && filterByDate(t)
    );

    result.push(createCoordinatorReport(coordinator, coordinatorTickets));
  });

  return result;
};

// Final export
export const generateCoordinatorReports = () => ({
  today: generate('today'),
  week: generate('week'),
  month: generate('month'),
  all: generate(),
});
