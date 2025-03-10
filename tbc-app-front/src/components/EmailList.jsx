import React, { useEffect, useState } from "react";

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const emailListStyle = {
    marginTop: "150px", // Add margin to push emails down
  };

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
          const labels = emailData.labelIds; // Fetch labels for the email
          return {
            id: email.id,
            sender,
            subject,
            snippet: emailData.snippet,
            labels,
          }; // Include sender, subject, and labels
        })
      );
      setEmails(emailDetails); // Store the fetched email details
    };

    fetchEmails();
  }, []);

  return (
    <div style={emailListStyle}>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            <strong>From:</strong> {email.sender} <br />
            <strong>Subject:</strong> {email.subject} <br />
            <strong>Labels:</strong> {email.labels.join(", ")} <br />{" "}
            {/* Display labels */}
            {email.snippet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
