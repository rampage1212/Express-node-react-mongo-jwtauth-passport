import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.png';

class Nav extends React.Component{
  

  render(){

    const isLogged = this.props.isLogged;
    const logout = ()=>{
        this.props.setLogged(false);
    }
      
    if(isLogged){
      return (
        <div>
          <nav>
            <Link to="/home"> <img src={logo} width='50px' height='50px'></img></Link>
            <ul className="navLinks">
              <Link to="/aboutus">
              <li  style={{color:'#fffafa'}}>About Us</li>
              </Link>
              <Link to="/login" onClick={logout} >
              <li  style={{color:'#fffafa'}}>Logout</li>
              </Link>
            
            </ul>
          </nav>
        </div>
      );
    }
    else{
      return (
        <div>
          <nav>
          <img src={logo} width='50px' height='50px'></img>
            <ul className="navLinks">
          
              <Link to="/login">
                <li style={{color:'#fffafa'}}>LogIn</li>
              </Link>
              <Link to="/register">
                <li  style={{color:'#fffafa'}}>Sign Up</li>
              </Link>
          
            </ul>
          </nav>
      
        </div>
      );
    }

  
}

}

export default Nav;
