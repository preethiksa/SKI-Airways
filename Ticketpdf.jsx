import React from 'react'
import { jsPDF } from "jspdf";
import { useNavigate } from 'react-router-dom';

export default function Ticketpdf({ flight, passenger }) {
    const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Flight Ticket", 70, 20);

    doc.text(`Passenger: ${passenger.firstname} ${passenger.lastname}`, 20, 40);
    doc.text(`DOB: ${passenger.dob}`, 20, 50);
    doc.text(`Gender: ${passenger.gender}`, 20, 60);
    doc.text(`Email: ${passenger.email}`, 20, 70);
    doc.text(`Mobile: ${passenger.mobile}`, 20, 80);

    doc.text(`Flight: ${flight.name}`, 20, 100);
    doc.text(`From: ${flight.from}`, 20, 110);
    doc.text(`To: ${flight.to}`, 20, 120);
    doc.text(`Date: ${flight.dep}`, 20, 130);
    doc.text(`Price: ₹${flight.price}`, 20, 140);
    //save_pdf
    doc.save(`ticket_${flight.id}.pdf`);
  };
  const navigate = useNavigate();
  const handleClose = ()=>{
    navigate('/');
  }
  return (
    <div style={{ marginTop: "20px" }}>
        <h3>Booking Confirmed <i className="bi bi-check"></i></h3>
      <p>
        Ticket booked for <b>{passenger.firstname} {passenger.lastname}</b>
      </p>
      <button onClick={generatePDF} className="btn btn-primary">Download Ticket</button>&nbsp;&nbsp;
      <button onClick={handleClose} className="btn btn-secondary">Close</button>
    </div>
  )
}
