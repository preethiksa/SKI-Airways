import React from 'react'
import { Modal,Row,Col,Container,Button,Image } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useState } from 'react';
import spln from './assets/images/spln.jpg';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Alert } from 'react-bootstrap';
import Login from './Login';

export default function Signin() {
  const[show,setShow] = useState(false);
  const[open,setOpen] = useState(false);
  const navigate = useNavigate();
  const[msg,setMsg] = useState('');
  const handleclose = () => setShow(false);
  const handleshow = () => setShow(true);
  const [sgform,setSgform] = useState({id:'',firstname:'',lastname:'',emailid:'',street:'',mobileno:''});
  // localStorage.setItem('sgData',JSON.stringify({sgform}));

    function alert(){
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 500);
    }
    function onSignup(e){
      e.preventDefault();
      fetch("http://localhost:4055/api/userprofile",{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sgform),
      }).then(res => res.json()).then(data=>{setSgform(data);
        console.log(data);
      setMsg("Success");
      alert("User Registered Successfully!");
      setTimeout(() => {
        handleclose();
      }, 1000);}).catch(err=>console.log(err));
      setMsg('Success');
      alert();
      setTimeout(() => {
      // setShow(false);
      handleclose();
      }, 1000);
      console.log(sgform)
      
      const olddata = JSON.parse(localStorage.getItem('sgData')) || [];
      const upddata = [...olddata,sgform];
      localStorage.setItem('sgData',JSON.stringify(upddata));
      if(sgform.mail || sgform.mail!=''){
        // navigate('/login',{state:sgform});
      }else{
        setMsg('Please enter a valid Email');
      }
    }
  return (
    <div>
      <Button variant="info" className='sgn' size='sm' onClick={handleshow} >Sign Up</Button>
      <Modal show={show} onHide={handleclose}>
        <Modal.Header className='sgnhdr'>
            <Modal.Title>Welcome to Sign Up</Modal.Title>
            <button className="close-btn" onClick={handleclose}><i className="bi bi-x-lg"></i></button>
        </Modal.Header>
        <Modal.Body>
            <Container>
              <Alert show={open}>{msg}</Alert>
              <Image src={spln} className='sgnpic'></Image>
              <Form>
                <Row>
                  <Col>
                    <Form.Label>Firstname*</Form.Label>
                    <Form.Control type='text' onChange={(e)=>setSgform({...sgform,firstname:e.target.value})}></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type='text' onChange={(e)=>setSgform({...sgform,lastname:e.target.value})}></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Email*</Form.Label>
                    <Form.Control type='email' onChange={(e)=>setSgform({...sgform,emailid:e.target.value})} ></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Form.Label>Password*</Form.Label>
                  <Form.Control type='password' onChange={(e)=>setSgform({...sgform,street:e.target.value})}></Form.Control>
                  </Col>  
                </Row>
                <Row>
                    <Col>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type='text' onChange={(e)=>setSgform({...sgform,mobileno:e.target.value})}></Form.Control>
                    </Col>
                </Row><br/>
                <Button className='sgnbtn' type='submit' variant='secondary' onClick={onSignup}>Sign Up</Button>
              </Form>
            </Container>
        </Modal.Body>
        <Modal.Footer className='sgftr'>
          <Form.Text className='aclgn'>Already have an account? &nbsp;  
            {/* <a href="/login" className='acpwd'>Login</a> */}
            <span><Login/></span>
          </Form.Text>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


