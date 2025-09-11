import React, { useState } from 'react'
import { Row, Col, Card, Button,Modal,Alert } from "react-bootstrap";
import Ticketpdf from './Ticketpdf';
import { useNavigate } from 'react-router-dom';

export default function Flightresult({ results,searched}) {
    const navigate = useNavigate();
    const handleBook = (flight) => {
        navigate("/passenger", { state: { flight } });
    };
    const loginUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [msg,setMsg] = useState(false);
    const loginAlert = () => {
    setMsg(true);
    setTimeout(() => setMsg(false), 3000);
  };
    
  return (
    /*<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
       <Row>
      {results.length > 0 ? (
        results.map((f) => (
          
            <Card key={f.id} style={{ width: "1170px", marginLeft: "100px" , marginBottom:"10px" , marginTop:"10px"}}>
              <Card.Body>
                <Card.Title>{f.name}</Card.Title>
                <Card.Text>
                  <b>{f.from}</b> → <b>{f.to}</b>
                  <br />
                  Date: {f.dep}
                  <br />
                  Price: ₹{f.price}
                </Card.Text>
                <Button variant="success" onClick={() => handleBook(f)}>
                  Book
                </Button>
              </Card.Body>
            </Card>
         
        ))
      ) : (
        searched && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center",height: "20vh",}}>
            <p className="text-muted">No flights found</p>
        </div>)
        
      )}
    </Row>
   
    </div>*/
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {msg && (
        <Alert variant='warning' dismissible className='mt-2' onClose={()=>setMsg(false)}>Please Login to Book!</Alert>
      )}
      
      <Row className="justify-content-center mt-4">
        {results.length > 0 ? (
          results.map((f) => (
            <Col md={10} key={f.id} className="mb-2">
              <Card className="shadow border-0 rounded-3">
                <Card.Body className="d-flex justify-content-between align-items-center p-4">

                  <div>
                    <h5 className="fw-bold mb-3">{f.name}</h5>
                    <div className="d-flex align-items-center mb-3">
                      <span className="fw-bold me-2">{f.from}</span>
                      <span className="text-muted">→</span>
                      <span className="fw-bold ms-2">{f.to}</span>
                    </div>

                    <p className="mb-2">
                      <b>Date:</b> {f.dep}
                    </p>
                    <p className="mb-0">
                      <b>Price:</b> ₹{f.price}
                    </p>
                  </div>
                  <div>
                    {loginUser ? (  
                    <Button variant="success" size="sm" className="px-3 rounded-pill"
                      onClick={() => handleBook(f)} > Book </Button>
                    ) : (<Button variant='primary' size='sm' className='px-3 rounded-pill' 
                      onClick={loginAlert}>Book</Button>)}
                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          searched && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
              }}
            >
              <p className="text-muted">No flights found</p>
            </div>
          )
        )}
      </Row>
    </div>
  )
}
