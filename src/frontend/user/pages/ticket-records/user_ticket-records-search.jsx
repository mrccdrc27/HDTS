import { Search } from 'lucide-react';
import './user_ticket-records-search.css';

const UserTicketRecordsSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="ticket-records-search-container">
      <Search className="ticket-records-search-icon" />
      <input
        type="text"
        placeholder="Search ticket records"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="ticket-records-search-input"
      />
    </div>
  );
};

export default UserTicketRecordsSearch;
