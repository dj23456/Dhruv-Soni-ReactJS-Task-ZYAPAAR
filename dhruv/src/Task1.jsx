import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  {Modal , Button}  from 'react-bootstrap';

function Task1() {

    useEffect(()=>{
        getdata();
    },[]);

    const [show,setShow]=useState(false);

    const handleshow = () => setShow(true);
    const handleclose = () => setShow(false);

    const [data,setData]=useState([]);

    const getdata =async () =>{
        const res =await axios.get('https://task-94bac-default-rtdb.firebaseio.com/user.json');
        console.log(res);
        if(res.status===200){
            setData(res.data);
        }
    }

    const deletedata =async (id) => {
        const res=await axios.delete(`https://task-94bac-default-rtdb.firebaseio.com/user/${id}.json`)
        console.log(res);
        if(res.status===200){
            getdata();
        }
    }

    const [formvalue1,setFormvalue1] = useState({
        firstname:"",
        lastname:"",
        email:"",
    });

    const [userid,setUserid]=useState({});

    const edithandle = async (id) =>{
        const res=await axios.get(`https://task-94bac-default-rtdb.firebaseio.com/user/${id}.json`)
        if(res.status===200){
            setFormvalue1(res.data);
            setUserid(id);
            handleshow();
        }
    }

    const onchangehandle=(e)=>{
        setFormvalue1({...formvalue1,[e.target.name] : e.target.value});
    }

    const updatehandle = async (e) =>{
        const res=await axios.patch(`https://task-94bac-default-rtdb.firebaseio.com/user/${userid}.json`,formvalue1);
        if(res.status===200){
            setFormvalue1({firstname:"",lastname:"",email:""});
            getdata();
            handleclose();
        }
    }


  return (
    <>
    <div>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>firstname</th>
                    <th>lastname</th>
                    <th>email</th>
                    <th>delet</th>
                    <th>edit</th>
                </tr>
            </thead>
            <tbody>
                {
                Object.keys(data).map((item,i) => {
                    return(
                        <tr>
                            <td>{i+1}</td>
                            <td>{data[item].firstname}</td>
                            <td>{data[item].lastname}</td>
                            <td>{data[item].email}</td>
                            <td><button onClick={()=>deletedata(item)}>delete</button></td>
                            <td><button onClick={()=>edithandle(item)}>edit</button></td>

                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    </div>

    <Modal show={show} onHide={handleclose}> 
            <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
            </Modal.Header>   
            <Modal.Body>
            <div className='task'>
    <label>Firstname : </label>
    <input type='text' name='firstname' className='tx1' onChange={onchangehandle} value={formvalue1.firstname}></input>   
    </div>
    <div className='task'>
    <label>Lastname : </label>
    <input type='text' name='lastname' className='tx2' onChange={onchangehandle} value={formvalue1.lastname}></input>   
    </div>
    <div className='task'>
    <label>Email : </label>
    <input type='email' name='email' className='tx3' onChange={onchangehandle} value={formvalue1.email}></input>   
    </div>    
  
            </Modal.Body> 
            <Modal.Footer>
          <Button variant="secondary" onClick={handleclose}>Close</Button>
          <Button variant="primary" onClick={updatehandle}>Save changes</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default Task1