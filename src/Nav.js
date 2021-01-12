import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
function Nav(){
const navStyle ={
    color: 'white'

}
return(
    <nav>
        <h3>COVID-19 Tracker</h3>
        <ul className="nav-links">
            <Link style={navStyle} to="/">
                <li>HOME</li>
            </Link>
            <Link style={navStyle} to="/Manager" >
                <li  >PAGE MANAGERS</li>
            </Link>
        </ul>


    </nav>
)
}
export default Nav;