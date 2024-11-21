import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      {/* Heading */}
      <div className="navbar-header">
        <h2>Energy Meter Dashboard</h2>
      </div>

      {/* Logo and Pages */}
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <span className="logo">🔋</span> Dashboard
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/control-panel" className="navbar-link">
            <span className="logo">⚙️</span> Power
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/settings" className="navbar-link">
            <span className="logo">⚙️</span> Settings
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/phases" className="navbar-link">
            <span className="logo">⚙️</span> Three Phase
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
