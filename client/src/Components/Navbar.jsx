// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Menubar } from 'primereact/menubar';
// import { logOut } from '../redux/tokenSlice'; // Adjust the import path based on your project structure

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.token); // Get the user from Redux

//   console.log("Navbar user:", user);

//   const rolePermissions = {
//     student: ['courses', 'personal-details'],
//     teacher: ['students', 'attendance', 'personal-details'],
//     manager: ['students', 'courses', 'duties', 'lessons'],
//   };

//   const navItems = {
//     courses: { path: '/courses', label: 'חוגים', icon: 'pi pi-book' },
//     'personal-details': { path: '/personal-details', label: 'פרטים אישיים', icon: 'pi pi-user' },
//     students: { path: '/students', label: 'תלמידות', icon: 'pi pi-users' },
//     attendance: { path: '/attendance', label: 'נוכחות', icon: 'pi pi-calendar' },
//     duties: { path: '/duties', label: 'חובות', icon: 'pi pi-check' },
//     lessons: { path: '/lessons', label: 'שיעורים', icon: 'pi pi-book' },
//     logout: {
//       path: '/',
//       label: 'יציאה',
//       icon: 'pi pi-sign-out',
//       command: () => {
//         console.log("Logout clicked");
//         dispatch(logOut()); // Clear Redux state
//         navigate('/'); // Redirect to login page
//       },
//     },
//   };

//   // If user is not authenticated, don't render the Navbar
//   if (!user || !user.role) {
//     return null;
//   }

//   const allowedNavItems = rolePermissions[user.role] || [];
//   const items = allowedNavItems.map((key) => ({
//     label: navItems[key].label,
//     icon: navItems[key].icon,
//     command: () => navigate(navItems[key].path),
//   }));

//   // Add logout option
//   items.push({
//     label: navItems.logout.label,
//     icon: navItems.logout.icon,
//     command: navItems.logout.command,
//   });

//   return <Menubar model={items} />;
// };

// export default Navbar;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { logOut } from '../redux/tokenSlice'; // Adjust the import path based on your project structure

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.token); // Get the user from Redux

  // Debug logs to troubleshoot the issue
  console.log("Navbar user:", user);
  console.log("Navbar user role:", user?.role);

  // Role-based permissions
  const rolePermissions = {
    Student: ['courses', 'personal-details','registration'],
    Teacher: ['students', 'attendance', 'personal-details'],
    Manager: ['students', 'courses', 'duties', 'lessons'],
  };

  // Navigation items
  const navItems = {
    courses: { path: '/courses', label: 'חוגים', icon: 'pi pi-book' },
    'personal-details': { path: '/personal-details', label: 'פרטים אישיים', icon: 'pi pi-user' },
    students: { path: '/students', label: 'תלמידות', icon: 'pi pi-users' },
    attendance: { path: '/attendance', label: 'נוכחות', icon: 'pi pi-calendar' },
    duties: { path: '/duties', label: 'חובות', icon: 'pi pi-check' },
    lessons: { path: '/lessons', label: 'שיעורים', icon: 'pi pi-book' },
    registration: { path: '/registration', label: 'הרשמה לקורס', icon: 'pi pi-book' },
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

  // Handle cases where user or role is missing
  if (!user || !user.role) {
    console.warn("User is not authenticated or role is missing");
    return null; // Don't render Navbar
  }

  // Get allowed items based on the user's role
  const allowedNavItems = rolePermissions[user.role] || [];
  const items = allowedNavItems.map((key) => ({
    label: navItems[key].label,
    icon: navItems[key].icon,
    command: () => navigate(navItems[key].path),
  }));

  // Always add the logout option
  items.push({
    label: navItems.logout.label,
    icon: navItems.logout.icon,
    command: navItems.logout.command,
  });

  // Render the Navbar
 
  return<div className="navbar">
    <Menubar model={items} />  </div>
};

export default Navbar;