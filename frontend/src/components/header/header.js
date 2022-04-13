import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";

function Header(props) {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <NavLink to="/">
              <p class="nav-link">Home</p>
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink to="/employee">
              <p class="nav-link">Employee</p>
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink to="/material">
              <p class="nav-link">Material</p>
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink to="/product">
              <p class="nav-link">Product</p>
            </NavLink>
          </li>
          <li class="nav-item">
            <p class="nav-link">balance: {props.balance}</p>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
