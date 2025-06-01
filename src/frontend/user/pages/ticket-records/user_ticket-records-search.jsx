import { Search } from 'lucide-react';
import './user_ticket-records-search.css';

const UserTicketRecordsSearch = () => {
  return (
    <div className="ticket-records-search-container">
      <Search className="ticket-records-search-icon" />
      <input
        type="text"
        placeholder="Search ticket records"
        className="ticket-records-search-input"
      />
    </div>
  );
};

export default UserTicketRecordsSearch;
