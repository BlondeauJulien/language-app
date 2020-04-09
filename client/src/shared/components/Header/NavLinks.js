import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to={`/`}>
          <i className="fas fa-home"></i>
          <span className="nav-link-text">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={`/create`}>
          <i className="fas fa-plus"></i>
          <span className="nav-link-text">Create</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={`/profile`}>
          <i className="fas fa-user"></i>
          <span className="nav-link-text">Profile</span>
        </NavLink>
      </li>
    </ul>
  )
}

export default NavLinks
