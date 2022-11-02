import React from 'react';


function Dashboard(props){



return(
    <div className="Dashboard">
       <h2>Welcome {props.location.state.name}</h2>
    </div>

);

}

export default Dashboard;