import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const UserHome = () => {
  const navigate = useNavigate();
  
  // State to manage button expansion
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Welcome, <span className="text-gray-700">User Name</span>
      </h1>

      <div className="flex gap-4">
        <Link to="/user/request-ticket">
          <button className="bg-blue-800 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
            <Plus size={18} /> Submit a Ticket
          </button>
        </Link>

        <Link to="/user/all-records">
          <button className="bg-green-700 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
            <Search size={18} /> View Tickets
          </button>
        </Link>
      </div>

      <hr />

      <div>
        <h2 className="text-lg font-semibold">NOTICE</h2>
        <p className="mt-2">
          Our support team operates during <strong>8:00 AM - 5:00 PM</strong>.
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700 mt-2">
          <li>Tickets submitted outside working hours will be placed in the <strong>Pending</strong> queue.</li>
          <li>Once working hours resume, these tickets will be moved to <strong>Open</strong> or <strong>In Progress</strong> based on priority.</li>
        </ul>
        <p className="mt-2">Thank you for your patience!</p>
      </div>

      <hr />

      <div>
        <h2 className="text-lg font-semibold">Ticket Status</h2>
        <div className="grid grid-cols-2 gap-y-2 mt-2">
          <p><strong>Ticket Number:</strong> TX0123</p>
          <p><strong>Subject:</strong> Laptop Requesting</p>
          <p><strong>Status:</strong> In Progress</p>
          <p><strong>Assigned to:</strong> John Doe</p>
          <br />
          <p><strong>Last Update:</strong> 2025-04-20</p>
          <p><strong>Submitted date:</strong> 2025-04-19</p>
        </div>
      </div>

      {/* Floating Button (Expandable) */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 flex flex-col items-center">
        {/* Toggle Button */}
        <button
          className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
          onClick={handleToggle}
        >
          <span className="text-xl">+</span> {/* Change to any icon you prefer */}
        </button>

        {/* Expandable Buttons */}
        {isExpanded && (
          <>
            {/* Messaging Button */}
            <button
              className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
              onClick={() => alert('Open Messaging Modal or Chat!')}
            >
              <span className="text-xl">💬</span>
            </button>

            {/* Navigate Button */}
            <button
              className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-700 transition"
              onClick={() => navigate('/user/frequently-asked-questions')} // Change to the desired navigation link
            >
              <span className="text-xl">➡️</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserHome;
