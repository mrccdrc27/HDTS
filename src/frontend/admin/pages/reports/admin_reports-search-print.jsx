import { Search } from 'lucide-react';

const AdminReportsSearchPrint = () => {
  const handlePrintClick = () => {
    window.print();
  };

  return (
    <div className="user-access-search-create-bar">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search"
        />
      </div>
      <button className="create-user-button" onClick={handlePrintClick}>
        Print Report
      </button>
    </div>
  );
};

export default AdminReportsSearchPrint;
