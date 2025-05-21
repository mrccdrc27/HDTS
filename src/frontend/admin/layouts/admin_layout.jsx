import AdminNavbar from '../components/headers/admin_navbar.jsx';
import { Outlet } from 'react-router-dom';
import './admin_layout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout"> {/* <- Apply the correct class */}
      <AdminNavbar />
      <div className="admin-layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
