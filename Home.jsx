import React, { useState } from 'react';
import { CardHeader, Carousel, Navbar} from 'react-bootstrap';
import carus from './assets/images/carus.jpg';
import caro from './assets/images/caro.jpg';
import caros from './assets/images/caros.jpg';
import nain from './assets/images/nain.jpg';
import coor from './assets/images/coor.jpg';
import lada from './assets/images/lada.jpg';
import anic from './assets/images/anic.jpg';
import udai from './assets/images/udai.jpg';
import amri from './assets/images/amri.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav,NavItem,NavLink } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form,Row,Col,Image,FloatingLabel,Button } from 'react-bootstrap';
import Foot from './Foot';
import Book from './Book';

export default function Home() {

  const ports = [{code:'TRZ',port:'Trichy'},{code:'TCR',port:'Tuticorin'},
    {code:'IXM',port:'Madurai'},{code:'PNQ',port:'Pune'},
    {code:'HYD',port:'Hyderabad'},{code:'BOM',port:'Mumbai'},
  ];
  const [selectFrom,setSelectFrom] = useState([ports]);
  const handlechange = (e)=>{
    e.prventDefault();
    setSelectFrom(e.target.value);
  }
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img className="pic" src={carus} alt="First Slide" />
          <Carousel.Caption>
            <h3 className='itxt'>Reach your Dream Destination!</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="pic" src={caro} alt="Second Slide" />
          <Carousel.Caption>
            <h3 className='itxt'>What is your Next Location?</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="pic" src={caros} alt="Third Slide" />
          <Carousel.Caption>
            <h3 className='itxt'>Book Your Tickets Now With An Offer!</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    <Book marginTop={'sm'}/>
     {/* <Card className='cardtl'>
      <Card.Header className='cardhd'>
        <Nav variant='tabs' defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Flight Booking</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Manage Booking</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Flight Status</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body className='cardbd'>
        <div className="mb-3">
         <Form.Check inline type='radio' label='One Way'></Form.Check>
          <Form.Check inline type='radio' label='Round Trip'></Form.Check>
        </div>
        <div className='row'>
          <div className='col-sm-2'>
            <Form.Label>From</Form.Label>
            <Form.Select>
              <option value="TRZ">Trichy</option>
              <option value="MAA">Chennai</option>
              <option value="GOI">Goa</option>
            </Form.Select>
          </div>
          <div className='col-sm-1 route'>
             <Form.Label></Form.Label>
            <Form.Text><i className="bi bi-arrow-left-right"></i></Form.Text>     
          </div>

          <div className='col-sm-2'>
             <Form.Label>To</Form.Label>
            <Form.Select>
              <option value="BOM">Mumbai</option>
              <option value="PNQ">Pune</option>
              <option value="HYD">Hyderabad</option>
            </Form.Select>
          </div>
          <div className='col-sm-2'>
             <Form.Label>Departure</Form.Label>
            <Form.Control type='date'></Form.Control>
          </div>
          <div className='col-sm-2'>
             <Form.Label>Return</Form.Label>
            <Form.Control type='date'></Form.Control>
          </div>
          <div className='col-sm-2'>
             <Form.Label>Passenger's</Form.Label>
            <Form.Select>
              <option value="adult">Adult</option>
              <option value="infant">Infant</option>
              <option value="guest">Guest</option>
            </Form.Select>
          </div>
          <div className='col-sm-1'>
            <Form.Label></Form.Label>
            <Button variant='info' className='srbtn'>Search</Button>
          </div>
        </div><br/>
        <div className="mb-3">
          <Form.Check inline type='radio' label='Regular Fare'></Form.Check>
          <Form.Check inline type='radio' label='Armed Forces'></Form.Check>
          <Form.Check inline type='radio' label='Senior Citizen'></Form.Check>
          <Form.Check inline type='radio' label='Students'></Form.Check>
        </div>
        
      </Card.Body>
    </Card>  */}
    <br/>
    <Card className='cardmk'>
      <Card.Body>
        <Row>
          <Col xs lg="1" className='cardmcl'>
            <Card.Text variant='left'><i className="bi bi-info-circle-fill"></i> Alerts</Card.Text>
          </Col>
        <Col>
        <Card.Text variant='right'>
        <marquee behavior="" direction="left"><cite> Departure in a right time without delay | Kept your baggage safely | 
          Repeated users have promocode offers | Enjoy the journey safe and secure | 
          Have minimum seats only for discount offers | Hope your journey is more comfortable with us | 
          We give an assurance to you for a good
           ride</cite></marquee>
        </Card.Text>
        </Col>
        </Row>
      </Card.Body>
    </Card><br/>
    <Row className='seq'>
      <p className='pttl'>Explore the beauty of our country</p>
      <Col xs={6} md={2}>
      <figcaption>Amritsar</figcaption>
        <Image className='seqimg' src={amri} rounded />
      </Col>
      <Col xs={6} md={2}>
      <figcaption>Nainital</figcaption>
        <Image className='seqimg' src={nain} rounded />
      </Col>
      <Col xs={6} md={2}>
      <figcaption>Coorg</figcaption>
      <Image className='seqimg' src={coor} rounded />
      </Col>
      <Col xs={6} md={2}>
      <figcaption>Andaman and Nicobar</figcaption>
      <Image className='seqimg' src={anic} rounded />
      </Col>
      <Col xs={6} md={2}>
      <figcaption>Udaipur</figcaption>
      <Image className='seqimg' src={udai} rounded />
      </Col>
      <Col xs={6} md={2}>
      <figcaption>Ladakh</figcaption>
      <Image className='seqimg' src={lada} rounded />
      </Col>
    </Row><br/>
    
    <Foot/>
    {/* <Card>
      <Card.Header className='cafhd'>
        <cite className='ctft'><i className="bi bi-check-all"></i>AeroSkyFi</cite>
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
        <Card.Text className='citeft'>© 2025 AeroSkyFi. All rights reserved 2025</Card.Text>
      </Card.Footer>
    </Card> */}
    </div>
  )
}

