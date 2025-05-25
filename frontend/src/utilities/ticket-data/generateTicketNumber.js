// src/utilities/ticket-data/generateTicketNumber.js

export const generateTicketNumber = () => {
  const today = new Date();
  const datePart = today.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

  const counterKey = `ticketCounter-${datePart}`;
  const lastCount = parseInt(localStorage.getItem(counterKey), 10) || 0;
  const newCount = lastCount + 1;

  localStorage.setItem(counterKey, newCount.toString());

  const paddedCount = String(newCount).padStart(4, '0'); // e.g., 0001
  return `TICKET-${datePart}-${paddedCount}`;
};

