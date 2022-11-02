import React, { useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

function Register() {

  const [error,setError] = useState('');
  const[hasRegistered,setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handlingChangeEvent = (e) => {

    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]:value
    }));
    
  };
  
  
  const submitEventHandler = async (e) => {
    e.preventDefault();
    setError('');
    //passing data to server
    await registerUser();
  };

  const registerUser = async ()=>{

    const user = {
      name:formData.name,
      email:formData.email,
      password:formData.password
    };

    document.getElementById("registerForm").reset();

  try{
    const result = await axios.post('http://localhost:3500/api/user/register',user);
    setRegistered(true);
  } catch(err){
    setError(err.response.data);
    //alert(err.response.data);
   }     
  }


  
  return (
    <div className="Login">
      <div className="container">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <form id="registerForm" className="form-signin" onSubmit={submitEventHandler}>
              <h2 id="heading" className="form-signin-heading">
                <strong>Sign Up</strong>
              </h2>

              <div className="form-group">
                <label htmlFor="email" className="sr-only">
                  Name
                </label>
                <input
                  onChange={handlingChangeEvent}
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={handlingChangeEvent}
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={handlingChangeEvent}
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <button className="btn btn-lg btn-primary btn-block" type="submit">
                Sign Up
              </button>
              <h6 style={{color:'red',marginTop:'20px'}} > {error ? error: ""} </h6>
              <h6 style={{color:'green'}}> {hasRegistered ? 'Successfully Registered !' :''} </h6>
              <ShowLoginButton hasRegistered = {hasRegistered}/>            
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowLoginButton({hasRegistered}){
  
  const buttonStyle= {
    backgroundColor:'#78D5D7',
    borderRadius:'5px',
    padding:'6px',
    textDecoration:'none',
    color:'white' 
  }

  if(hasRegistered){
  return(
    <div>   
      <span style={buttonStyle}><Link to="login">Log In </Link></span> 
    </div>
  );
  }else{
    return(
      <div >   
    
    </div>
    );
  }
}

export default Register;
