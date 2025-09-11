import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { Modal,Button,Alert } from 'react-bootstrap';
import log from './assets/images/log.jpg';
import {Container,Row,Col,Form} from 'react-bootstrap';
import Signin from './Signin';

export default function Login({onLogin}) {
  
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  // const [hide,setHide] = useState(true);

  const [name,setName] = useState('');
  const [pass,setPass] = useState('');
  const navigate = useNavigate();
  const [msg,setMsg] = useState();
  function alert(){
    setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
  }
  const [userData, setUserData] = useState([]);
  const [loginType, setLoginType] = useState("user");

  useEffect(() => {
    fetch("http://localhost:4055/api/userprofile")
      .then(res => res.json())
      .then(data => {setUserData(data),console.log(data)})
      .catch(err => console.error(err));
  }, []);
  //login_name_shown
  const enter=(e)=>{
  e.preventDefault();
  if(!name) return alertMsg("Please Enter Username");
  if(!pass) return alertMsg("Please Enter Password");

  const matchId = userData.find(ele =>
    ((ele.emailid === name || ele.firstname === name) && ele.street === pass)
  );

  if(name === "admin" && pass === "adm123"){
    const userObj = { role: "admin", name: "Admin" };
    localStorage.setItem("loggedInUser", JSON.stringify(userObj));
    if (onLogin) onLogin(userObj);   
    setShow(false);
    navigate("/userprofile");
  }
  else if((name === "user" && pass === "123") || matchId){
    const userObj = matchId 
      ? { role: "user", name: matchId.firstname, id: matchId.id }
      : { role: "user", name: "User" };
    localStorage.setItem("loggedInUser", JSON.stringify(userObj));
    if (onLogin) onLogin(userObj);  
    setShow(false);
    localStorage.setItem("userId",matchId.userid)
    console.log("Stored userid:", localStorage.getItem("userId"))
    navigate("/myprofile",{state:{userId:matchId?.id}});
  }
  else{
    alert();
    setMsg("Username and Password is wrong. Please SignUp!");
  }
  setName("");
  setPass("");
}

  const enter1=(e)=>{
    e.preventDefault();
    alert();
    if(!name){
      setMsg('Please Enter Username');
    }
    if(name && !pass){
      setMsg('Please Enter Password')
    }
    // const usrData = JSON.parse(localStorage.getItem('sgData'));//local_storage
    const usrData = userData;
    console.log(usrData)
    const matchId = usrData.find(ele=>
      ((ele.emailid === name || ele.firstname === name) && ele.street === pass)
    );
    console.log(matchId)
    if(name && pass){
      if(name === "admin" && pass === "adm123"){
        setShow(false);
        navigate("/userprofile");
        setName("");
        setPass("");
      }
      if(name == 'user' && pass == '123' || matchId){
        setShow(false);
        // navigate("/userprofile");
        navigate("/myprofile",{state:{userId:matchId.id}});
        setName('');
        setPass('');
      }else{
        alert();
        setMsg('Username and Password is wrong');
        // navigate("/about");
      }
    }
  }

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false); 

  return (
    <div>
      {/* hide={hide} */}
      <Button className="lgn" variant='info' size='sm' onClick={handleOpen}>Login</Button>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" 
          contentClassName="custom-modal-content" centered>
        {/* HEADER SECTION */}
        <div className="custom-header">
          <h2>Welcome to SKI Airways</h2>
          <button className="close-btn" onClick={handleClose}><i className="bi bi-x-lg"></i></button>
        </div>
        <Alert show={open}>{msg}</Alert>
        {/* IMAGE SECTION */}
        <div className="modal-image">
          <img src={log} alt="Sample" />
        </div>

        {/* BODY SECTION */}
        <div className="custom-body">
          <Form.Group >
  <Form.Label style={{ fontWeight: "bold" }}>Select Login Type</Form.Label>
  <div style={{ marginTop: "1px" }}>
    <Form.Check
      inline
      label="User"
      type="radio"
      id="user-radio"
      value="user"
      checked={loginType === "user"}
      onChange={(e) => setLoginType(e.target.value)}
      style={{ marginRight: "20px" }}
    />
    <Form.Check
      inline
      label="Admin"
      type="radio"
      id="admin-radio"
      value="admin"
      checked={loginType === "admin"}
      onChange={(e) => setLoginType(e.target.value)}
    />
  </div>
</Form.Group>
           {/* <label>Select Login Type</label>&nbsp;
  <select value={loginType} onChange={(e) => setLoginType(e.target.value)}>
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select> */}
  <br/>
          <label>Enter Username</label>&nbsp;
          <input type='text' value={name} onChange={(e)=>setName(e.target.value)} /><br/><br/>
          <label>Enter Password</label>&nbsp;&nbsp;
          <input type='password' value={pass} onChange={(e)=>setPass(e.target.value)} /><br/><br/>
          <a className='pwd' href="#">Forgot Password?</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type='submit' className='logbtn' onClick={enter} >Login</Button>
          {/* <button type='submit' variant="primary">Submit</button> */}
        </div>

        {/* FOOTER SECTION */}
        <div className="custom-footer">
          <cite  className='sgnew'>New User? 
            {/* <a href="/signin" className='pwd'>Sign In</a> */}
            <span><Signin/></span>
          </cite>
          <a><i className="bi bi-google"></i></a>&nbsp;&nbsp;&nbsp;
          <a><i className="bi bi-facebook"></i></a>&nbsp;&nbsp;&nbsp;
          <a><i className="bi bi-twitter-x"></i></a>&nbsp;&nbsp;&nbsp;
          <a><i className="bi bi-whatsapp"></i></a>&nbsp;&nbsp;&nbsp;
          {/* <button className="action-btn" onClick={handleClose}>
            Close
          </button> */}
        </div>
      </Modal>
    </div>
  )
}
