import api from './apiInstance'; // Make sure this is your configured axios instance

const adminTicketService = {
  rejectTicket: async (ticketId, rejectionReason) => {
    const response = await api.post(`/tickets/${ticketId}/reject/`, {
      rejection_reason: rejectionReason,
    });
    return response.data;
  },
  // ...other admin functions
};

export default adminTicketService;