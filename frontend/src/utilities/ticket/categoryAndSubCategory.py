"""
Utility module to map categories and subcategories to departments and priorities.
This will be used by the ticket system to properly route tickets.
"""

# Dictionary mapping departments to categories and subcategories with priority levels
TICKET_CATEGORIES = {
    'IT Department': {
        'Software': [
            {'name': 'Software Installation', 'priority': 'Medium'},
            {'name': 'Software Updates', 'priority': 'Low'},
            {'name': 'Unauthorized App', 'priority': 'High'},
            {'name': 'Application Error', 'priority': 'High'},
            {'name': 'Account Access', 'priority': 'Critical'},
        ],
        'Hardware': [
            {'name': 'Computer Replacement', 'priority': 'Medium'},
            {'name': 'Hardware Malfunction', 'priority': 'High'},
            {'name': 'Peripheral Issues', 'priority': 'Low'},
            {'name': 'Network Connection', 'priority': 'High'},
        ],
        'Network': [
            {'name': 'Internet Connectivity', 'priority': 'Critical'},
            {'name': 'VPN Issues', 'priority': 'High'},
            {'name': 'Network Slow', 'priority': 'Medium'},
            {'name': 'Wireless Connection', 'priority': 'Medium'},
        ],
    },
    'Asset Management': {
        'Equipment': [
            {'name': 'New Equipment Request', 'priority': 'Medium'},
            {'name': 'Equipment Repair', 'priority': 'High'},
            {'name': 'Equipment Return', 'priority': 'Low'},
        ],
        'Inventory': [
            {'name': 'Inventory Check', 'priority': 'Medium'},
            {'name': 'Inventory Discrepancy', 'priority': 'High'},
        ],
    },
    'Document Control': {
        'Document': [
            {'name': 'Document Creation', 'priority': 'Medium'},
            {'name': 'Document Update', 'priority': 'Medium'},
            {'name': 'Document Retrieval', 'priority': 'Low'},
            {'name': 'Document Approval', 'priority': 'High'},
        ],
    },
    'Finance & Budgeting': {
        'Finance': [
            {'name': 'Budget Inquiry', 'priority': 'Medium'},
            {'name': 'Expense Report', 'priority': 'High'},
            {'name': 'Payment Issue', 'priority': 'High'},
        ],
    },
    'Operations': {
        'Process': [
            {'name': 'Process Improvement', 'priority': 'Medium'},
            {'name': 'Process Error', 'priority': 'High'},
            {'name': 'Process Training', 'priority': 'Medium'},
        ],
    },
    'Facilities & Maintenance': {
        'Facilities': [
            {'name': 'Building Maintenance', 'priority': 'Medium'},
            {'name': 'Office Supplies', 'priority': 'Low'},
            {'name': 'Safety Concern', 'priority': 'Critical'},
            {'name': 'Cleaning Request', 'priority': 'Low'},
        ],
    },
    'Human Resources': {
        'Personnel': [
            {'name': 'Leave Request', 'priority': 'Medium'},
            {'name': 'Benefits Question', 'priority': 'Medium'},
            {'name': 'Employment Verification', 'priority': 'Low'},
            {'name': 'Workplace Issue', 'priority': 'High'},
        ],
    },
    'Administration': {
        'General': [
            {'name': 'General Inquiry', 'priority': 'Low'},
            {'name': 'Meeting Setup', 'priority': 'Medium'},
            {'name': 'Visitor Access', 'priority': 'Medium'},
        ],
    },
}

def get_priority_for_category_subcategory(category, subcategory):
    """
    Returns the priority level for a given category and subcategory.
    
    Args:
        category (str): The ticket category
        subcategory (str): The ticket subcategory
        
    Returns:
        str: The priority level (Critical, High, Medium, Low) or 'Medium' if not found
    """
    for department, categories in TICKET_CATEGORIES.items():
        if category in categories:
            for sub in categories[category]:
                if sub['name'] == subcategory:
                    return sub['priority']
    return 'Medium'  # Default priority if not found

def get_department_for_category(category):
    """
    Returns the department responsible for a given category.
    
    Args:
        category (str): The ticket category
        
    Returns:
        str: The department name or None if not found
    """
    for department, categories in TICKET_CATEGORIES.items():
        if category in categories:
            return department
    return None

def get_all_categories():
    """
    Returns a list of all available categories.
    
    Returns:
        list: List of all category names
    """
    categories = []
    for department, dept_categories in TICKET_CATEGORIES.items():
        for category in dept_categories:
            categories.append(category)
    return categories

def get_all_subcategories(category=None):
    """
    Returns a list of all subcategories, optionally filtered by category.
    
    Args:
        category (str, optional): The category to filter by
        
    Returns:
        list: List of subcategory dictionaries with name and priority
    """
    subcategories = []
    for department, dept_categories in TICKET_CATEGORIES.items():
        if category is None or category in dept_categories:
            for cat, subs in dept_categories.items():
                if category is None or cat == category:
                    subcategories.extend(subs)
    return subcategories

# Convert the Python dictionary to a JavaScript-compatible format
def export_to_js():
    """
    Returns a string representation of the TICKET_CATEGORIES dictionary in JavaScript format
    """
    js_representation = "const ticketCategories = " + str(TICKET_CATEGORIES).replace("'", '"') + ";\n\nexport { ticketCategories };"
    return js_representation