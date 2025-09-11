import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Spinner, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Mybooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // For printing specific section
  const printRef = useRef();

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:4055/api/reservation/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  const handleViewTicket = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // reload back to normal UI
  };

  if (loading) return <Spinner animation="border" className="mt-3" />;
  if (bookings.length === 0) return <p className="mt-3">No bookings yet.</p>;

  return (
    <Container className="mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">My Bookings</h4>
        <Button variant="primary" size="sm" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>

      {/* Booking Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Reservation ID</th>
            <th>Flight</th>
            <th>Route</th>
            <th>Departure</th>
            <th>Journey Date</th>
            <th>Seats</th>
            <th>Fare</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.reservationid}>
              <td>{b.reservationid}</td>
              <td>{b.flightname}</td>
              <td>
                {b.source} → {b.destination}
              </td>
              <td>{b.departuretime} hrs</td>
              <td>{b.journeydate}</td>
              <td>{b.noofseats}</td>
              <td>₹{b.totalfare}</td>
              <td>{b.bookingstatus === 1 ? "Confirmed" : "Cancelled"}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleViewTicket(b)}
                >
                  View Ticket
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Ticket Popup Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ticket Details</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={printRef}>
          {selectedBooking ? (
            <div style={{ fontFamily: "Arial, sans-serif" }}>
              <h5 style={{ textAlign: "center" }}>Flight Reservation Ticket</h5>
              <hr />
              <h6>Reservation ID: {selectedBooking.reservationid}</h6>
              <p>
                <strong>Flight:</strong> {selectedBooking.flightname} <br />
                <strong>Route:</strong> {selectedBooking.source} →{" "}
                {selectedBooking.destination} <br />
                <strong>Departure:</strong> {selectedBooking.departuretime} hrs <br />
                <strong>Journey Date:</strong> {selectedBooking.journeydate} <br />
                <strong>Seats:</strong> {selectedBooking.noofseats} <br />
                <strong>Fare:</strong> ₹{selectedBooking.totalfare} <br />
                <strong>Status:</strong>{" "}
                {selectedBooking.bookingstatus === 1
                  ? "Confirmed"
                  : "Cancelled"}
              </p>

              {/* Passenger Details */}
              {selectedBooking.passengers && selectedBooking.passengers.length > 0 && (
                <>
                  <h6>Passenger Details:</h6>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBooking.passengers.map((p, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>
                            {p.firstname} {p.lastname}
                          </td>
                          <td>{p.gender}</td>
                          <td>{p.age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </div>
          ) : (
            <p>No details available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Print Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
