import React from 'react';
import { Link } from 'react-router-dom';

const ModalTicketSuccessful = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;  // If the modal is not open, return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2>Ticket successfully created!</h2>
        <hr />
        <h3>Ticket Number</h3>
        <h2>Number</h2>
        <hr />
        <p>Date</p>
        <p>Subject</p>
        <p>Category</p>
        <p>Sub-category</p>
        <p>Attached File</p>
        
        <Link to="/user/home">
            <button>Close</button>
        </Link>

        {/* View Ticket Link */}
        <Link to="/user/ticket-details" className="block mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            View Ticket
          </button>
        </Link>

        <p>Submit another request? 
          <Link to="/user/request-ticket" className="text-blue-600">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ModalTicketSuccessful;
