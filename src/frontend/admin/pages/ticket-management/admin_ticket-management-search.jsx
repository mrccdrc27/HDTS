import { Search } from 'lucide-react';
import './admin_ticket-management-search.css';

const AdminTicketManagementSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Search tickets"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default AdminTicketManagementSearch;
