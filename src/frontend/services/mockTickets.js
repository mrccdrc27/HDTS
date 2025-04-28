const mockTickets = [
    // Tickets for Alice (employee ID 1)
    {
      id: 1,
      userId: 1,
      subject: "Unable to access email",
      category: "IT",
      subCategory: "Email",
      department: "IT",
      status: "Open",
      createdAt: "2025-04-20T09:00:00Z",
      lastUpdated: "2025-04-21T10:00:00Z",
    },
    {
      id: 2,
      userId: 1,
      subject: "Laptop not booting",
      category: "Hardware",
      subCategory: "Laptop",
      department: "IT",
      status: "On Hold",
      createdAt: "2025-04-19T08:30:00Z",
      lastUpdated: "2025-04-20T09:00:00Z",
    },
    {
      id: 3,
      userId: 1,
      subject: "VPN connectivity issue",
      category: "Network",
      subCategory: "VPN",
      department: "IT",
      status: "Closed",
      createdAt: "2025-04-18T10:15:00Z",
      lastUpdated: "2025-04-19T12:00:00Z",
    },
  
    // Tickets for Bob (employee ID 2)
    {
      id: 4,
      userId: 2,
      subject: "Payroll discrepancy",
      category: "HR",
      subCategory: "Payroll",
      department: "HR",
      status: "Pending",
      createdAt: "2025-04-22T13:00:00Z",
      lastUpdated: "2025-04-23T09:30:00Z",
    },
    {
      id: 5,
      userId: 2,
      subject: "Leave balance incorrect",
      category: "HR",
      subCategory: "Leave",
      department: "HR",
      status: "Rejected",
      createdAt: "2025-04-17T11:00:00Z",
      lastUpdated: "2025-04-18T08:00:00Z",
    },
    {
      id: 6,
      userId: 2,
      subject: "System login issue",
      category: "IT",
      subCategory: "Account Access",
      department: "HR",
      status: "On Progress",
      createdAt: "2025-04-21T07:45:00Z",
      lastUpdated: "2025-04-22T10:00:00Z",
    },
  
    // Ticket Admin and System Admin will view these based on user status
    // For ticket management purposes (admin overview only)
    {
      id: 7,
      userId: 1,
      subject: "Software installation request",
      category: "IT",
      subCategory: "Software",
      department: "IT",
      status: "Approved",
      createdAt: "2025-04-20T14:00:00Z",
      lastUpdated: "2025-04-21T15:00:00Z",
    }
  ];
  
  export default mockTickets;
  