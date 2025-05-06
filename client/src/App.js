
// import Login from './Components/Login';
// import Courses from './Components/Courses';
// import Debtors from './Components/Debtors';
// import Lessons from './Components/Lesson';
// import Students from './Components/Students';
// //import personal_details from'./Components/personal-details';
// import {useDispatch,useSelector } from 'react-redux';
// import React, { useEffect, useState } from 'react';
// import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import { Menubar } from 'primereact/menubar';
// import 'primereact/resources/themes/lara-light-blue/theme.css'; // Theme
// import 'primereact/resources/primereact.min.css'; // Core CSS
// import 'primeicons/primeicons.css'; // Icons CSS
// import PersonalDetailsPage from './Components/personal-details';
// import CourseRegistration from './Components/CourseRegistration';
// import './App.css'; // Custom CSS
// //import { useDispatch, useSelector } from 'react-redux';
// import { logOut } from './redux/tokenSlice';

// // Mock user role (Replace with your actual authentication logic)
// // const {user} = useSelector((state) => state.user);
// // const userRole = user.role; // Can be 'student', 'teacher', or 'administrator'
// // // Define role-based permissions
// // const rolePermissions = {
// //   student: ['login', 'courses', 'personal-details'],
// //   teacher: ['students', 'attendance', 'personal-details', 'login'],
// //   administrator: ['students', 'courses', 'duties', 'lessons', 'login'],
// // };

// // Define navigation items with paths


// // Navbar Component
// // const Navbar = ({ role }) => {
// //   const location = useLocation();
// //   const dispatch = useDispatch()
// //   //const {user} = useSelector((state) => state.user);
// //   //const userRole = user.role; // Can be 'student', 'teacher', or 'administrator'
// // // Define role-based permissions
// // const rolePermissions = {
// //   student: ['login', 'courses', 'personal-details'],
// //   teacher: ['students', 'attendance', 'personal-details', 'login'],
// //   administrator: ['students', 'courses', 'duties', 'lessons', 'login'],
// // };
// //   const navItems = {
// //     login: {
// //       path: '/', label: 'יציאה', icon: 'pi pi-sign-out', command: () => {
// //         dispatch(logOut())
// //       }
// //     },
// //     courses: { path: '/courses', label: 'חוגים', icon: 'pi pi-book' },
// //     'personal-details': { path: '/personal-details', label: 'פרטים אישים', icon: 'pi pi-user' },
// //     students: { path: '/students', label: 'תלמידות', icon: 'pi pi-users' },
// //     attendance: { path: '/attendance', label: 'נוכחות', icon: 'pi pi-calendar' },
// //     duties: { path: '/duties', label: 'חובות', icon: 'pi pi-check' },
// //     lessons: { path: '/lessons', label: 'שיעורים', icon: 'pi pi-book' },
// //   };
// //   // Only render the navbar for authenticated users and exclude it on the login page
// //   if (!role || location.pathname === '/') {
// //     return null;
// //   }

// //   // Define menu items based on user role
// //   const allowedNavItems = rolePermissions[role] || [];
// //   const items = allowedNavItems.map((item) => ({
// //     label: navItems[item].label,
// //     icon: navItems[item].icon, // Default icon, customize as needed
// //     command: () => (window.location.href = navItems[item].path),
// //   }));

// //   return <Menubar model={items} />;
// // };
// const Navbar = ({ role }) => {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // Debug logs to verify role and location
//   console.log("Navbar role prop:", role);
//   console.log("Current location:", location.pathname);

//   const rolePermissions = {
//     student: ['login', 'courses', 'personal-details'],
//     teacher: ['students', 'attendance', 'personal-details', 'login'],
//     administrator: ['students', 'courses', 'duties', 'lessons', 'login'],
//   };

//   const navItems = {
//     login: {
//       path: '/', label: 'יציאה', icon: 'pi pi-sign-out', command: () => {
//         dispatch(logOut());
//       }
//     },
//     courses: { path: '/courses', label: 'חוגים', icon: 'pi pi-book' },
//     'personal-details': { path: '/personal-details', label: 'פרטים אישים', icon: 'pi pi-user' },
//     students: { path: '/students', label: 'תלמידות', icon: 'pi pi-users' },
//     attendance: { path: '/attendance', label: 'נוכחות', icon: 'pi pi-calendar' },
//     duties: { path: '/duties', label: 'חובות', icon: 'pi pi-check' },
//     lessons: { path: '/lessons', label: 'שיעורים', icon: 'pi pi-book' },
//   };

