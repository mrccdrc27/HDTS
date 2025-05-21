import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './global.css';
import { AuthRoutes } from './frontend/routes/AuthenticationRoutes.jsx';
// import { UserRoutes } from './frontend/routes/UserRoutes.jsx';
import { AdminRoutes } from './frontend/routes/AdminRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthRoutes />
      {/* <UserRoutes /> */}
      <AdminRoutes />
    </BrowserRouter>
  </StrictMode>,
)
