import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthButton from "./components/AuthButton.jsx";
import DropdownMenu from "./components/DropdownMenu.jsx";

import EmailList from "./components/EmailList.jsx";
import EmailDetail from "./components/EmailDetail.jsx";
import B2BAutomations from "./pages/B2BAutomations.jsx";

const CLIENT_ID =
  "514206722532-f3rnvl2mhreb5ndgcdcd0irrvtjp4u2g.apps.googleusercontent.com"; // Replace with your client ID
const REDIRECT_URI = "http://localhost:5173/auth/callback"; // Your redirect URI

function App() {
  const handleGmailAuth = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/gmail.readonly`;
    window.location.href = authUrl; // Redirect to Google authentication
  };

  useEffect(() => {
    // Check if the URL contains an access token
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        localStorage.setItem("gmailAccessToken", token); // Store the token
        console.log(token); // Log the access token for debugging
        fetchEmails(); // Call the function to fetch emails after successful login
        window.location.href = "/"; // Redirect to home after successful login
      }
    }
  }, []);

  const fetchEmails = async () => {
    const token = localStorage.getItem("gmailAccessToken");
    const response = await fetch(
      "https://www.googleapis.com/gmail/v1/users/me/messages",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data); // Log the fetched emails for now
  };

  return (
    <Router>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <DropdownMenu />
        <h1>Velocity</h1>

        <AuthButton onClick={handleGmailAuth} />
      </div>

      <Routes>
        <Route path="/b2b-automations" element={<B2BAutomations />} />

        <Route path="/" element={<EmailList />} />
        <Route path="/email/:id" element={<EmailDetail />} />
        <Route path="/auth/gmail" element={<div></div>} />
        <Route
          path="/auth/callback"
          element={<div>Handling callback...</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
