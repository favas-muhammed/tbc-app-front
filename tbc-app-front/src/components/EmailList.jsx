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
          const emailData = await emailResponse.json();
          const sender = emailData.payload.headers.find(
            (header) => header.name === "From"
          ).value;
          const subject = emailData.payload.headers.find(
            (header) => header.name === "Subject"
          ).value;
          return { id: email.id, sender, subject, snippet: emailData.snippet }; // Include sender and subject
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
          <li key={email.id}>
            <strong>From:</strong> {email.sender} <br />
            <strong>Subject:</strong> {email.subject} <br />
            {email.snippet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
