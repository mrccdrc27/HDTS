import { Search } from 'lucide-react';
import './user_active-tickets-search.css';

const UserActiveTicketsSearch = () => {
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

export default UserActiveTicketsSearch;
