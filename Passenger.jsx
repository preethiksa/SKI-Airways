import React, { useState } from 'react'
import { Card, Form, Button,Row,Col,Modal } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import Ticketpdf from './Ticketpdf';

export default function Passenger() {
   
    const [passenger, setPassenger] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    email: "",
    mobile: ""
  });
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const location = useLocation();
  const flight = location.state?.flight;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassenger((prev) => ({ ...prev, [name]: value }));
  };
  console.log(flight)
  const handleConfirm = (flight) => {
    setConfirmed(true);
    setSelectedFlight(flight);
    setShow(true);
  };
  const cancelBook = ()=>{
    navigate('/');
  }
  
  return (
    <div className="d-flex justify-content-center mt-4">
      
         {!confirmed ? (
        <Card style={{ width: "70rem", padding: "20px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
          <Card.Body>
            <Card.Title className="mb-3 text-center">Passenger Details</Card.Title>
            
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={passenger.firstname}
                      onChange={handleChange}
                      placeholder="Enter first name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={passenger.dob}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={passenger.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={passenger.lastname}
                      onChange={handleChange}
                      placeholder="Enter last name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={passenger.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Mobile No</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={passenger.mobile}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-center mt-3">
                <Button variant="success" onClick={()=>handleConfirm(flight)}>
                  Confirm Booking
                </Button>&nbsp;&nbsp;
                <Button variant="danger" onClick={cancelBook}>
                  Cancel Booking
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Ticketpdf flight={flight} passenger={passenger} />
      )}
      
      {/* Ticket_details */}
           <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>
                  <cite className='tklg'><i className="bi bi-check-all"></i>SKI Airways</cite>
                  Flight Ticket
              </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedFlight && (
                  <Card className="p-3">
                    <h5>Passenger: {passenger.firstname} {passenger.lastname}</h5>
                    <p>
                      <b>Flight:</b> {selectedFlight.name} <br />
                      <b>From:</b> {selectedFlight.from} <br />
                      <b>To:</b> {selectedFlight.to} <br />
                      <b>Date:</b> {selectedFlight.dep} <br />
                      <b>Price:</b> ₹{selectedFlight.price}
                    </p>
                    <p className="text-success fw-bold"><i className="bi bi-check"></i> Booking Successful!</p>
                  </Card>
                )}
              </Modal.Body>
              <Modal.Footer>
                  {/* passenger={passenger} */}
                  {/* <Ticketpdf flight={selectedFlight} /> */}
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
    </div>
  )
}
