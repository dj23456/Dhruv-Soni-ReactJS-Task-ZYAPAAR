import React, { useState } from 'react';
import axios from 'axios';
// import { NavLink } from 'react-router-dom';

function Task() {

    const [formvalue, setFormvalue] = useState({
        firstname: "",
        lastname: "",
        email: ""
    });

    const onchange = (e) => {
        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });

    }


    const submitData = async () => {
        const res = await axios.post('https://task-94bac-default-rtdb.firebaseio.com/user.json', formvalue);
        if (res.status === 200) {
            setFormvalue({ ...formvalue, firstname: "", lastname: "", email: "" });
        }
    }

    return (
        <>
            <div className='task'>
                <label>Firstname : </label>
                <input type='text' name='firstname' className='tx1' onChange={onchange} value={formvalue.firstname}></input>
            </div><br></br>
            <div className='task'>
                <label>Lastname : </label>
                <input type='text' name='lastname' className='tx2' onChange={onchange} value={formvalue.lastname}></input>
            </div><br></br>
            <div className='task'>
                <label>Email : </label>
                <input type='email' name='email' className='tx3' onChange={onchange} value={formvalue.email}></input>
            </div>
            <br></br>
            <div>
                <button onClick={submitData}>submit</button>
                {/* <NavLink><button to="/task1">Show Data</button></NavLink> */}
            </div>
        </>
    )
}

export default Task