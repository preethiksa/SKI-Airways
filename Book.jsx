import React, { useEffect, useState } from 'react'
import { Card,Nav,Form,Button, Row, Col,Dropdown } from 'react-bootstrap'
import Flightresult from './Flightresult';

export default function Book({marginTop}) {
    const subClass = marginTop =='sm'?'mt-home':'mt-book';
    const [activeTab,setActiveTab] = useState('tab1');
    const [trip,setTrip] = useState('oneway');
    const [count,setCount] = useState(0);
    const today = new Date().toISOString().split("T")[0];
    const [getVal,setGetVal] = useState({from:'',to:'',dep:today,ret:'',pas:''});
   
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [flights1,setFlights] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:4020/flights").then(res=>res.json()).then(data=>setFlights(data)).catch(err=>console.error(err))
  },[])
  
  const handleSearch = () => {
  const flights = [
    { id: 1, name: "Air India AI-305", from: "TRZ", to: "PNQ", dep: "2025-08-20", price: 4500 },
    { id: 2, name: "Air India AI-305", from: "MAA", to: "PNQ", dep: "2025-08-20", price: 4500 },
    { id: 3, name: "Air India AI-305", from: "TRZ", to: "HYD", dep: "2025-08-20", price: 4500 },
    { id: 4, name: "IndiGo 6E-201", from: "MAA", to: "HYD", dep: "2025-08-21", price: 3800 },
    { id: 5, name: "IndiGo 6E-201", from: "TRZ", to: "HYD", dep: "2025-08-21", price: 3800 },
    { id: 6, name: "IndiGo 6E-201", from: "MAA", to: "BOM", dep: "2025-08-21", price: 3800 },
    { id: 7, name: "SpiceJet SG-400", from: "MAA", to: "PNQ", dep: "2025-08-22", price: 4200 },
    { id: 8, name: "IndiGo 6E-201", from: "TRZ", to: "PNQ", dep: "2025-08-22", price: 3500 },
    { id: 9, name: "SpiceJet SG-400", from: "MAA", to: "BOM", dep: "2025-08-22", price: 4000 },
    { id: 10, name: "SpiceJet SG-400", from: "TRZ", to: "PNQ", dep: "2025-08-22", price: 4000 },
  ];
  const filtered = flights.filter(
    f =>
      f.from.toLowerCase() === getVal.from.toLowerCase() &&
      f.to.toLowerCase() === getVal.to.toLowerCase()
  );

  setResults(filtered);
  setSearched(true);
  };
  const [ports, setPorts] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:4020/ports").then(res=>res.json()).then(data=>setPorts(data)).catch(err=>console.error(err))
  },[])
  
  const handleBook = (flight) => {
    console.log("Booking flight:", flight);
    // Here you can navigate(`/book/${flight.id}`) or save to DB
  };

   const [passengers, setPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
    senior: 0,
  });

  const increment = (type) => {
    setPassengers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const decrement = (type) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: prev[type] > 0 ? prev[type] - 1 : 0,
    }));
  };

  const summary = Object.entries(passengers)
    .filter(([_, count]) => count > 0)
    .map(([type, count]) => `${count} ${type}${count > 1 ? "s" : ""}`)
    .join(", ") || "Select Passengers";

  // Update parent form state
  const handleClose = () => {
    setGetVal({ ...getVal, pas: summary });
  };

  return (
    <div>
        <Card className={`cardtl ${subClass}`}>
              <Card.Header className='cardhd'>
                <Nav variant='tabs' activeKey={activeTab} onSelect={(selectedKey)=>setActiveTab(selectedKey)}>
                  <Nav.Item>
                    <Nav.Link eventKey="tab1">Flight Booking</Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                    <Nav.Link eventKey="tab2">Manage Booking</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tab3">My Booking</Nav.Link>
                  </Nav.Item> */}
                </Nav>
              </Card.Header>
              <Card.Body className='cardbd'>
                {activeTab == 'tab1' && (
                <Form>
                  {/* className='mb-3' */}
                  <div>
                    <Row>
                      <Col xs={2}>
                        <Form.Check inline type='radio' label='One Way' name='trip' 
                        checked={trip == 'oneway'} onChange={()=>setTrip('oneway')}></Form.Check>
                      </Col>
                      <Col xs={2}>
                        <Form.Check inline type='radio' label='Round Trip' name='trip'
                        checked={trip =='round'} onChange={()=>setTrip('round')}></Form.Check>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                    <Col xs={2}>
                    <Form.Label>From</Form.Label>
                    <Form.Select name='from' value={getVal.from} 
                    onChange={(e)=>setGetVal({...getVal,[e.target.name]:e.target.value})}>
                      <option value={""}>Select Origin</option>
                      {/* {ports.filter((p)=>p.code !== getVal.to)
                      .map((p)=>(
                        <option key={p.code} value={p.code}>{p.code} - {p.name}</option>
                      ))} */}
                      <option value="TRZ">Trichy</option>
                      <option value="MAA">Chennai</option>
                      <option value="GOI">Goa</option>
                    </Form.Select>
                    </Col>
                    <Col xs={1} className='route'>
                      <Form.Label></Form.Label>
                      <Form.Text><i className="bi bi-arrow-left-right"></i></Form.Text>     
                    </Col>
                    <Col xs={2}>
                    <Form.Label>To</Form.Label>
                    <Form.Select name='to' value={getVal.to} 
                    onChange={(e)=>setGetVal({...getVal,[e.target.name]:e.target.value})}>
                       <option value={""}>Select Destination</option>
                      {/* {ports.filter((p)=>p.code !== getVal.from).map((p)=>(
                        <option key={p.code} value={p.code}>{p.code} - {p.name}</option>
                      ))} */}
                      <option value="BOM">Mumbai</option>
                      <option value="PNQ">Pune</option>
                      <option value="HYD">Hyderabad</option>
                    </Form.Select>
                    </Col>
                    <Col xs={2}>
                      <Form.Label>Departure</Form.Label>
                      <Form.Control type='date' name='dep' value={getVal.dep} min={today}
                       onChange={(e)=>setGetVal({...getVal,[e.target.name]:e.target.value})}></Form.Control>
                    </Col>
                    <Col xs={2}>
                        <Form.Label>Return</Form.Label>
                        <Form.Control type='date' name='ret' disabled={trip!=='round'} value={getVal.ret}
                         onChange={(e)=>setGetVal({...getVal,[e.target.name]:e.target.value})}></Form.Control>
                    </Col>
                    <Col xs={2}>
                      <Form.Label>Passenger's</Form.Label>
                        <Dropdown>
                          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" 
                                className="passenger-toggle">
                                  {summary}
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ minWidth: "260px", padding: "10px" }}>
                            {["adult", "child", "infant", "senior"].map((type) => (
                              <div key={type}
                                className="d-flex justify-content-between align-items-center mb-2" >
                                <span style={{ textTransform: "capitalize" }}>{type}</span>
                              <div>
                                  <Button size="sm" variant="secondary" onClick={() => decrement(type)}> - </Button>
                                  <span className="mx-2">{passengers[type]}</span>
                                  <Button size="sm" variant="secondary" onClick={() => increment(type)}> + </Button>
                              </div>
                              </div>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                        {/* <Form.Select name='pas' value={getVal.pas} onChange={(e)=>setGetVal(...getVal,e.target.value)}>
                          <option value="1 adult">1 Adult</option>
                          <option value="2 adult">2 Adult</option>
                          <option value="3 adult">3 Adult</option>
                          {/* <option value="infant">Infant</option>
                          <option value="guest">Guest</option> 
                        </Form.Select> */}
                    </Col>
                    <Col xs={1}>
                       <Form.Label></Form.Label>
                       <Button variant='info' className='srbtn' onClick={handleSearch}>Search</Button>
                    </Col>
                  </Row>
                  </div><br/>
                 
                  <div>
                    <Row>
                    <Col xs={2}>
                    <Form.Check inline type='radio' label='Regular Fare'></Form.Check>
                    </Col>
                    <Col xs={2}>
                     <Form.Check inline type='radio' label='Armed Forces'></Form.Check>
                    </Col>
                  <Col xs={2}>
                    <Form.Check inline type='radio' label='Senior Citizen'></Form.Check>
                  </Col>
                  <Col xs={2}>
                    <Form.Check inline type='radio' label='Students'></Form.Check>
                  </Col>
                  </Row>
                  </div>
                </Form>
                )}
                {activeTab == 'tab2' && (
                  <Form>
                    <h5>Check Your Flight Status</h5><br/>
                        <Row>
                            <Col xs={5}>
                                <Form.Control type='text' placeholder='Enter Flight Number'></Form.Control>
                            </Col>
                            <Col xs={4}>
                            <Form.Control type='date' placeholder='Departue Date'></Form.Control>
                            </Col>
                            <Col xs={2}>
                            <Button variant='primary'>Check Flight Status</Button>
                            </Col>
                        </Row><br/>
                        <h6>
                          <Row>
                            <Col xs={2}>
                                <Form.Text>Cancel Booking</Form.Text>
                            </Col>
                            <Col xs={2}>
                               <Form.Text>Change Date</Form.Text>
                            </Col>
                            <Col xs={2}>
                              <Form.Text>Refund Status</Form.Text>
                            </Col>
                          </Row>
                        </h6>
                    </Form>
                )}
                {activeTab == 'tab3' && (
                   <Form>
                      <h5>Retrieve your booking using PNR</h5><br/>
                        <Row>
                            <Col xs={5}>
                                <Form.Control type='text' placeholder='PNR/Booking Reference'></Form.Control>
                            </Col>
                            <Col xs={4}>
                            <Form.Control type='text' placeholder='Email/Last Name'></Form.Control>
                            </Col>
                            <Col xs={2}>
                            <Button variant='primary'>Submit</Button>
                            </Col>
                        </Row>
                        <br/>
                        <h6>
                        <Form.Text>Retrieve without PNR | View Booking</Form.Text>
                        </h6>
                    </Form>
                )}

              </Card.Body>
            </Card>
             <Flightresult results={results} searched={searched} onBook={handleBook}/>
    </div>
  )
}
