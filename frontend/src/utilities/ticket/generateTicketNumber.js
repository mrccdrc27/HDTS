/**
 * Generates a unique ticket number with format TKT-YYYYMMDD-XXXX
 * Where YYYY is the year, MM is the month, DD is the day, and XXXX is a random number
 * 
 * @returns {string} A unique ticket number
 */
export const generateTicketNumber = () => {
  // Get current date
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  // Generate random number between 1000-9999
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  
  // Combine parts to create ticket number
  return `TKT-${year}${month}${day}-${randomNum}`;
};

/**
 * Generates a ticket ID for internal system use (mainly for sequential ordering)
 * 
 * @returns {string} A formatted ticket ID based on timestamp
 */
export const generateTicketId = () => {
  return `tkt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

/**
 * Extracts the date from a ticket number
 * 
 * @param {string} ticketNumber - The ticket number in format TKT-YYYYMMDD-XXXX
 * @returns {Date|null} A Date object or null if invalid format
 */
export const getDateFromTicketNumber = (ticketNumber) => {
  if (!ticketNumber || typeof ticketNumber !== 'string') {
    return null;
  }
  
  const match = ticketNumber.match(/TKT-(\d{4})(\d{2})(\d{2})-\d{4}/);
  if (!match) {
    return null;
  }
  
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // JS months are 0-indexed
  const day = parseInt(match[3], 10);
  
  return new Date(year, month, day);
};