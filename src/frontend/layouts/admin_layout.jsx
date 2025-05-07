import React from 'react'
import AdminNavbar from '../components/headers/admin_navbar.jsx';
import { Outlet } from 'react-router-dom';
import '../../frontend/styles/layouts/admin_layout.css'

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
