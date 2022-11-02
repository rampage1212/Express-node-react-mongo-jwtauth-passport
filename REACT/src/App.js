import React,{useEffect,useState} from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Nav from './components/Nav';
import AboutUs from './components/aboutus';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {


  //state
  const [isLogged,setLogged] = useState(false);


//useEffect


  return (
    <Router>
    <div className="App">
      <Nav  isLogged={isLogged} setLogged={setLogged} />
      <Switch>
        <Route path="/" exact component={Home}  />
       <Route path="/login" component={()=>  <Login isLogged={isLogged} setLogged={setLogged} /> }/>
       <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard}  />
        <Route pth="/aboutus" component={AboutUs} />
      </Switch>
    </div>
      
    </Router>
  );
}

export default App;
