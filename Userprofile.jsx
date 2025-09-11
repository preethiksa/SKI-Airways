import React, { useEffect } from 'react';
import { Table,Container,Card,Button,Row, Col,Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Userprofile() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const emptyUser = {
  id: "",
  firstname: "",
  lastname: "",
  emailid: "",
  mobileno: "",
  street: "",
};
  const [editUser, setEditUser] = useState({emptyUser});
  
  useEffect(() => {
    fetch("http://localhost:4055/api/userprofile")
      .then(res => res.json())
      .then(data => {setUsers(data),console.log(data)})
      .catch(err => console.error(err));
  }, []);
  
  const [open, setOpen] = useState(false);
  const [msg,setMsg] = useState();
  function alert(){
    setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 500);
  }

  //delete_func
  const delUser = (id)=>{
    console.log(id)
    fetch(`http://localhost:4055/api/userprofile/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        // Update UI without reloading
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(err => console.error(err));
  }
  //update_func
  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4055/api/userprofile/${editUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editUser),
      });

      if (!res.ok) throw new Error("Failed to update user");
      alert();
      setMsg("User updated successfully!")

      // Refresh users list
      const newRes = await fetch("http://localhost:4055/api/userprofile");
      const newData = await newRes.json();
      setUsers(newData);

      setEditUser(emptyUser); // close edit form
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };
  /*//connect_with_local_storage
  const [formval,setFormval] = useState([]);
  useEffect(()=>{
    const getData = localStorage.getItem('sgData');
    if(getData){
      const parsData = JSON.parse(getData);
      setFormval(parsData);
      // return getData ? setFormval(JSON.parse(getData)) : [];
    }
  },[]);
  function deleteUser(i){
    const updated = [...users];
    updated.splice(i,1);
    setFormval(updated);
    localStorage.setItem('sgData',JSON.stringify(updated));
  }
  */
  function btnclose(){
    navigate('/');
  }
  function bookticket(){
    navigate('/flightbook');
  }
  
  

  return (
    <div>
        <Container>
             <Card className="usercard">
               <Card.Header className="usernav">
                 User Profile
                 <p className="usersgn"><i className="bi bi-person-circle"></i>&nbsp;&nbsp;Admin</p>
                 <button className="usercls" onClick={btnclose}><i className="bi bi-x-lg"></i></button>
               </Card.Header>
        <Alert show={open}>{msg}</Alert>
               <Row>
                 {/* Edit form on the left */}
                 <Col md={4}>
                   <Card className="p-3 shadow">
                     <h4>Edit User Details</h4>
                     <form onSubmit={handleUpdate}>
                       <input type='text' name="firstname" placeholder="First Name" 
                       value={editUser.firstname || ''} onChange={handleChange} className="form-control mb-2" />
                       <input
                         name="lastname"
                         placeholder="Last Name"
                         value={editUser.lastname || ''}
                         onChange={handleChange}
                         className="form-control mb-2"
                       />
                       <input
                         name="emailid"
                         placeholder="Email"
                         value={editUser.emailid || ''}
                         onChange={handleChange}
                         className="form-control mb-2"
                       />
                       <input
                         name="mobileno"
                         placeholder="Mobile No"
                         value={editUser.mobileno || ''}
                         onChange={handleChange}
                         className="form-control mb-2"
                       />
                       <input
                         name="street"
                         placeholder="Street"
                         value={editUser.street || ''}
                         onChange={handleChange}
                         className="form-control mb-2"
                       />
                       <Button type="submit" variant="success" className="me-2">Save</Button>
                       <Button
               type="button"
               variant="secondary"
               onClick={() =>
                 setEditUser({
                   id: "", firstname: "",  lastname: "", emailid: "", mobileno: "",  street: "", })  } >  Cancel </Button>
                     </form>
                   </Card>
                 </Col>
       
                 {/* Table on the right */}
                 <Col md={8}>
                   <Table striped bordered hover size="sm" responsive>
                     <thead>
                       <tr>
                         <th>UserId</th>
                         <th>First Name</th>
                         <th>Last Name</th>
                         <th>Email</th>
                         <th>Street</th>
                         <th>Mobile No</th>
                         <th>Edit</th>
                         <th>Delete</th>
                         <th>Book</th>
                       </tr>
                     </thead>
                     <tbody>
                       {users.length > 0 ? (
                         users.map((data, i) => (
                           <tr key={i}>
                             <td>{data.id}</td>
                             <td>{data.firstname}</td>
                             <td>{data.lastname}</td>
                             <td>{data.emailid}</td>
                             <td>{data.street}</td>
                             <td>{data.mobileno}</td>
                             <td>
                               <i
                                 className="bi bi-pencil"
                                 style={{ cursor: "pointer" }}
                                 onClick={() => setEditUser(data)}
                               ></i>
                             </td>
                             <td>
                               <i
                                 className="bi bi-trash"
                                 style={{ cursor: "pointer", color: "red" }}
                                 onClick={() => delUser(data.id)}
                               ></i>
                             </td>
                             <td>
                               <i
                                 className="bi bi-ticket"
                                 style={{ cursor: "pointer" }}
                                 onClick={bookticket}
                               ></i>
                             </td>
                           </tr>
                         ))
                       ) : (
                         <tr>
                           <td colSpan={9}>No Available Data</td>
                         </tr>
                       )}
                     </tbody>
                   </Table>
                 </Col>
               </Row>
             </Card>
           </Container>
    </div>
  )
}
