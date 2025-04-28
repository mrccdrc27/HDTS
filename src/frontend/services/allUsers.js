const mockUsers = [
    // Employees
    {
      id: 1,
      role: "employee",
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
      password: "password123",
      department: "IT",
      company_id: "EMP001",
      image: null,
    },
    {
      id: 2,
      role: "employee",
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
      password: "securepass",
      department: "HR",
      company_id: "EMP002",
      image: null,
    },
  
    // Ticket Admins
    {
      id: 3,
      role: "ticket-admin",
      first_name: "Clara",
      last_name: "Tickets",
      email: "clara.admin@example.com",
      password: "adminpass",
      department: "Support",
      company_id: "ADM001",
      image: null,
    },
  
    // System Admins
    {
      id: 4,
      role: "system-admin",
      first_name: "Dan",
      last_name: "Sys",
      email: "dan.sys@example.com",
      password: "sysadmin123",
      department: "IT",
      company_id: "SYS001",
      image: null,
    }
  ];
  
  export default mockUsers;
  