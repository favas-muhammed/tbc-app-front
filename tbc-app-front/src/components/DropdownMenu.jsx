import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const menuStyle = {
    position: "absolute",
    left: "10px",
    top: "10px",
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
        <div className="dropdown">
          <ul style={{ display: isOpen ? "block" : "none" }}>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/b2b-automations")}
            >
              B2B Automations
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/b2c-automations")}
            >
              B2C Automations
            </li>

            <li style={{ cursor: "default" }}>About</li>
            <li style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
