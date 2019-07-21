import React, { Component } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";

function Nav({ props }) {
  return (
    <nav className="navbar" role="navigation" aria-label="dropdown navigation">
      <a className="navbar-item">
        ***DOPE COFFEE NAME***
      </a>
    <div className="navbar-item has-dropdown is-active">
        <a className="navbar-link">
        Stuff
        </a>
      <div className="navbar-dropdown">
        <a className="navbar-item">
        Login
        </a>
        <a className="navbar-item">
            Find Coffee
         </a>
        <a className="navbar-item">
            Add Drinks
        </a>
      </div>
    </div>
    </nav>

  );
}
      
export default Nav;
