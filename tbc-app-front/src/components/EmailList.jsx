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
      const emailDetails = await Promise.all(
        data.messages.map(async (email) => {
          const emailResponse = await fetch(
            `https://www.googleapis.com/gmail/v1/users/me/messages/${email.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return await emailResponse.json();
        })
      );
      setEmails(emailDetails); // Store the fetched email details
    };

    fetchEmails();
  }, []);

  return (
    <div>
      <h1>Inbox</h1>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>{email.snippet}</li> // Display email snippets
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
