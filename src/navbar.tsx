import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/SAlogo.png';
import './navbar.css';

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light'>
      <div className='container'>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Sky Airlines" className="logo-img" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className='navbar-nav'>
            <li className="nav-item"><Link to="/" className="nav-link" style={{ fontFamily: "'Oswald', sans-serif" }}>Home</Link></li> 
            <li className="nav-item"><Link to="/about" className="nav-link" style={{ fontFamily: "'Oswald', sans-serif" }}>About</Link></li> 
            <li className="nav-item"><Link to="/signup" className="nav-link" style={{ fontFamily: "'Oswald', sans-serif" }}>Sign Up</Link></li> 
          </ul>
        </div>
      </div>
    </nav>
  );   
}

export default Navbar;
