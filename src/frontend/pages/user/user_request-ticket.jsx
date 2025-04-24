import React, { useState } from 'react'; // Don't forget to import useState
import ModalTicketSuccessful from '../../components/modals/employee/request-ticket/employee_ticket-successful.jsx';

const RequestTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);  // No need to pass ModalTicketSuccessful here
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">Request Ticket</h2>
      <hr className="mb-6" />

      <form className="space-y-4">
        {/* Subject */}
        <div>
          <label htmlFor="subject">Subject:</label><br />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Enter subject"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category">Category:</label><br />
          <select
            id="category"
            name="category"
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="account">Account</option>
          </select>
        </div>

        {/* Sub-category */}
        <div>
          <label htmlFor="subCategory">Sub-category:</label><br />
          <select
            id="subCategory"
            name="subCategory"
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Sub-category</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="network">Network</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="file">Attach File:</label><br />
          <input
            type="file"
            id="file"
            name="file"
            className="w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description">Description:</label><br />
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Describe your issue..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Schedule */}
        <div>
          <label htmlFor="schedule">Schedule Request Date:</label><br />
          <input
            type="date"
            id="schedule"
            name="schedule"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

      </form>

      <button 
        onClick={openModal}  // Simply call openModal to set the modal to open
        className="bg-blue-800 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2"
      >
        Submit Ticket
      </button>

      {/* Modal */}
      <ModalTicketSuccessful isOpen={isModalOpen} onClose={closeModal}>
      </ModalTicketSuccessful>
    </div>
  );
};

export default RequestTicket;
