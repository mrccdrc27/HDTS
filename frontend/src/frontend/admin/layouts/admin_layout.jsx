import AdminNavbar from '../headers/admin_navbar.jsx';
import { Outlet } from 'react-router-dom';
import './admin_layout.css';

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="adminLayout-content">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout;
