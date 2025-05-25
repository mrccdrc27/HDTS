/**
 * Mapping of departments to categories and subcategories with priority levels
 * This is used by the ticket system to properly display and process tickets
 */

const ticketCategories = {
  "IT Department": {
    "Software": [
      {"name": "Software Installation", "priority": "Medium"},
      {"name": "Software Updates", "priority": "Low"},
      {"name": "Unauthorized App", "priority": "High"},
      {"name": "Application Error", "priority": "High"},
      {"name": "Account Access", "priority": "Critical"}
    ],
    "Hardware": [
      {"name": "Computer Replacement", "priority": "Medium"},
      {"name": "Hardware Malfunction", "priority": "High"},
      {"name": "Peripheral Issues", "priority": "Low"},
      {"name": "Network Connection", "priority": "High"}
    ],
    "Network": [
      {"name": "Internet Connectivity", "priority": "Critical"},
      {"name": "VPN Issues", "priority": "High"},
      {"name": "Network Slow", "priority": "Medium"},
      {"name": "Wireless Connection", "priority": "Medium"}
    ]
  },
  "Asset Management": {
    "Equipment": [
      {"name": "New Equipment Request", "priority": "Medium"},
      {"name": "Equipment Repair", "priority": "High"},
      {"name": "Equipment Return", "priority": "Low"}
    ],
    "Inventory": [
      {"name": "Inventory Check", "priority": "Medium"},
      {"name": "Inventory Discrepancy", "priority": "High"}
    ]
  },
  "Document Control": {
    "Document": [
      {"name": "Document Creation", "priority": "Medium"},
      {"name": "Document Update", "priority": "Medium"},
      {"name": "Document Retrieval", "priority": "Low"},
      {"name": "Document Approval", "priority": "High"}
    ]
  },
  "Finance & Budgeting": {
    "Finance": [
      {"name": "Budget Inquiry", "priority": "Medium"},
      {"name": "Expense Report", "priority": "High"},
      {"name": "Payment Issue", "priority": "High"}
    ]
  },
  "Operations": {
    "Process": [
      {"name": "Process Improvement", "priority": "Medium"},
      {"name": "Process Error", "priority": "High"},
      {"name": "Process Training", "priority": "Medium"}
    ]
  },
  "Facilities & Maintenance": {
    "Facilities": [
      {"name": "Building Maintenance", "priority": "Medium"},
      {"name": "Office Supplies", "priority": "Low"},
      {"name": "Safety Concern", "priority": "Critical"},
      {"name": "Cleaning Request", "priority": "Low"}
    ]
  },
  "Human Resources": {
    "Personnel": [
      {"name": "Leave Request", "priority": "Medium"},
      {"name": "Benefits Question", "priority": "Medium"},
      {"name": "Employment Verification", "priority": "Low"},
      {"name": "Workplace Issue", "priority": "High"}
    ]
  },
  "Administration": {
    "General": [
      {"name": "General Inquiry", "priority": "Low"},
      {"name": "Meeting Setup", "priority": "Medium"},
      {"name": "Visitor Access", "priority": "Medium"}
    ]
  }
};

/**
 * Get the priority level for a given category and subcategory
 * @param {string} category - The ticket category
 * @param {string} subcategory - The ticket subcategory name
 * @returns {string} - The priority level (Critical, High, Medium, Low) or 'Medium' if not found
 */
const getPriorityForCategorySubcategory = (category, subcategory) => {
  for (const department in ticketCategories) {
    if (category in ticketCategories[department]) {
      const subcategories = ticketCategories[department][category];
      const found = subcategories.find(sub => sub.name === subcategory);
      if (found) {
        return found.priority;
      }
    }
  }
  return 'Medium'; // Default priority if not found
};

/**
 * Get the department responsible for a given category
 * @param {string} category - The ticket category
 * @returns {string|null} - The department name or null if not found
 */
const getDepartmentForCategory = (category) => {
  for (const department in ticketCategories) {
    if (category in ticketCategories[department]) {
      return department;
    }
  }
  return null;
};

/**
 * Get all available categories
 * @returns {string[]} - Array of all category names
 */
const getAllCategories = () => {
  const categories = [];
  for (const department in ticketCategories) {
    for (const category in ticketCategories[department]) {
      categories.push(category);
    }
  }
  return categories;
};

/**
 * Get all subcategories, optionally filtered by category
 * @param {string|null} category - Optional category to filter by
 * @returns {Array} - Array of subcategory objects with name and priority
 */
const getAllSubcategories = (category = null) => {
  const subcategories = [];
  for (const department in ticketCategories) {
    for (const cat in ticketCategories[department]) {
      if (!category || cat === category) {
        subcategories.push(...ticketCategories[department][cat]);
      }
    }
  }
  return subcategories;
};

export { 
  ticketCategories, 
  getPriorityForCategorySubcategory, 
  getDepartmentForCategory,
  getAllCategories,
  getAllSubcategories
};