import Unauthorized from '../shared/pages/404-not-found.jsx';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminAuthToken');
  if (!token) {
    return <Unauthorized />;
  }
  return children;
};

export default AdminProtectedRoute;