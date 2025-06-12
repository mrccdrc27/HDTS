import UserNavbar from '../../components/headers/user_navbar.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './user_layout.css';

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton =
    location.pathname.startsWith('/user/ticket-details') ||
    location.pathname === '/user/frequently-asked-questions' ||
    location.pathname === '/user/request-ticket';

  return (
    <div className="user-layout">
      <UserNavbar />
      <div className="userLayout-content">
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

export default UserLayout;
