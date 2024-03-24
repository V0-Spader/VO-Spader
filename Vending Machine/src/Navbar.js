import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar">
        <NavLink exact activeClassName="navbar-active" to="/">
          Home
        </NavLink>
        <NavLink exact activeClassName="navbar-active" to="/lays">
          Lays
        </NavLink>
        <NavLink exact activeClassName="navbar-active" to="/soda">
          Soda
        </NavLink>
        <NavLink exact activeClassName="navbar-active" to="/Coffee">
          Coffee
        </NavLink>
      </nav>
    );
  }
}

export default Navbar;
