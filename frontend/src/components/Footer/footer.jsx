import React from 'react';
import './footer.css'
import logo from '../../assets/logo.png'
import vector from '../../assets/vector.png'
import userIcon from '../../assets/user-icon.png'
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <nav>
        <div>
            <h1 id="love">Made with ♥ by Hack4Impact</h1>
        </div>
      <div class="navFlex">
          <Link to="/"><img src={logo} width="231.22px" height="119px" alt='logo'/></Link>
      </div>
    </nav>
  );
}