import React, { useEffect } from "react";

const B2CSlackAutomation = () => {
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
      <h1>B2C Slack Automation</h1>
      {/* Additional content for B2C Slack Automation */}
    </div>
  );
};

export default B2CSlackAutomation;
