import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
 

 
  return (
    <nav className="navbar">
      <h1>Blog App</h1>
      <div className="links">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>          
       
      </div>
    </nav>
  );
};

export default Navbar;