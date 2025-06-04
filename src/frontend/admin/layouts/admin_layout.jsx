import AdminNavbar from '../components/headers/admin_navbar.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './admin_layout.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define which routes should show the back button for admin
  const showBackButton =
    location.pathname.startsWith('/admin/ticket-details');

  return (
    <div className="admin-layout">
      <div className="admin-layout-header">
        <AdminNavbar />
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
      </div>
      <div className="admin-layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
