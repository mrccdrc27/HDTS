import React from 'react'
import UserNavbar from '../components/headers/user_navbar.jsx'
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      <div className="userLayout-content">
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout;
