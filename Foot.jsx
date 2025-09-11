import React, { useState } from 'react'
import { Card,Form,Row,Col, Button } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap';

export default function Foot() {
  const [email,setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [mobile, setMobile] = useState("");
  
  const handleSubscribe = async () => {
    console.log(mobile)
    try {
      const res = await fetch('http://localhost:4055/api/mobsubscribe',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const data = await res.json();
      if(data.success){
        setMsg("Subscribed successfully!");
        // setEmail("");
      }else{
        setMsg("Failed to subscribe.Try again!")
      }
    } catch (error) {
      console.error(error)
      setMsg("Error")
    }
  }
  return (
    <div>
        <div className='bfoot'>
            <Navbar expand="lg" className='bnav1'>
                <Navbar.Text className='bnavtxt'>
                    <h4>Never miss an offer</h4>
                    <h6>Subscribe and be the first to get more updates</h6>
                </Navbar.Text>
                <Form className='bnav2'>
                    <Row>
                        <Col xs="auto">
                            {/* <Form.Control type='email' name='email' value={email}
                            onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email Address'/> */}
                             <Form.Control type='text' name='mobile' value={mobile}
                            onChange={(e)=>setMobile(e.target.value)} placeholder='Enter your Mobile no.'/>
                        </Col>
                        <Col xs="auto">
                            <Button type='button' className='button btn-sm' onClick={handleSubscribe}  style={{ padding: "8px 13px", background: "blue", color: "white", border: "none", borderRadius: "6px", fontWeight:'bold',fontFamily:'sans-serif' }}>Subscribe</Button>
                        </Col>
                    </Row>
                </Form>

            </Navbar>
        </div>
      <Card>
            <Card.Header className='cafhd'>
              <cite className='ctft'><i className="bi bi-check-all"></i>SKI Airways</cite>
            </Card.Header>
            <Card.Body className='cafbd'>
              <Row className='ftrow'>
                <Col sm={2}><p className='capt'>Services</p>
                <Form.Text>Flight Schedule</Form.Text><br/>
                <Form.Text>Tariff Sheet</Form.Text>
                </Col>
                <Col sm={3}><p className='capt'>Travel Information</p>
                <Form.Text>Conditions of Carriage</Form.Text><br/>
                <Form.Text>Passenger Charter</Form.Text><br/>
                <Form.Text>Special/Disability Assistance</Form.Text><br/>
                <Form.Text>Group Booking</Form.Text><br/>
                <Form.Text>Weather Advisory</Form.Text><br/>
                <Form.Text>FAQs</Form.Text>
                </Col>
                <Col sm={2}><p className='capt'>Forms</p>
                <Form.Text>Meical Form</Form.Text><br/>
                <Form.Text>Minor Form</Form.Text><br/>
                <Form.Text>Wheelchair Form</Form.Text>
                </Col>
                <Col sm={2}><p className='capt'>Corporate</p> 
                <Form.Text>About Us</Form.Text><br/>
                <Form.Text>Contact Us</Form.Text><br/>
                <Form.Text>Career</Form.Text>
                </Col>
                <Col><p className='capt'>Contact Us</p>
                <Form.Text>Guest Helpline</Form.Text><br/>
                <Form.Text>Privacy Policy</Form.Text><br/>
                <Form.Text>Terms & Conditions</Form.Text>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className='caft'>
              <Card.Text className='citeft'>© 2025 SKI Airways. All rights reserved 2025</Card.Text>
            </Card.Footer>
          </Card>
    </div>
  )
}
