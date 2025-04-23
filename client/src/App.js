// import './App.css';
// import LoginDemo from './Components/Login';
// import CourseRegistration from './Components/CourseRegistration'
// import LoginComponent from './Components/Login'
// import Corses from'./Components/Corses'
// import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

// function App() {
//   return (<>
//     <div className="App">
//       <LoginDemo/>
//       {/* <CourseRegistration/> */}
//     </div>
//     <Router>
//         <Routes> {/* Use Routes instead of Switch in React Router v6 */}
//             <Route path="/login" element={<LoginComponent />} />
//             <Route path="/courses" element={<Corses />} />
//             {/* Add other routes as needed */}
//         </Routes>
//     </Router>
// </>
//   );
// }

// export default App;
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginDemo from './Components/Login';
import CourseRegistration from './Components/CourseRegistration';
import LoginComponent from './Components/Login';
import Corses from './Components/Corses';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/courses" element={<Corses />} />
          <Route path="/" element={<LoginDemo />} /> {/* Set default route */}
          {/* Add other routes as needed */}
        </Routes>
        {/* You can keep specific components that don't require routing here if necessary */}
      </div>
    </Router>
  );
}

export default App;