//   if (!role) {
//     return null;
//   }
//   const allowedNavItems = rolePermissions[role] || [];
//   const items = allowedNavItems.map((item) => ({
//     label: navItems[item].label,
//     icon: navItems[item].icon,
//     command: () => (window.location.href = navItems[item].path),
//   }));

//   return <Menubar model={items} />;
// };
// // const App = () => {
// //   const { user } = useSelector((state) => state.token); // Get the user from Redux
// //   const [userRole, setUserRole] = useState('student'); // Default role is 'student'

// //   useEffect(() => {
// //     console.log("User object from Redux:", user); // Debug log
// //     if (user) {
// //       setUserRole(user.role || 'student'); // Fallback to 'student' if role is undefined
// //       console.log("Updated userRole:", user.role || 'student'); // Debug log
// //     } else {
// //       setUserRole('student'); // Default role for unauthenticated users
// //       console.log("Default userRole set to 'student'"); // Debug log
// //     }
// //   }, [user]);

// //   return (<>

// //     {/* Conditionally Render Navbar */}
// //     <Navbar role={userRole} />

// //     <Routes>
// //       {/* Public Route */}
// //       <Route path="/" element={<Login />} />

// //       {/* Protected Routes */}
// //       {userRole ? (
// //         <>
// //           <Route path="/courses" element={<Courses />} />
// //           <Route path="/duties" element={<Debtors />} />
// //           <Route path="/lessons" element={<Lessons />} />
// //           <Route path='/personal-details' element={<PersonalDetailsPage />} />
// //           <Route path='/courseRegistration' element={<CourseRegistration />} />
// //           <Route path='/students' element={<Students />} />
// //         </>
// //       ) : (
// //         <Route path="*" element={<Navigate to="/" />} />
// //       )}
// //     </Routes>
// //   </>
// //   );
// // };

// // export default App;
// const App = () => {
//   const { user } = useSelector((state) => state.token); // Get the user from Redux
//   const [userRole, setUserRole] = useState('student'); // Default role is 'student'
//   const [isLoading, setIsLoading] = useState(true); // Loading state

//   useEffect(() => {
//     console.log("User object from Redux:", user); // Debug log
//     if (user) {
//       setUserRole(user.role || 'student'); // Fallback to 'student' if role is undefined
//       console.log("Updated userRole:", user.role || 'student'); // Debug log
//     } else {
//       setUserRole('student'); // Default role for unauthenticated users
//       console.log("Default userRole set to 'student'"); // Debug log
//     }
//     setIsLoading(false); // Mark loading as complete
//   }, [user]);

//   // Show nothing while loading
//   if (isLoading) {
//     return null;
//   }

//   return (
//     <>
//       {/* Conditionally Render Navbar */}
//       <Navbar role={userRole} />

//       <Routes>
//         {/* Public Route */}
//         <Route path="/" element={<Login />} />

//         {/* Protected Routes */}
//         {userRole ? (
//           <>
//             <Route path="/courses" element={<Courses />} />
//             <Route path="/duties" element={<Debtors />} />
//             <Route path="/lessons" element={<Lessons />} />
//             <Route path='/personal-details' element={<PersonalDetailsPage />} />
//             <Route path='/courseRegistration' element={<CourseRegistration />} />
//             <Route path='/students' element={<Students />} />
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/" />} />
//         )}
//       </Routes>
//     </>
//   );
// };

// export default App;
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Adjust the import path based on your project structure
import Login from './Components/Login';
import Courses from './Components/Courses';
import Debtors from './Components/Debtors';
import Lessons from './Components/Lesson';
import Students from './Components/Students';
import PersonalDetailsPage from './Components/personal-details';
import CourseRegistration from './Components/CourseRegistration';
import Presence from './Components/Presence';

const App = () => {
  const { user } = useSelector((state) => state.token); // Get the user from Redux

  return (
    <>
      {/* Render Navbar */}
      <Navbar />
<div className="page-content">
      <Routes>
        {/* Public Route: Login */}
        <Route path="/" element={user ? <Navigate to="/courses" /> : <Login />} />

        {/* Protected Routes */}
        {user ? (
          <>
            <Route path="/courses" element={<Courses />} />
            <Route path="/duties" element={<Debtors />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/personal-details" element={<PersonalDetailsPage />} />
            <Route path="/courseRegistration" element={<CourseRegistration />} />
            <Route path="/students" element={<Students />} />
            <Route path="/registration" element={<CourseRegistration />} />
            <Route path="/attendance" element={<Presence/>} />
          </>
        ) : (
          // Redirect unauthenticated users to login
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      </div>
    </>
  );
};

export default App;