import React, { useEffect, useState } from "react";

const EmailList = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
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
      setEmails(data.messages || []); // Store the fetched emails
    };

    fetchEmails();
  }, []);

  return (
    <div>
      <h1>Email List</h1>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>{email.id}</li> // Display email IDs for now
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
