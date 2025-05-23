import { Search } from 'lucide-react';
import './admin_user-access-search-bar.css';

const UserAccessSearchBar = () => {
  return (
    <div className="user-access-search-bar">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default UserAccessSearchBar;
