import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const CreateTicketButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/user/request-ticket")}
      className="bg-blue-800 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2"
    >
      <Plus size={18} />
      Create Ticket
    </button>
  );
};

export default CreateTicketButton;
