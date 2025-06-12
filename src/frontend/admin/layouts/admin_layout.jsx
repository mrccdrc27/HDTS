import AdminNavbar from '../components/headers/admin_navbar.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './admin_layout.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = 
    location.pathname.startsWith('/admin/ticket-details') ||
    location.pathname.startsWith('/admin/account-details') ||
    location.pathname.startsWith('/admin/report-information');

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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminLayout;
