import React, { useState } from 'react';
import { Search } from 'lucide-react'; 
import CreateTicketButton from '../../../components/buttons/user/create-ticket';

const pendingTickets = [
  {
    number: 'TX0421',
    subject: 'Request for additional hardware',
    department: 'IT Support',
    category: 'Hardware',
    subCategory: 'Server',
    status: 'Pending',
    dateCreated: '2025-04-10 10:15 AM',
    lastUpdated: '2025-04-11 01:20 PM',
  },
  // Add more "Pending" tickets here as needed
];

const statusStyles = {
  'Pending': 'bg-yellow-300 text-yellow-800',
};

const PendingTickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = pendingTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(pendingTickets.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pending Tickets</h1>

        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md px-3 py-2 w-60"
          />
          <CreateTicketButton />
        </div>

        <span>Filter by</span>
        <select className="border rounded-md px-3 py-2">
          <option>Category</option>
        </select>
        <select className="border rounded-md px-3 py-2">
          <option>Sub Category</option>
        </select>
        <select className="border rounded-md px-3 py-2">
          <option>Department</option>
        </select>

        <span>Sort by</span>
        <select className="border rounded-md px-3 py-2">
          <option>Sort Order</option>
        </select>
        <select className="border rounded-md px-3 py-2">
          <option>Date</option>
        </select>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-4 py-2">Ticket Number</th>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Sub Category</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date Created</th>
            <th className="px-4 py-2">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.map((ticket, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{ticket.number}</td>
              <td className="px-4 py-2">{ticket.subject}</td>
              <td className="px-4 py-2">{ticket.department}</td>
              <td className="px-4 py-2">{ticket.category}</td>
              <td className="px-4 py-2">{ticket.subCategory}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusStyles[ticket.status]}`}>
                  {ticket.status}
                </span>
              </td>
              <td className="px-4 py-2">{ticket.dateCreated}</td>
              <td className="px-4 py-2">{ticket.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2"></div>

        <div className="flex items-center gap-2 text-sm">
          <button
            className={`text-gray-600 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            &larr; Previous
          </button>
          <button
            className={`w-8 h-8 rounded-full bg-gray-700 text-white ${currentPage === 1 ? 'bg-gray-500' : ''}`}
            onClick={() => goToPage(1)}
          >
            1
          </button>
          {currentPage > 2 && <span>...</span>}
          {currentPage < totalPages && (
            <button
              className="text-gray-700"
              onClick={() => goToPage(totalPages)}
            >
              {totalPages}
            </button>
          )}
          <button
            className={`text-gray-700 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingTickets;
