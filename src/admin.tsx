import React from 'react';
import { Link } from 'react-router-dom';


function Admin(){
 return (
    <div className='navbar'>
        <div className='navbar-logo'>
            Sky Air
        </div>

        <ul className='navbar-menu'>
            <li><Link to="/">Home</Link></li> 
            <li><Link to="/">About</Link></li> 
        </ul>

    </div>
  );   
}
export default Admin;
