import React, { useEffect, useState } from "react";
import tbc from "../assets/tbc.png";

const Home = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      const token = localStorage.getItem("gmailAccessToken");
      if (!token) {
        setEmail(null);
        return;
      }
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          setEmail(null);
          return;
        }
        const data = await response.json();
        setEmail(data.email);
      } catch (error) {
        console.error("Failed to fetch email", error);
        setEmail(null);
      }
    };

    fetchEmail();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 430px)",
        gap: "40px",
        marginTop: "200px",
        minHeight: "calc(100vh - 100px)",
        padding: "65px",
        background: "transparent",
        alignItems: "stretch",
        boxSizing: "content-box",
      }}
    >
      {/* Grid 1: Profile */}
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "32px 24px",

          textAlign: "center",
          background: "#fff",
          //  display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "#888",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Profile</h3>
        <a
          href="https://backoffice2.thebrandcollector.com/"
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          The Brand Collector
        </a>
        <img
          src={tbc}
          alt="Profile"
          style={{
            maxWidth: "100%",
            margin: "16px auto 0",
            display: "block",
          }}
        />
      </div>

      {/* Grid 2: Messages */}
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "32px 24px",
          background: "#fff",
          //display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "#888",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Dashboard</h3>
        <p>...</p>
      </div>

      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "32px 24px",
          background: "#fff",
          //display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "#888",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Suggestions</h3>
        <textarea rows="10" cols="40"></textarea>
        <button
          style={{
            marginTop: "520px",
            marginLeft: "-100px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Send{" "}
        </button>
      </div>
    </div>
  );
};

export default Home;
