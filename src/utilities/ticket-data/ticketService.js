import axios from 'axios';

// Create an axios instance with default configurations
const api = axios.create({
  baseURL: '/api',  // Adjust based on your Django setup
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),  // Django CSRF token handling
  }
});

// Helper function to get CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Automatically attach authorization token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Adjust based on your auth method
  }
  return config;
});

// Ticket API functions
const ticketService = {
  // Get all tickets for the current user
  getUserTickets: async () => {
    try {
      const response = await api.get('/tickets/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific ticket by ID
  getTicket: async (id) => {
    try {
      const response = await api.get(`/tickets/${id}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new ticket
  createTicket: async (ticketData) => {
    // Use FormData for file uploads
    const formData = new FormData();
    
    // Add text fields
    formData.append('subject', ticketData.subject);
    formData.append('category', ticketData.category);
    formData.append('sub_category', ticketData.subCategory);
    formData.append('description', ticketData.description);
    
    if (ticketData.scheduleDate) {
      formData.append('scheduled_date', ticketData.scheduleDate);
    }
    
    // Add files
    if (ticketData.files && ticketData.files.length > 0) {
      // Note: This handles only a single file; multiple files would need a different approach
      formData.append('attachment', ticketData.files[0]);
    }
    
    try {
      const response = await axios.post('/api/tickets/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': getCookie('csrftoken'),
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update an existing ticket
  updateTicket: async (id, ticketData) => {
    try {
      const response = await api.patch(`/tickets/${id}/`, ticketData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a ticket
  deleteTicket: async (id) => {
    try {
      await api.delete(`/tickets/${id}/`);
      return true;
    } catch (error) {
      throw error;
    }
  }
};

export default ticketService;