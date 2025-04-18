import React from 'react';
import UserNavBar from './usercomponents/user_header.jsx';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
    return (
        <>
            <div>
                <UserNavBar />
                <Outlet />
            </div>
            
        </>
    )
}

export default UserLayout;