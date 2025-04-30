import React, { useEffect, useState } from "react";

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "#888",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Profile</h3>
        {email ? (
          <p>
            <strong>Mail ID:</strong>
            <br />
            {email}
          </p>
        ) : (
          <p>Please log in to see your Mail ID.</p>
        )}
      </div>

      {/* Grid 2: Messages */}
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "32px 24px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "#888",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Messages</h3>
        <p>No messages yet.</p>
      </div>

      {/* Grid 3: Online */}
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
      </div>
    </div>
  );
};

export default Home;
