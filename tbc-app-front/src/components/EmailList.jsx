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
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=2000",

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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "10px",
        }}
      >
        {emails.map((email) => (
          <div
            key={email.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <strong>From:</strong> {email.sender} <br />
            <strong>Subject:</strong> {email.subject} <br />
            <strong>Labels:</strong> {email.labels.join(", ")} <br />{" "}
            {/* Display labels */}
            {email.snippet}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailList;
