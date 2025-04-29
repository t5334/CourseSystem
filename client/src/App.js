
import Login from './Components/Login';
import Courses from './Components/Courses';
import Debtors from './Components/Debtors';
import Lessons from './Components/Lesson';
import React from 'react';
import {  Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons CSS

// Mock user role (Replace with your actual authentication logic)
const userRole = 'administrator'; // Can be 'student', 'teacher', or 'administrator'

// Define role-based permissions
const rolePermissions = {
  student: ['login', 'courses', 'personal-details'],
  teacher: ['students', 'attendance', 'personal-details', 'login'],
  administrator: ['students', 'courses', 'duties', 'lessons', 'login'],
};

// Define navigation items with paths
const navItems = {
  login: { path: '/', label: 'יציאה' ,icon:'pi pi-sign-out'},
  courses: { path: '/courses', label: 'חוגים' ,icon:'pi pi-book'},
  'personal-details': { path: '/personal-details', label: 'פרטים אישים',icon:'pi pi-user' },
  students: { path: '/students', label: 'תלמידות',icon:'pi pi-users' },
  attendance: { path: '/attendance', label: 'נוכחות' ,icon:'pi pi-calendar'},
  duties: { path: '/duties', label: 'חובות',icon:'pi pi-check' },
  lessons: { path: '/lessons', label: 'שיעורים',icon:'pi pi-book' },
};

// Navbar Component
const Navbar = ({ role }) => {
  const location = useLocation();

  // Only render the navbar for authenticated users and exclude it on the login page
  if (!role || location.pathname === '/') {
    return null;
  }

  // Define menu items based on user role
  const allowedNavItems = rolePermissions[role] || [];
  const items = allowedNavItems.map((item) => ({
    label: navItems[item].label,
    icon: navItems[item].icon, // Default icon, customize as needed
    command: () => (window.location.href = navItems[item].path),
  }));

  return <Menubar model={items} />;
};

const App = () => {
  return (<>
    
      {/* Conditionally Render Navbar */}
      <Navbar role={userRole} />

      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        {userRole ? (
          <>
            <Route path="/courses" element={<Courses />} />
            <Route path="/duties" element={<Debtors />} />
            <Route path="/lessons" element={<Lessons />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </>
  );
};

export default App;