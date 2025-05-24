import { useNavigate } from 'react-router-dom';
// import '../../../styles/components/modals/user/user_ticket-successful.css';
import { loadTickets } from '../../../../../utilities/ticket-data/ticketData.js';

const TicketSuccessful = ({ isOpen, onClose, ticketData }) => {
  const navigate = useNavigate();

  // Early return if modal is not open or ticketData is missing
  if (!isOpen || !ticketData) return null;

  // Destructure ticketData for easier access and validation
  const {
    ticketNumber,
    subject,
    category,
    subCategory,
    description,
    files = [],
    scheduleDate,
  } = ticketData;

  // Validate ticketData fields (ensure necessary fields are present)
  if (!ticketData || !ticketData.ticket_number || !ticketData.subject || !ticketData.category) {
    return (
      <div className="ticket-successful-modal">
        <div className="modal-content">
          <h2>Error: Ticket data is incomplete</h2>
          <p>Please try submitting the ticket again.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  // Function to retrieve ticketData from localStorage after it was added
  const getTicketFromLocalStorage = (ticketNumber) => {
    const tickets = loadTickets();
    return tickets.find(ticket => ticket.number === ticketNumber) || null;
  };

  // Get the ticket data from localStorage (after the ticket was submitted)
  const savedTicket = getTicketFromLocalStorage(ticketNumber);

  // Handle navigation for "View Ticket" button
  const handleViewTicket = () => {
    if (ticketNumber) {
      navigate(`/user/ticket-details/${ticketNumber}`);
    }

    // Close the modal after navigation
    onClose();
  };

  // Handle navigation for "Close" button (go to User Home)
  const handleClose = () => {
    navigate('/user/home'); // Navigate to user home
    onClose(); // Close the modal
  };

  return (
    <div className="ticket-successful-modal">
      <div className="modal-content">
        <h2>Ticket Submitted Successfully!</h2>
        <p><strong>Ticket Number:</strong> {ticketData.ticket_number || 'N/A'}</p>
        <p><strong>Subject:</strong> {subject || 'N/A'}</p>
        <p><strong>Category:</strong> {category || 'N/A'}</p>
        <p><strong>Sub-Category:</strong> {subCategory || 'N/A'}</p>
        <p><strong>Description:</strong> {description || 'N/A'}</p>

        <p><strong>Files:</strong> 
          {files && files.length > 0 ? (
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name || file.file_name || 'Untitled File'}</li>
              ))}
            </ul>
          ) : 'No files attached'}
        </p>

        <p><strong>Schedule Date:</strong> {scheduleDate || 'N/A'}</p>

        <div className="modal-buttons">
          <button onClick={handleClose}>Close</button>
          <button onClick={handleViewTicket}>View Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default TicketSuccessful;
