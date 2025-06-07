import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import UserActiveTicketsSearch from './user_active-tickets-search.jsx';
import UserActiveTicketsFiltersAndSort from './user_active-tickets-filter-and-sort.jsx';
import UserActiveTicketsTable from './user_active-tickets-table.jsx';
import TablePagination from '../../../shared/components/table-pagination.jsx';

const statusHeadingMap = {
  all: 'All Active Tickets',
  open: 'Open Tickets',
  'on-progress': 'On Progress Tickets',
  'on-hold': 'On Hold Tickets',
  pending: 'Pending Tickets',
  resolved: 'Resolved Tickets',
};

const capitalizeStatus = (status) =>
  status
    ? status
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

const ActiveTickets = () => {
  const { category } = useParams();
  const normalizedCategory = category?.toLowerCase().replace(/-tickets$/, '') || 'all';
  const isActiveCategory = Object.keys(statusHeadingMap).includes(normalizedCategory);

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const heading = statusHeadingMap[normalizedCategory] || 'All Active Tickets';

  useEffect(() => {
    if (isActiveCategory) {
      setStatusFilter(normalizedCategory === 'all' ? '' : capitalizeStatus(normalizedCategory));
    } else {
      setStatusFilter('');
    }
    setCurrentPage(1);
  }, [normalizedCategory, isActiveCategory]);

  useEffect(() => {
    setDateRange({ startDate: '', endDate: '' });
  }, [normalizedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    departmentFilter,
    categoryFilter,
    subcategoryFilter,
    statusFilter,
    priorityFilter,
    dateRange.startDate,
    dateRange.endDate,
  ]);

  const disableStatusFilter = isActiveCategory && normalizedCategory !== 'all';
  const ticketStatusKey = isActiveCategory
    ? normalizedCategory === 'all'
      ? 'all-active-tickets'
      : `${normalizedCategory}-tickets`
    : 'all-active-tickets';

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
        disableStatusFilter={disableStatusFilter}
        startDate={dateRange.startDate}
        onStartDateChange={(date) => setDateRange((prev) => ({ ...prev, startDate: date }))}
        endDate={dateRange.endDate}
        onEndDateChange={(date) => setDateRange((prev) => ({ ...prev, endDate: date }))}
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
        ticketStatus={ticketStatusKey}
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onTotalItemsChange={setTotalItems}
      />

      <TablePagination
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
        initialItemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default ActiveTickets;
