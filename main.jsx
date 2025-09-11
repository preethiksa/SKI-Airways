import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter, Link, Outlet } from 'react-router-dom';
import Demo from './Demo.jsx';
import About from './About.jsx';
import Classwork from './Classwork.jsx';
import Admprofile from './Admprofile.jsx';
import Student from './Student.jsx';
import { Routes,Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <BrowserRouter>
     <App />
    {/* <Demo/> */}
    {/* <Classwork/> */}
    {/* <About/> */}
    {/* <Admprofile/>  */}
    {/* <Student/> */}
      {/* <Routes>
        <Route path='/admprofile' element={<Admprofile/>} />
        <Route path='/student' element={<Student/>} />
      </Routes>  */}
    </BrowserRouter>
  </StrictMode>,
)
