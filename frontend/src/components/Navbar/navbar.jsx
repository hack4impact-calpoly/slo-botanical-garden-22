import React from 'react';
import './navbar.css'
import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/"><img src="../../assets/logo.png" alt='logo'/></Link>
      <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">Profile</Link></li>
      </ul>
    </nav>
  );
}