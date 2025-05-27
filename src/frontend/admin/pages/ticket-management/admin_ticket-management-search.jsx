import { Search } from 'lucide-react';
import './admin_ticket-management-search.css';

const AdminTicketManagementSearch = () => {
  return (
    <div className="search-container">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Search tickets"
        className="search-input"
      />
    </div>
  );
};

export default AdminTicketManagementSearch;
