// agentStorage.js

export const AGENT_STORAGE_KEY = 'agents';

const sampleAgents = [
  {
    id: 'AGT-001',
    name: 'Jane Doe',
    email: 'jane.doe@company.com',
    department: 'IT Department',
    role: 'Ticket Agent',
    status: 'Active',
    dateAssigned: '2025-05-20T09:00:00Z'
  },
  {
    id: 'AGT-002',
    name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'Asset Department',
    role: 'Ticket Agent',
    status: 'Active',
    dateAssigned: '2025-05-22T10:15:00Z'
  },
  {
    id: 'AGT-003',
    name: 'Clara Reyes',
    email: 'clara.reyes@company.com',
    department: 'Budget Department',
    role: 'Ticket Agent',
    status: 'Active',
    dateAssigned: '2025-05-21T14:30:00Z'
  }
];

export const getAgents = () => {
  const data = localStorage.getItem(AGENT_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveAgents = (agents) => {
  localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(agents));
};

// Initialize mock data only if empty
if (!localStorage.getItem(AGENT_STORAGE_KEY)) {
  saveAgents(sampleAgents);
}
