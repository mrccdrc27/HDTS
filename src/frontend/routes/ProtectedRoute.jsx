import Unauthorized from '../shared/pages/404-not-found.jsx';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Unauthorized />;
  }
  return children;
};

export default ProtectedRoute;
