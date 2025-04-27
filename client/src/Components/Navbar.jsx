import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'שיעורים',
            command: () => navigate('layout/lessons'),
        },
        {
            label: 'חובות',
            command: () => navigate('layout/debtors'),
        },
        {
            label: 'חוגים',
            command: () => navigate('layout/courses'),
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