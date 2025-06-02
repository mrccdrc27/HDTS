import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import UserTicketRecordsSearch from './user_ticket-records-search.jsx';
import UserTicketRecordsFilterAndSort from './user_ticket-records-filter-and-sort.jsx';
import UserTicketRecordsTable from './user_ticket-records-table.jsx';
import TablePagination from '../../../shared/components/table-pagination.jsx';

const categoryMap = {
  'all-ticket-records': 'All Ticket Records',
  'closed-tickets': 'Closed Tickets',
  'rejected-tickets': 'Rejected Tickets',
  'withdrawn-tickets': 'Withdrawn Tickets',
};

const capitalizeStatus = (status) => {
  if (!status) return '';
  return status
    .replace('-tickets', '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const TicketRecords = () => {
  const { category } = useParams();
  const normalizedCategory = category?.toLowerCase() || 'all-ticket-records';
  const heading = categoryMap[normalizedCategory] || 'All Ticket Records';

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0); // This should come from your data source or table component

  const isTicketRecordsCategory = Object.keys(categoryMap).includes(normalizedCategory);

  useEffect(() => {
    if (isTicketRecordsCategory) {
      setStatusFilter(normalizedCategory === 'all-ticket-records' ? '' : capitalizeStatus(normalizedCategory));
    } else {
      setStatusFilter('');
    }
  }, [normalizedCategory, isTicketRecordsCategory]);

  const disableStatusFilter = isTicketRecordsCategory && normalizedCategory !== 'all-ticket-records';

  // Map route category to ticketStatus expected by UserTicketRecordsTable
  let ticketStatusProp = '';
  if (normalizedCategory === 'closed-tickets') ticketStatusProp = 'closed';
  else if (normalizedCategory === 'rejected-tickets') ticketStatusProp = 'rejected';
  else if (normalizedCategory === 'withdrawn-tickets') ticketStatusProp = 'withdrawn';
  else ticketStatusProp = ''; // for 'all-ticket-records' or others

  // Here, you'd update totalItems based on filtered data from your source or table.
  // For now, assume it's updated internally or via props from table.

  return (
    <div className="active-tickets-main">
      <div className="active-tickets-main-header">
        <h2>{heading}</h2>
      </div>

      <div className="active-tickets-main-search">
        <UserTicketRecordsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <UserTicketRecordsFilterAndSort
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
      />

      <UserTicketRecordsTable
        searchTerm={searchTerm}
        departmentFilter={departmentFilter}
        categoryFilter={categoryFilter}
        subcategoryFilter={subcategoryFilter}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        sortBy={sortBy}
        sortDirection={sortDirection}
        ticketStatus={ticketStatusProp}
        startDate={startDate}
        endDate={endDate}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setTotalItems={setTotalItems} // Optional: Pass setter to update totalItems from table data
      />

      <TablePagination
        totalItems={totalItems}
        currentPage={currentPage}
        initialItemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(num) => {
          setItemsPerPage(num);
          setCurrentPage(1); // reset page on itemsPerPage change
        }}
      />
    </div>
  );
};

export default TicketRecords;
