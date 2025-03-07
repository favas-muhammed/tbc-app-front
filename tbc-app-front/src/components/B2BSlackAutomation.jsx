import React, { useEffect } from "react";

const B2BSlackAutomation = () => {
  useEffect(() => {
    // Fetch emails or perform any necessary actions here
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

    fetchEmails();
  }, []);

  return (
    <div>
      <h1>B2B Slack Automation</h1>
      <div className="request-box">
        <h2>Access Request</h2>
        <h2>Quote Request</h2>
        <h2>New Sales</h2>
      </div>
    </div>
  );
};

export default B2BSlackAutomation;
