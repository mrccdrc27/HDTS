import AdminNavbar from '../../components/headers/admin_navbar.jsx';
import { Outlet } from 'react-router-dom';
import '../../styles/layouts/admin_layout.css';

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
