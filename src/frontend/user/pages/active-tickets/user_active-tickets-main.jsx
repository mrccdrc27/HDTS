import { useState } from 'react';
import { useParams } from 'react-router-dom';

import UserActiveTicketsSearch from './user_active-tickets-search.jsx';
import UserActiveTicketsFiltersAndSort from './user_active-tickets-filter-and-sort.jsx';
import UserActiveTicketsTable from './user_active-tickets-table.jsx';
import TablePagination from '../../../admin/components/shared/table-pagination.jsx';

const categoryMap = {
  all: 'All Active Tickets',
  new: 'New Tickets',
  open: 'Open Tickets',
  'on-progress': 'On Progress Tickets',
  'on-hold': 'On Hold Tickets',
  pending: 'Pending Tickets',
  resolved: 'Resolved Tickets',
};

const ActiveTickets = () => {
  const { category } = useParams();
  const normalizedCategory = category?.replace(/-tickets$/, '') || '';
  const heading = categoryMap[normalizedCategory] || 'All Active Tickets';

  const [searchTerm, setSearchTerm] = useState('');

  // Filter & sort state
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  return (
    <div className="active-tickets-main">
      <div className="active-tickets-main-header">
        <h2>{heading}</h2>
      </div>

      <div className="active-tickets-main-search">
        <UserActiveTicketsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <UserActiveTicketsFiltersAndSort
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        subcategoryFilter={subcategoryFilter}
        setSubcategoryFilter={setSubcategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      <UserActiveTicketsTable
        searchTerm={searchTerm}
        departmentFilter={departmentFilter}
        categoryFilter={categoryFilter}
        subcategoryFilter={subcategoryFilter}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        sortBy={sortBy}
        sortDirection={sortDirection}
        ticketStatus={normalizedCategory}
      />

      <TablePagination />
    </div>
  );
};

export default ActiveTickets;
