// ticketCreateRequest.js

export const createTicket = (ticketData) => {
    const existingTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    existingTickets.push(ticketData);
    localStorage.setItem("tickets", JSON.stringify(existingTickets));
  };
  
  export const getTickets = () => {
    return JSON.parse(localStorage.getItem("tickets")) || [];
  };
  