// ticketStorage.js

export const TICKET_STORAGE_KEY = 'tickets';

// Aligned ticket statuses for system
export const ticketStatuses = [
  'Submitted', // Default for Users (submitted ticket)
  'New',       // Default for Admins (new ticket)
  'Open',
  'On Progress',
  'On Hold',
  'Resolved',
  'Closed',
  'Rejected',
  'Withdrawn',
];

// Sample tickets with createdBy referencing users with role 'User'
const sampleTickets = [
  {
    ticketNumber: 'TCK-001',
    subject: 'VPN setup request',
    status: 'Submitted', 
    priorityLevel: 'Medium',
    department: 'IT Department',
    category: 'IT Category',
    subCategory: 'Technical Support & Troubleshooting',
    dateCreated: '2025-06-08T08:00:00Z',
    lastUpdated: '2025-06-08T08:00:00Z',
    fileUploaded: null,
    description: 'Need help setting up VPN on my laptop.',
    scheduledRequest: null,
    assignedTo: {
      id: 'AGT-001',
      name: 'Jane Doe'
    },
    createdBy: {
      userId: 'U001',
      role: 'User',
      name: 'Bonjing San Jose'
    }
  },
  {
    ticketNumber: 'TCK-002',
    subject: 'Monitor not turning on',
    status: 'Open',
    priorityLevel: 'High',
    department: 'Asset Department',
    category: 'Asset Category',
    subCategory: 'Asset Repair',
    dateCreated: '2025-06-01T09:15:00Z',
    lastUpdated: '2025-06-01T09:30:00Z',
    fileUploaded: 'monitor-issue.jpg',
    description: 'Office monitor stopped working after a power outage.',
    scheduledRequest: null,
    assignedTo: {
      id: 'AGT-002',
      name: 'John Smith'
    },
    createdBy: {
      userId: 'U004',
      role: 'User',
      name: 'Alyssa Navarro'
    }
  },
  {
    ticketNumber: 'TCK-003',
    subject: 'Software update request',
    status: 'On Progress',
    priorityLevel: 'Low',
    department: 'IT Department',
    category: 'IT Category',
    subCategory: 'System Maintenance',
    dateCreated: '2025-05-31T14:00:00Z',
    lastUpdated: '2025-06-01T10:45:00Z',
    fileUploaded: null,
    description: 'Requesting update to the latest version of MS Teams.',
    scheduledRequest: null,
    assignedTo: {
      id: 'AGT-001',
      name: 'Jane Doe'
    },
    createdBy: {
      userId: 'U008',
      role: 'User',
      name: 'Joshua Tan'
    }
  },
  {
    ticketNumber: 'TCK-004',
    subject: 'Cloud service outage report',
    status: 'On Hold',
    priorityLevel: 'Critical',
    department: 'Budget Department',
    category: 'Budget Category',
    subCategory: 'Cloud Services',
    dateCreated: '2025-05-30T10:30:00Z',
    lastUpdated: '2025-06-01T08:30:00Z',
    fileUploaded: 'cloud-outage-report.pdf',
    description: 'Cloud backups failed last night due to outage.',
    scheduledRequest: null,
    assignedTo: {
      id: 'AGT-003',
      name: 'Clara Reyes'
    },
    createdBy: {
      userId: 'U001',
      role: 'User',
      name: 'Bonjing San Jose'
    }
  },
  {
    ticketNumber: 'TCK-005',
    subject: 'Request for training budget',
    status: 'Pending', // User default; Admin will see 'New'
    priorityLevel: 'Medium',
    department: 'Budget Department',
    category: 'Budget Category',
    subCategory: 'Training & Certifications',
    dateCreated: '2025-05-29T12:45:00Z',
    lastUpdated: '2025-05-31T09:00:00Z',
    fileUploaded: null,
    description: 'Need approval for AWS cloud certification course.',
    scheduledRequest: null,
    assignedTo: {
      id: 'AGT-003',
      name: 'Clara Reyes'
    },
    createdBy: {
      userId: 'U014',
      role: 'User',
      name: 'Luis Ramos'
    }
  },
  {
    ticketNumber: 'TCK-006',
    subject: 'Asset request rejected',
    status: 'Rejected',
    priorityLevel: 'Low',
    department: 'Asset Department',
    category: 'Asset Category',
    subCategory: 'Asset Check-out',
    dateCreated: '2025-05-28T08:00:00Z',
    lastUpdated: '2025-05-28T16:30:00Z',
    fileUploaded: null,
    description: 'Request for a second monitor was declined.',
    scheduledRequest: null,
    assignedTo: {
      id: 'AGT-002',
      name: 'John Smith'
    },
    createdBy: {
      userId: 'U004',
      role: 'User',
      name: 'Alyssa Navarro'
    }
  },
  {
    ticketNumber: 'TCK-007',
    subject: 'Withdrawal of asset request',
    status: 'Withdrawn',
    priorityLevel: 'Low',
    department: 'Asset Department',
    category: 'Asset Category',
    subCategory: 'Asset Check-out',
    dateCreated: '2025-05-27T13:30:00Z',
    lastUpdated: '2025-05-27T15:00:00Z',
    fileUploaded: null,
    description: 'User canceled request for an external keyboard.',
    scheduledRequest: null,
    assignedTo: {
      id: 'AGT-002',
      name: 'John Smith'
    },
    createdBy: {
      userId: 'U008',
      role: 'User',
      name: 'Joshua Tan'
    }
  },
  {
    ticketNumber: 'TCK-008',
    subject: 'License renewal completed',
    status: 'Resolved',
    priorityLevel: 'High',
    department: 'Budget Department',
    category: 'Budget Category',
    subCategory: 'Software Subscriptions',
    dateCreated: '2025-05-26T11:00:00Z',
    lastUpdated: '2025-05-30T17:30:00Z',
    fileUploaded: 'renewal-confirmation.pdf',
    description: 'Annual license for Zoom has been renewed.',
    scheduledRequest: null,
    assignedTo: {
      id: 'AGT-003',
      name: 'Clara Reyes'
    },
    createdBy: {
      userId: 'U001',
      role: 'User',
      name: 'Bonjing San Jose'
    }
  },
  {
    ticketNumber: 'TCK-009',
    subject: 'Old asset returned',
    status: 'Closed',
    priorityLevel: 'Low',
    department: 'Asset Department',
    category: 'Asset Category',
    subCategory: 'Asset Check-in',
    dateCreated: '2025-05-25T10:20:00Z',
    lastUpdated: '2025-05-26T14:45:00Z',
    fileUploaded: null,
    description: 'Laptop returned after resignation.',
    scheduledRequest: null,
    assignedTo: {
      id: 'AGT-002',
      name: 'John Smith'
    },
    createdBy: {
      userId: 'U014',
      role: 'User',
      name: 'Luis Ramos'
    }
  },
  {
}

  

];

export const getTickets = () => {
  const data = localStorage.getItem(TICKET_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTickets = (tickets) => {
  localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(tickets));
};

export const getTicketByNumber = (ticketNumber) => {
  const tickets = getTickets();
  return tickets.find(ticket => ticket.ticketNumber === ticketNumber) || null;
};

// Initialize mock data only if empty
if (!localStorage.getItem(TICKET_STORAGE_KEY)) {
  saveTickets(sampleTickets);
}

// Remove below lines after initial data load confirmed
// localStorage.removeItem(TICKET_STORAGE_KEY);
// saveTickets(sampleTickets);
