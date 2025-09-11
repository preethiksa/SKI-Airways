import React, { useEffect, useState } from 'react'
import { Link,Routes,Route, useNavigate } from 'react-router-dom';
import Home from './Home';
// import About from './About';
import Contact from './Contact';
import Classwork from './Classwork';
import './Home.css';
import Login from './Login';
import Signin from './Signin';
import Userprofile from './Userprofile';
import Book from './Book';
import Foot from './Foot';
import Flightbook from './Flightbook';
import Flightresult from './Flightresult';
import Ticketpdf from './Ticketpdf';
import Passenger from './Passenger';
import Myprofile from './Myprofile';
import Mybooking from './Mybooking';

export default function Demo() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/"); 
  };
  
  return (
    <>
    {/* <meta charset="utf-8"></meta> */}
    {/* <meta name="viewport" content="width=device-width, initial-scale=1"></meta> */}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"></link>
    <nav>
    <ul><cite className='citehd'>
            <i className="bi bi-check-all"></i>SKI Airways
        </cite>

     {user ? (
            <>
              <li>
                <span onClick={() => navigate("/myprofile",{state:{userId:user.id}})}
                 style={{fontWeight:'bold' ,color:"whitesmoke",fontFamily:'sans-serif'}}>
                  <i className="bi bi-person-circle"></i>&nbsp;Welcome, {user.name} 
                </span>
              </li>
              <li>
                <button onClick={handleLogout}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontFamily:'sans-serif',
                    fontWeight:'bold'
                  }} >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Signin />
              </li>
              <li>
                <Login onLogin={(u) => setUser(u)}/>
              </li>
            </>
          )}
        <li>
            <Link to="/contact">Contact</Link>
        </li>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            {user && <Link to="/flightbook">Book</Link>}
        </li>
       
    </ul>
</nav>

    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/userprofile' element={<Userprofile/>}/>
    <Route path='/book' element={<Book/>}/>
    <Route path='/foot' element={<Foot/>}/>
    <Route path='/flightbook' element={<Flightbook/>}/>
    <Route path='/flightresult' element={<Flightresult/>}/>
    <Route path='/ticketpdf' element={<Ticketpdf/>}/>
    <Route path='/passenger' element={<Passenger/>}/>
    <Route path='/myprofile' element={<Myprofile/>}/>
    <Route path='/mybooking' element={<Mybooking/>}/>
    </Routes>
    </>
  )
}
