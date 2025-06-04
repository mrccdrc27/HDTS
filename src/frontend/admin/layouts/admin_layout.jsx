import AdminNavbar from '../components/headers/admin_navbar.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './admin_layout.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname.startsWith('/admin/ticket-details');

  return (
    <div className="admin-layout">
      <div className="admin-layout-header">
        <AdminNavbar />
      </div>

      <div className="admin-layout-content">
        {showBackButton && (
          <div className="back-button-bar">
            <button
              className="back-button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
