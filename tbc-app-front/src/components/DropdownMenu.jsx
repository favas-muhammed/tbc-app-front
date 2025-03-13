import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const menuStyle = {
    position: "absolute",
    left: "10px",
    top: "10px",
  };

  const dropdownStyle = {
    position: "absolute",
    left: "10px",
    top: "50px", // Increased this value to move the dropdown lower
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    zIndex: 1000,
  };

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("gmailAccessToken");
    window.location.href = "/auth/gmail"; // Redirect to login
  };

  return (
    <div>
      <button style={menuStyle} onClick={toggleMenu}>
        MENU ☰
      </button>

      {isOpen && (
        <div style={dropdownStyle}>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li
              style={{ cursor: "pointer", padding: "5px 0" }}
              onClick={() => navigate("/b2b-automations")}
            >
              B2B Automations
            </li>
            <li
              style={{ cursor: "pointer", padding: "5px 0" }}
              onClick={() => navigate("/b2c-automations")}
            >
              B2C Automations
            </li>
            <li style={{ cursor: "default", padding: "5px 0" }}>About</li>
            <li
              style={{ cursor: "pointer", padding: "5px 0" }}
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
