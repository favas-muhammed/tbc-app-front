import React, { useEffect, useState } from "react";

const B2BAutomations = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Helper function to parse email data
  const parseEmailData = (content, snippet) => {
    return {
      country: extractCountry(content),
      email: extractEmail(snippet),
      zipCode: extractZipCode(content),
    };
  };

  // Extract country from text
  const extractCountry = (text) => {
    const countryRegex = /Country:\s*([^\r\n]+)/i;
    const match = text.match(countryRegex);
    return match ? match[1].trim() : "N/A";
  };

  // Extract zip code from text
  const extractZipCode = (text) => {
    const zipCodeRegex = /Zip Code:\s*([^\r\n]+)/i;
    const match = text.match(zipCodeRegex);
    return match ? match[1].trim() : "N/A";
  };

  // Extract email from text
  const extractEmail = (text) => {
    const emailRegex = /Email:\s*([^\s]+)/i;
    const match = text.match(emailRegex);
    return match ? match[1].trim() : "N/A";
  };

  // Fetch emails from Gmail API
  useEffect(() => {
    const fetchEmails = async () => {
      const token = localStorage.getItem("gmailAccessToken");
      if (!token) {
        console.error("No access token found.");
        return;
      }

      try {
        // Fetch unread emails
        const response = await fetch(
          "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=2000",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (!data.messages) {
          console.log("No unread messages found.");
          return;
        }

        // Fetch details for each email
        const emailDetails = await Promise.all(
          data.messages.map(async (email) => {
            if (!email) return null;

            const emailResponse = await fetch(
              `https://www.googleapis.com/gmail/v1/users/me/messages/${email.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const emailData = await emailResponse.json();

            if (!emailData.payload) return null;

            // Decode the full email body
            let body = "";
            if (emailData.payload.parts) {
              body = emailData.payload.parts
                .map((part) =>
                  part.body.data
                    ? atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"))
                    : ""
                )
                .join("");
            } else if (emailData.payload.body && emailData.payload.body.data) {
              body = atob(
                emailData.payload.body.data
                  .replace(/-/g, "+")
                  .replace(/_/g, "/")
              );
            }

            // Find the subject of the email
            const subjectHeader = emailData.payload.headers.find(
              (header) => header.name === "Subject"
            );
            const subject = subjectHeader ? subjectHeader.value : "";

            if (subject !== "Access Request") return null;

            return {
              id: email.id,
              snippet: body || emailData.snippet,
              data: parseEmailData(
                body || emailData.snippet,
                emailData.snippet
              ),
            };
          })
        );

        // Filter out null results and update state
        setEmails(emailDetails.filter((email) => email !== null));
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
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
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
            onClick={() => setSelectedEmail(email)}
          >
            <div>
              {email.data.country.replace(/\*\*Â/g, "")} -{" "}
              {email.data.email.replace(/\*\*Â/g, "")} /{" "}
              {email.data.country.replace(/\*\*Â/g, "")} -{" "}
              {email.data.zipCode.replace(/\*\*Â/g, "")}
            </div>
          </div>
        ))}
        <h3 style={{ marginTop: "50px" }}>Quote Request</h3>
        <h3 style={{ marginTop: "50px" }}>New Sales</h3>
      </div>

      {selectedEmail && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h4>Full Email Details</h4>
          <div style={{ marginTop: "10px" }}>
            <div>
              <strong>Country:</strong> {selectedEmail.data.country}
            </div>
            <div>
              <strong>Email:</strong> {selectedEmail.data.email}
            </div>
            <div>
              <strong>Zip Code:</strong> {selectedEmail.data.zipCode}
            </div>
          </div>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#ccc",
              border: "1px solid #ddd",
            }}
          >
            {selectedEmail.snippet}
          </pre>
        </div>
      )}
    </div>
  );
};

export default B2BAutomations;
