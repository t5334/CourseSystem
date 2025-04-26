import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            command: () => navigate('/home'),
        },
        {
            label: 'חוגים',
            command: () => navigate('/courses'),
        },
        {
            label: 'יציאה',
            command: () => navigate('/'),
        },
    ];

    return (
        <div>
            <Menubar model={items} />
        </div>
    );
};

export default Navbar;