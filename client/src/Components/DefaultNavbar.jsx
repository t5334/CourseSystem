import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { logOut } from '../redux/tokenSlice'; // Adjust the import path based on your project structure

const DefaultNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = {
    logout: {
      path: '/',
      label: 'יציאה',
      icon: 'pi pi-sign-out',
      command: () => {
        dispatch(logOut()); // Clear Redux state
        navigate('/'); // Redirect to login page
      },
    },
  };

  const items = [
    {
      label: navItems.logout.label,
      icon: navItems.logout.icon,
      command: navItems.logout.command,
    },
  ];

  return <Menubar model={items} />;
};

export default DefaultNavbar;