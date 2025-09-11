import React,{useRef} from 'react'
// import React,{useState} from 'react';
export default function Contact() {
    // const eleRef1[first,setFirst] = useState();
    // const eleRef2[last,setLast] = useState();
    let eleRef1 = useRef();
    let eleRef2 = useRef();
    let res = useRef();
    const handlesubmit = (e) =>{
        e.preventDefault();
        eleRef1 = eleRef1.current.value;
        eleRef2 = eleRef2.current.value;
        res.current.innerHTML = eleRef1 + eleRef2;
        console.log(res)
    }
  return (
    <div>
      <h2 className='cntct'>Contact us</h2>
      <hr/>
      {/* onSubmit={handlesubmit} */}
      <form>
        <div>
            {/* <input type="text" ref={eleRef1}  placeholder='FirstName'/><br/>
            <input type="text" ref={eleRef2} placeholder='LastName'/><br/><br/>
            <button type='submit' >Merge</button>     
            <p ref={res}></p> */}
            <pre>Guest Support:</pre>
            <p className='txt'>For any feedback reach out to us: <br/>
              <span><i className="bi bi-telephone"></i>&nbsp;+91 9678451230</span><br/>
              <span><i className="bi bi-envelope"></i>&nbsp;mycontact@skyways.in</span><br/>
            Calls may be recorded for training and quality purposes and for compliance with applicable regulatory requirements
            </p>
            <hr />
            <pre>Group Bookings:</pre>
            <p className='txt'>Kindly direct all your group reservation queries to groupmail@skyways.in <br/> 
              Our team will promptly assist you with all possible assistance in making your journey truly memorable with us. <br/>
              We thankyou for your time today
            </p>  
            <hr />
            <pre>Advertise with Us:</pre>
            <p className='txt'>
              For any queries related to Promotions, Media or Ancillary Tie-ups - please email us at <a href="#">support@skyways.in</a> 
            </p>
            <hr />
        </div>
      </form>

    </div>
  )
}
