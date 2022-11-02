import React,{useState} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function Login({isLogged,setLogged}) {

   const [error,setError] = useState('');
 
    //Setting initial values of form data to null
    const [formData,setFormData] = useState({
        'email':"",
        'password':""
    });

    
    
    const handlingChangeEvent = (e)=>{

        const {name,value} = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]:value
        }) );

    }

    const submitEventHandler = async (e) =>{

        e.preventDefault();
       await checkUserFromServer(); //sending data to server
    }

    let history = useHistory();
    const checkUserFromServer =  async () =>{

      const user = {
        email:formData.email,
        password:formData.password
      };

    try{
      const result = await axios.post('http://localhost:3500/api/user/login',user);
      setLogged(true);
      history.push(
        {
          pathname:'/dashboard',
          state:result.data
        }
      );
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
              <form
            className="form-signin "
            onSubmit={submitEventHandler}
          >
           
          <h2 id="heading" className="form-signin-heading">
                <strong>Log in</strong>
              </h2>
        
            <div className="form-group">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
                onChange={handlingChangeEvent}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
                onChange={handlingChangeEvent}
              />
            </div>

            <button className="btn btn-lg btn-primary btn-block" type="submit" >
              Sign in
            </button>
            <h6 style={{color:'red',marginTop:'20px'}} > {error ? error: error} </h6>
          </form>
              </div>
                     
 
          </div>
   
      </div>
    </div>
  );
}

export default Login;
