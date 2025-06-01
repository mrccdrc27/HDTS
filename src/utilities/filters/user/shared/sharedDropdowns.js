export const departmentOptions = [
  'IT Department',
  'Asset Department',
  'Budget Department'
];

// Categories no longer tied to department, just an array
export const categoryOptions = [
  'IT Category',
  'Asset Category',
  'Budget Category'
];

// Subcategories linked only to category (keys match categoryOptions values)
export const subCategoryOptions = {
  'IT Category': [
    'IT Infrastructure Management',
    'Software & Applications Deployment',
    'Network & Security Administration',
    'Technical Support & Troubleshooting',
    'System Maintenance'
  ],
  'Asset Category': [
    'Asset Check-out',
    'Asset Check-in',
    'Asset Repair',
    'Asset Audit'
  ],
  'Budget Category': [
    'IT Equipment',
    'Networking Equipment',
    'Servers & Storage Devices',
    'Office IT Fixtures',
    'Perpetual Software Licenses',
    'Data Center Equipment',
    'Software Subscriptions',
    'Cloud Services',
    'Internet & Web Hosting',
    'Maintenance & Repairs',
    'Training & Certifications',
    'Outsourced Technical Support',
    'Utilities',
    'Small Accessories',
    'Security Services'
  ]
};
