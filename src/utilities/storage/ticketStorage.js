import tickets from './tickets.json'; // 👈 import your mock data

const TICKETS_KEY = 'tickets';

// ✅ Initialize localStorage with tickets.json (only once)
export function initializeTickets() {
  const existing = localStorage.getItem(TICKETS_KEY);
  if (!existing) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  }
}

// ✅ Get all tickets
export function getTickets() {
  const data = localStorage.getItem(TICKETS_KEY);
  return data ? JSON.parse(data) : [];
}

// ✅ Save tickets
export function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

// ✅ Add a new ticket
export function addTicket(ticket) {
  const current = getTickets();
  current.push(ticket);
  saveTickets(current);
}

// ✅ Update a ticket by ID
export function updateTicket(updatedTicket) {
  const current = getTickets();
  const updated = current.map(ticket =>
    ticket.id === updatedTicket.id ? updatedTicket : ticket
  );
  saveTickets(updated);
}

// ✅ Get a ticket by ID
export function getTicketById(id) {
  return getTickets().find(ticket => ticket.id === id);
}
