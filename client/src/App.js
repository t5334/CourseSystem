import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginDemo from './Components/Login';
import CourseRegistration from './Components/CourseRegistration';
import LoginComponent from './Components/Login';
import Courses from './Components/Courses';
import Layout from './Components/Layout'

function App() {
  return (
   
      <div className="App"> 
        <Routes>
          <Route path="/layout" element={<Layout />}>
          {/* <Route path="/login" element={<LoginComponent />} /> */}
          <Route path="courses" element={<Courses />} />
          </Route>
          <Route path="/" element={<LoginDemo />} /> {/* Set default route */}
          {/* Add other routes as needed */}
        </Routes>
        {/* You can keep specific components that don't require routing here if necessary */}
      </div>
    
  );
}

export default App;