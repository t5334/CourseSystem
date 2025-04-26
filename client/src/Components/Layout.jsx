import React from 'react';
import  Navbar  from './Navbar'; // Your navigation bar
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <Navbar /> {/* Displaying the navigation bar */}
            <Outlet /> {/* Renders LoginComponent or HomeComponent based on the current route */}
        </div>
    );
}

export default Layout;
