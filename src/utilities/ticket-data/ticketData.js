import { generateTicketNumber } from "./generateTicketNumber.js";

// Key used in localStorage
const STORAGE_KEY = 'activeTickets';

// Allowed statuses
const TICKET_STATUSES = [
  'Submitted',
  'Approved/Open',
  'Pending',
  'On Progress',
  'On Hold',
  'Resolved',
  'Closed',
];

// Mock tickets (1 per status)
const mockActiveTickets = [
  {
    number: 'TICKET-20250510-0001',
    subject: 'Email not working',
    category: 'Software',
    subCategory: 'Email',
    description: 'Unable to send or receive emails',
    scheduleDate: '2025-05-11',
    files: [],
    status: 'Submitted',
    dateCreated: '2025-05-10T08:00:00Z',
    lastUpdated: '2025-05-10T08:00:00Z',
  },
  {
    number: 'TICKET-20250510-0002',
    subject: 'Request for Laptop',
    category: 'Hardware',
    subCategory: 'Laptop',
    description: 'Need new laptop for new employee',
    scheduleDate: '2025-05-12',
    files: [],
    status: 'Approved/Open',
    dateCreated: '2025-05-09T09:00:00Z',
    lastUpdated: '2025-05-10T10:00:00Z',
  },
  {
    number: 'TICKET-20250510-0003',
    subject: 'Budget Approval Delay',
    category: 'Finance',
    subCategory: 'Budget',
    description: 'Pending approval for Q2 budget',
    scheduleDate: '2025-05-15',
    files: [],
    status: 'Pending',
    dateCreated: '2025-05-08T11:30:00Z',
    lastUpdated: '2025-05-09T08:00:00Z',
  },
  {
    number: 'TICKET-20250510-0004',
    subject: 'Software Installation',
    category: 'Software',
    subCategory: 'MS Office',
    description: 'Installing Microsoft Office 365',
    scheduleDate: '2025-05-14',
    files: [],
    status: 'On Progress',
    dateCreated: '2025-05-07T14:00:00Z',
    lastUpdated: '2025-05-10T10:30:00Z',
  },
  {
    number: 'TICKET-20250510-0005',
    subject: 'VPN Access Issue',
    category: 'Network',
    subCategory: 'VPN',
    description: 'User unable to connect to VPN',
    scheduleDate: '2025-05-16',
    files: [],
    status: 'On Hold',
    dateCreated: '2025-05-06T07:00:00Z',
    lastUpdated: '2025-05-09T16:00:00Z',
  },
  {
    number: 'TICKET-20250510-0006',
    subject: 'Printer Setup',
    category: 'Hardware',
    subCategory: 'Printer',
    description: 'New printer setup for admin office',
    scheduleDate: '2025-05-13',
    files: [],
    status: 'Resolved',
    dateCreated: '2025-05-05T10:15:00Z',
    lastUpdated: '2025-05-10T12:00:00Z',
  },
  {
    number: 'TICKET-20250510-0007',
    subject: 'User Offboarding',
    category: 'HR',
    subCategory: 'Employee Exit',
    description: 'Terminate access for resigned employee',
    scheduleDate: '2025-05-11',
    files: [],
    status: 'Closed',
    dateCreated: '2025-05-04T09:00:00Z',
    lastUpdated: '2025-05-10T09:30:00Z',
  },
];

// Save tickets to localStorage
const saveTickets = (tickets = mockActiveTickets) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  console.log('✅ Tickets saved to localStorage:', tickets);
};

// Load tickets from localStorage
const loadTickets = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  console.log('📥 Loaded tickets from localStorage:', saved);
  return saved ? JSON.parse(saved) : [...mockActiveTickets];
};

// Add a new ticket from form input
const addTicket = (formData) => {
  const now = new Date().toISOString();

  const newTicket = {
    number: generateTicketNumber(),
    subject: formData.subject || '',
    category: formData.category || '',
    subCategory: formData.subCategory || '',
    description: formData.description || '',
    scheduleDate: formData.scheduleDate || '',
    files: Array.isArray(formData.files)
      ? formData.files.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
        }))
      : [],
    status: 'Submitted',
    dateCreated: now,
    lastUpdated: now,
  };

  const tickets = loadTickets();
  const updatedTickets = [...tickets, newTicket];
  saveTickets(updatedTickets);

  console.log('🆕 New ticket added:', newTicket);
};

// Update status of ticket
const updateTicketStatus = (ticketNumber, newStatus) => {
  if (!TICKET_STATUSES.includes(newStatus)) {
    console.error(`❌ Invalid status: ${newStatus}. Allowed: ${TICKET_STATUSES.join(', ')}`);
    return;
  }

  const tickets = loadTickets();
  const updatedTickets = tickets.map(ticket =>
    ticket.number === ticketNumber
      ? { ...ticket, status: newStatus, lastUpdated: new Date().toISOString() }
      : ticket
  );

  saveTickets(updatedTickets);
  console.log(`✅ Updated status for ${ticketNumber} to ${newStatus}`);
};

export {
  saveTickets,
  loadTickets,
  addTicket,
  updateTicketStatus,
  TICKET_STATUSES,
};
