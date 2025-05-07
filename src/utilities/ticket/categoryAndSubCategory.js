export const ticketCategories = {
    "Information Technology": {
      "User Support": [
        { name: "Password Reset", priority: "Low" },
        { name: "System Access Request", priority: "High" },
        { name: "Email Not Working", priority: "Medium" }
      ],
      "Software & Applications": [
        { name: "Software Installation", priority: "Medium" },
        { name: "Application Crash", priority: "High" },
        { name: "Software License Expired", priority: "Low" }
      ],
      "Network & Connectivity": [
        { name: "Internet Not Working", priority: "High" },
        { name: "VPN Access Issue", priority: "Medium" },
        { name: "Server Downtime", priority: "Critical" }
      ],
      "Security": [
        { name: "Suspicious Email or Phishing", priority: "Medium" },
        { name: "Data Breach/Cyber Attack", priority: "Critical" },
        { name: "Antivirus Update Issue", priority: "Low" }
      ]
    },
    "Asset Management": {
      "Equipment Request & Return": [
        { name: "New Equipment Request", priority: "Medium" },
        { name: "Return of Issued Device", priority: "Low" },
        { name: "Transfer of Equipment", priority: "Medium" }
      ],
      "Asset Inventory": [
        { name: "Asset Tagging Request", priority: "Low" },
        { name: "Missing Asset Report", priority: "High" },
        { name: "Lost/Stolen Equipment", priority: "Critical" }
      ],
      "Maintenance": [
        { name: "Repair Request (e.g., laptop)", priority: "Medium" },
        { name: "Replacement Due to Damage", priority: "High" }
      ]
    },
    "Document Management": {
      "Document Access": [
        { name: "Request for Copy", priority: "Low" },
        { name: "Scanning Request", priority: "Medium" },
        { name: "Confidential File Access", priority: "High" }
      ],
      "Archiving & Retrieval": [
        { name: "Archiving Request", priority: "Low" },
        { name: "Retrieval of Old Files", priority: "Medium" },
        { name: "Missing Document Report", priority: "High" }
      ],
      "Compliance & Security": [
        { name: "Document Mishandling", priority: "Critical" },
        { name: "Leak of Confidential Files", priority: "Critical" }
      ]
    },
    "Finance and Budgeting": {
      "General Requests": [
        { name: "Budget Allocation Inquiry", priority: "Low" },
        { name: "Request for Financial Report", priority: "Medium" }
      ],
      "Reimbursement": [
        { name: "Submission Follow-Up", priority: "Low" },
        { name: "Delay in Reimbursement", priority: "Medium" }
      ],
      "Payroll": [
        { name: "Payslip Request", priority: "Low" },
        { name: "Payroll Discrepancy", priority: "High" },
        { name: "Payroll System Down", priority: "Critical" }
      ]
    },
    "Operations": {
      "Scheduling": [
        { name: "Work Schedule Request", priority: "Medium" },
        { name: "Shift Adjustment Inquiry", priority: "Low" }
      ],
      "Supplies and Logistics": [
        { name: "Supply Request", priority: "Low" },
        { name: "Stock Shortage Report", priority: "Medium" },
        { name: "Failed Delivery", priority: "High" }
      ],
      "Workflow Interruptions": [
        { name: "Delay in Daily Operations", priority: "Medium" },
        { name: "Operations System Failure", priority: "Critical" }
      ]
    },
    "Facilities and Maintenance": {
      "General Maintenance": [
        { name: "Light Bulb Replacement", priority: "Low" },
        { name: "Basic Repairs (drawer, faucet, etc.)", priority: "Medium" }
      ],
      "Equipment & Utilities": [
        { name: "Aircon Issue", priority: "Medium" },
        { name: "Power Interruption", priority: "High" },
        { name: "Water Supply Problem", priority: "Critical" }
      ],
      "Hazards": [
        { name: "Electrical Fault", priority: "Critical" },
        { name: "Fire/Smoke Report", priority: "Critical" },
        { name: "Flooding or Water Leak", priority: "Critical" }
      ]
    },
    "Human Resources": {
      "Records and Certificates": [
        { name: "Certificate of Employment", priority: "Low" },
        { name: "Leave of Absence Form", priority: "Medium" }
      ],
      "Disputes & Complaints": [
        { name: "Attendance Dispute", priority: "Medium" },
        { name: "Employee Conflict", priority: "High" },
        { name: "Harassment Complaint", priority: "Critical" }
      ],
      "Policy and Benefits": [
        { name: "HR Policy Clarification", priority: "Low" },
        { name: "Misapplied Benefits", priority: "Medium" }
      ]
    },
    "Administration": {
      "Office Supplies": [
        { name: "Pen and Paper Request", priority: "Low" },
        { name: "Toner or Cartridge Refill", priority: "Medium" }
      ],
      "ID & Access": [
        { name: "ID Replacement", priority: "Medium" },
        { name: "Access Card Malfunction", priority: "High" },
        { name: "Unauthorized Entry Incident", priority: "Critical" }
      ],
      "Emergencies": [
        { name: "Emergency Evacuation Alert", priority: "Critical" },
        { name: "Suspicious Activity Report", priority: "High" }
      ]
    }
  };
  