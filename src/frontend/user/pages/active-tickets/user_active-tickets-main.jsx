import { useParams } from 'react-router-dom';

import UserActiveTicketsSearch from './user_active-tickets-search.jsx';
import UserActiveTicketsFiltersAndSort from './user_active-tickets-filter-and-sort.jsx';
import UserActiveTicketsTable from './user_active-tickets-table.jsx';
import TablePagination from '../../../admin/components/shared/table-pagination.jsx';

const categoryMap = {
  all: 'All Active Tickets',
  new: 'New Tickets',
  open: 'Open Tickets',
  'on-process': 'On Process Tickets',
  'on-hold': 'On Hold Tickets',
  pending: 'Pending Tickets',
};

const ActiveTickets = () => {
  const { category } = useParams();
  const normalizedCategory = category?.replace(/-tickets$/, '') || 'all';
  const heading = categoryMap[normalizedCategory] || 'All Active Tickets';

  return (
    <div className="active-tickets-main">
      <div className="active-tickets-main-header">
        <h1>{heading}</h1>
      </div>

      <div className="active-tickets-main-search">
        <UserActiveTicketsSearch />
      </div>

      <UserActiveTicketsFiltersAndSort />

      <UserActiveTicketsTable statusFilter={normalizedCategory} />

      <TablePagination />

      

      {/* Future sections like filters, table, and pagination can follow here */}
    </div>
  );
};

export default ActiveTickets;
