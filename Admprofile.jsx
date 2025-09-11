import React from 'react';
import { useState,useEffect } from 'react';
import Student from './Student';
import { useNavigate } from 'react-router-dom';
import { Routes,Route } from 'react-router-dom';

function Admprofile() {
    const[admin,setAdmin] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/admin').then(res => res.json())
        .then(data => setAdmin(data)).catch(error => console.error('Error fetching data:', error))
    },[])
    const[admUser,setAdmUser] = useState({id:'',fname:'',lname:'',email:''});
    // console.log(setAdmUser())
    const [editMode, setEditMode] = useState(false);
    //newId
    const getId = ()=>{
        const newId= admin.length > 0 ? Math.max(...admin.map(e=> e.id)) : 0;
        console.log(newId);
        return newId + 1; 
        // if(admin.length == 0) return 1;
        // const maxId = Math.max(...admin.map(item => item.id));
        // return maxId + 1;
    }

    //add_admin
function addAdmin(e){
     e.preventDefault();    
     if(!admUser.fname.trim() || !admUser.lname.trim() || !admUser.email.trim()){
        alert('Please fill the details');
        return;
     }
    if(editMode){
        fetch(`http://localhost:3000/admin`+`/`+`${admUser.id}`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(admUser),
        }).then(res=>res.json()).then((data)=>{setAdmin(prev=>prev.map(a => (a.id == data.id? data : a)));
            setAdmUser({id:'',fname:'',lname:'',email:''});
            setEditMode(false);
        }).catch(err => console.log(err));

    }else{
        const newUser = {...admUser,id:getId().toString()};
    fetch('http://localhost:3000/admin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newUser)
    }).then(res=>res.json()).then(data=>{setAdmUser(data)
        console.log(data);
        setAdmin(prev=>[...prev,data])//view_o/p_while_click_add
        setAdmUser({id:'',fname:'',lname:'',email:''})
    }).catch(err=>console.log(err))
    }
}
//delete_admin
function del(id){
    console.log(id)
    fetch(`http://localhost:3000/admin/${id}`,{
        method:'DELETE'
    }).then(()=>setAdmin(prev=>prev.filter(e => e.id !== id))).catch(err=>console.log(err))
}
function edit(id){
    setAdmUser(id);
    setEditMode(true);
}
const navigate = useNavigate();
function student(){
    navigate('/student')
}
  return (
    <div style={styles.background}>
    <div style={styles.container}>
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 30, maxWidth: '800px', margin: 'auto' }}>
        <h3 style={{ color: '#2c3e50', textAlign: 'center',borderBottom:'1px solid black',paddingBottom:'3px'  }}>
            Admin Data <button type='submit' onClick={student}>Student</button></h3>
        <div style={styles.card}>
        <form style={{ display: 'flex', gap: 10 }}>
            <input type='text' style={inputStyle} placeholder='FirstName' name='fname' value={admUser.fname} onChange={(e)=>setAdmUser({...admUser,fname:e.target.value})}/>&nbsp;
            <input type='text' style={inputStyle}  placeholder='LastName' name='lname' value={admUser.lname} onChange={(e)=>setAdmUser({...admUser,lname:e.target.value})}/>&nbsp;
            <input type='email' style={inputStyle}  placeholder='Email' name='email' value={admUser.email} onChange={(e)=>setAdmUser({...admUser,email:e.target.value})} />&nbsp;
        </form><br/>
        <button type='submit' onClick={addAdmin} style={addBtn}>Add</button>
      </div><br/>
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead style={{ backgroundColor: '#f4f4f4' }}>
            <tr>
                <th style={thStyle}>Id</th>
                <th style={thStyle}>FirstName</th>
                <th style={thStyle}>LastName</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {admin.map(e=>(
                <tr key={e.id}>
                    <td style={tdStyle}>{e.id}</td>
                    <td style={tdStyle}>{e.fname}</td>
                    <td style={tdStyle}>{e.lname}</td>
                    <td style={tdStyle}>{e.email}</td>
                    <td style={tdStyle}>
                        <button type='submit' onClick={()=>edit(e)} style={editBtn}>Edit</button>
                        <button type='submit' onClick={()=>del(e.id)} style={delBtn}>Del</button>
                    </td>
                </tr>
            ))
            }
        </tbody>
      </table>
    
    </div>
    </div> 
    </div>
  )     
}

const styles = {
  background: {
    // backgroundImage: 'url("src/assets/images/caros.jpg")',
    backgroundColor:'slateblue',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '7px',
    maxWidth: '1000px',
    width: '100%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  card: {
    backgroundColor: '#fff',
    padding: '18px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: 'auto',
    marginTop: '10px'
  },
};

const thStyle = { padding: '5px', textAlign: 'left', borderBottom: '1px solid #ddd' };
const tdStyle = { padding: '2px', textAlign: 'left', borderBottom: '1px solid #ddd' };
const inputStyle = { padding: '8px', flex: 1, border: '1px solid #ccc', borderRadius: '4px' };
const addBtn = { backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px',marginLeft: '325px' };
const delBtn = { backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', marginLeft: '5px' };
const editBtn = { backgroundColor: '#ecf0f1', color: '#333', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '4px' };
export default Admprofile
