import UserNavbar from '../../components/headers/user_navbar.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './user_layout.css';

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Show back button only on specific routes
  const showBackButton =
    location.pathname.startsWith('/user/ticket-details') ||
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
    </div>
  );
};

export default UserLayout;
