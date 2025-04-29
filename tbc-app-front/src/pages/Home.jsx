import React, { useEffect, useState } from "react";

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("gmailAccessToken");
      if (!token) {
        setProfile(null);
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
          setProfile(null);
          return;
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile info", error);
        setProfile(null);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Please log in to see your profile information.</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        padding: "20px",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* First column: Profile */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <img
          src={profile.picture}
          alt="Profile"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <h3 style={{ marginTop: "10px" }}>{profile.name}</h3>
        <p>{profile.email}</p>
      </div>

      {/* Second column: Placeholder */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        {/* Placeholder content */}
      </div>

      {/* Third column: Placeholder */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        {/* Placeholder content */}
      </div>
    </div>
  );
};

export default Home;
