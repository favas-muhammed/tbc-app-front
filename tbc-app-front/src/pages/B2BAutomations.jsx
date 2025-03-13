import React, { useEffect, useState } from "react";
import EmailList from "../components/EmailList.jsx";

const B2BAutomations = () => {
  const [emails, setEmails] = useState([]);

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
          if (!emailData.payload) {
            return null; // Skip if payload is undefined
          }
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
      const filteredEmails = emailDetails.filter((email) => email !== null); // Filter out null values
      setEmails(filteredEmails); // Store the fetched email details
    };

    fetchEmails();
  }, []);

  return (
    <div>
      <h3 style={{ marginTop: "220px" }}>Access Request</h3>
      <div style={{ marginTop: "50px" }}>
        {emails.map((email) => (
          <div
            key={email.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <strong>From:</strong> {email.sender} <br />
            <strong>Subject:</strong> {email.subject} <br />
            <strong>Labels:</strong> {email.labels.join(", ")} <br />
            {email.snippet}
          </div>
        ))}
      </div>
      <h3>Quote Request</h3>

      <div style={{ marginTop: "50px" }}>
        {emails.map((email) => (
          <div
            key={email.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <strong>From:</strong> {email.sender} <br />
            <strong>Subject:</strong> {email.subject} <br />
            <strong>Labels:</strong> {email.labels.join(", ")} <br />
            {email.snippet}
          </div>
        ))}
      </div>
      <h3>New Sales</h3>
      <div style={{ marginTop: "50px" }}>
        {emails.map((email) => (
          <div
            key={email.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <strong>From:</strong> {email.sender} <br />
            <strong>Subject:</strong> {email.subject} <br />
            <strong>Labels:</strong> {email.labels.join(", ")} <br />
            {email.snippet}
          </div>
        ))}
      </div>
    </div>
  );
};

export default B2BAutomations;
