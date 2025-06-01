import { Search } from 'lucide-react';
import './user_active-tickets-search.css';

const UserActiveTicketsSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Search active tickets"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default UserActiveTicketsSearch;
