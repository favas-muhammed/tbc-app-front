import React from "react";
import "./Navbar.css"; // Importing the CSS file for navbar styles

const Navbar = ({ onLoginClick, onLogoutClick, onHomeClick, onToolsClick }) => {
  return (
    <div className="navbar">
      <h1>The Brand Collector</h1>
      <button onClick={onHomeClick}>Home</button>
      <div className="dropdown">
        <button onClick={onToolsClick}>Tools</button>
        <div className="dropdown-content">
          <a href="/b2b-slack-automation">B2B Slack Automation</a>
          <a href="/b2c-slack-automation">B2C Slack Automation</a>
        </div>
      </div>
      <button onClick={onLoginClick}>Login</button>
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
};

export default Navbar;
