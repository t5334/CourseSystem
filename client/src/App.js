import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginDemo from './Components/Login';
import CourseRegistration from './Components/CourseRegistration';
import LoginComponent from './Components/Login';
import Courses from './Components/Courses';
import Layout from './Components/Layout'
import Debtors from './Components/Debtors';
import Lesson from './Components/Lesson';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

    const items = [
        {
            label: 'שיעורים',
            command: () => navigate('/lessons'),
        },
        {
            label: 'חובות',
            command: () => navigate('/debtors'),
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
   
      <div className="App"> 
       {/* {user && <div className="card">
        <Menubar model={items} />
      </div>} */}
        <Routes>
          <Route path="courses" element={<Courses />} />
          <Route path='debtors' element={<Debtors/>}/>
          <Route path='lessons' element={<Lesson/>}/>
          <Route path="/" element={<LoginDemo />} /> {/* Set default route */}
          {/* Add other routes as needed */}
        </Routes>
        {/* You can keep specific components that don't require routing here if necessary */}
      </div>
    
  );
}

export default App;