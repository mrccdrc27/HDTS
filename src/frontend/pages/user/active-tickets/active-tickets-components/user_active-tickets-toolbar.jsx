import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTicketButton from '../../../../components/buttons/user/create-ticket.jsx';
import { loadTickets } from '../../../../../utilities/ticket-data/ticketData.js';
import { ticketCategories } from '../../../../../utilities/ticket/categoryAndSubCategory.js';

const ActiveTicketsToolbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('Order');
  const [subcategories, setSubcategories] = useState([]); // New state to hold subcategories for selected category

  const navigate = useNavigate();

  useEffect(() => {
    const loadedTickets = loadTickets();
    setTickets(loadedTickets);
    setFilteredTickets(loadedTickets);
  }, []);

  useEffect(() => {
    // Update the subcategories based on selected category
    if (categoryFilter && ticketCategories[categoryFilter]) {
      setSubcategories(Object.keys(ticketCategories[categoryFilter]));
    } else {
      setSubcategories([]);
    }
  }, [categoryFilter]);

  useEffect(() => {
    let filtered = tickets;

    // Apply filters
    if (categoryFilter) {
      filtered = filtered.filter(ticket => ticket.category === categoryFilter);
    }
    if (subcategoryFilter) {
      filtered = filtered.filter(ticket => ticket.subCategory === subcategoryFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === 'Date') {
      filtered = filtered.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    } else {
      // Default to sorting by ticket number (Order)
      filtered = filtered.sort((a, b) => a.number.localeCompare(b.number));
    }

    setFilteredTickets(filtered);
  }, [searchQuery, categoryFilter, subcategoryFilter, statusFilter, sortBy, tickets]);

  return (
    <div className="controls-section">
      <div className="search-bar-row">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="search-icon" size={16} />
        </div>

        <div className="create-ticket-btn">
          <CreateTicketButton />
        </div>
      </div>

      <div className="filter-sort-controls">
        <div className="filter-group">
          <span className="filter-label">Filter by:</span>
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Category</option>
            {Object.keys(ticketCategories).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            disabled={!categoryFilter}
          >
            <option value="">Sub Category</option>
            {subcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved/Open">Approved/Open</option>
            <option value="Pending">Pending</option>
            <option value="On Progress">On Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="sort-group">
          <span className="sort-label">Sort by:</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Order">Order</option>
            <option value="Date">Date</option>
          </select>
        </div>
      </div>

      <div className="ticket-list">
        {filteredTickets.map(ticket => (
          <div key={ticket.number} className="ticket-item">
            <div>{ticket.subject}</div>
            <div>{ticket.status}</div>
            <div>{ticket.category}</div>
            <div>{ticket.subCategory}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTicketsToolbar;
