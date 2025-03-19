import React, { useEffect, useState, useCallback } from "react";

const B2BAutomations = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Access Request Parsers
  const parseEmailData = useCallback((content, snippet) => {
    return {
      country: extractField(content, /Country:\s*([^\r\n]+)/i),
      email: extractField(snippet, /Email:\s*([^\s]+)/i),
      zipCode: extractField(content, /Zip Code:\s*([^\r\n]+)/i),
    };
  }, []);

  // Quote Request Parsers
  const parseQuoteRequestData = useCallback((content, snippet) => {
    return {
      qCompany: extractField(content, /Company:\s*([^\r\n]+)/i),
      qName: extractField(content, /Name:\s*([^\r\n]+)/i),
      qEmail: extractField(snippet, /Email:\s*([^\s]+)/i),
    };
  }, []);

  const parseNewSaleData = useCallback((content) => {
    return {
      nCompany: extractField(content, /Company:\s*([^\r\n]+)/i),
      nOrderNumber: extractField(content, /Order Number:\s*([^\r\n]+)/i),
    };
  }, []);

  const extractField = (text, regex) => {
    const match = text.match(regex);
    return match ? match[1].trim() : "N/A";
  };

  const fetchEmails = useCallback(async () => {
    const token = localStorage.getItem("gmailAccessToken");
    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=2000",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();

      if (!data.messages) return;

      const emailDetails = await Promise.all(
        data.messages.map(async (email) => {
          const emailRes = await fetch(
            `https://www.googleapis.com/gmail/v1/users/me/messages/${email.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const emailData = await emailRes.json();

          const subject =
            emailData.payload.headers.find((h) => h.name === "Subject")
              ?.value || "";

          const body = decodeEmailBody(emailData.payload);

          if (subject === "Access Request") {
            return {
              id: email.id,
              subject,
              snippet: body || emailData.snippet,
              data: parseEmailData(body, emailData.snippet),
            };
          }

          if (subject === "User Request Quote") {
            return {
              id: email.id,
              subject,
              snippet: body || emailData.snippet,
              data: parseQuoteRequestData(body, emailData.snippet),
            };
          }

          if (subject === "New Sale") {
            return {
              id: email.id,
              subject,
              snippet: body || emailData.snippet,
              data: parseNewSaleData(body),
            };
          }

          return null;
        })
      );

      setEmails(emailDetails.filter(Boolean));
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  }, [parseEmailData, parseQuoteRequestData, parseNewSaleData]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const decodeEmailBody = (payload) => {
    if (payload.parts) {
      return payload.parts
        .map((part) =>
          part.body.data
            ? atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"))
            : ""
        )
        .join("");
    } else if (payload.body?.data) {
      return atob(payload.body.data.replace(/-/g, "+").replace(/_/g, "/"));
    }
    return "";
  };

  // Separate email types
  const accessRequests = emails.filter((e) => e.subject === "Access Request");
  const quoteRequests = emails.filter(
    (e) => e.subject === "User Request Quote"
  );
  const newSales = emails.filter((e) => e.subject === "New Sale");

  const renderEmailList = (emailList, type) => (
    <div style={{ marginTop: "50px" }}>
      {emailList.map((email) => (
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
            {type === "access" && (
              <>
                {email.data.country.replace(/\*\*Â/g, "")} -{" "}
                {email.data.email.replace(/\*\*Â/g, "")} /{" "}
                {email.data.zipCode.replace(/\*\*Â/g, "")}
              </>
            )}
            {type === "quote" && (
              <>
                {email.data.qCompany.replace(/\*\*Â/g, "")} -{" "}
                {email.data.qName.replace(/\*\*Â/g, "")} /{" "}
                {email.data.qEmail.replace(/\*\*Â/g, "")}
              </>
            )}
            {type === "sale" && (
              <>
                {email.data.nCompany.replace(/\*\*Â/g, "")} -{" "}
                {email.data.nOrderNumber.replace(/Â/g, "")}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h3 style={{ marginTop: "220px" }}>Access Request</h3>
      {renderEmailList(accessRequests, "access")}

      <h3 style={{ marginTop: "50px" }}>Quote Request</h3>
      {renderEmailList(quoteRequests, "quote")}

      <h3 style={{ marginTop: "50px" }}>New Sales</h3>
      {renderEmailList(newSales, "sale")}

      {selectedEmail && (
        <div
          style={{
            marginLeft: "0px",
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <h4>Full Email Details</h4>
          <div style={{ marginTop: "10px" }}>
            {selectedEmail.subject === "Access Request" && (
              <>
                <div>
                  <strong>Country:</strong> {selectedEmail.data.country}
                </div>
                <div>
                  <strong>Email:</strong> {selectedEmail.data.email}
                </div>
                <div>
                  <strong>Zip Code:</strong> {selectedEmail.data.zipCode}
                </div>
              </>
            )}
            {selectedEmail.subject === "User Request Quote" && (
              <>
                <div>
                  <strong>Company:</strong> {selectedEmail.data.qCompany}
                </div>
                <div>
                  <strong>Email:</strong> {selectedEmail.data.qEmail}
                </div>
                <div>
                  <strong>Name:</strong> {selectedEmail.data.qName}
                </div>
              </>
            )}
            {selectedEmail.subject === "New Sale" && (
              <>
                <div>
                  <strong>Company:</strong> {selectedEmail.data.nCompany}
                </div>
                <div>
                  <strong>Order Number:</strong>
                  {""}
                  {selectedEmail.data.nOrderNumber}
                </div>
              </>
            )}
          </div>
          <pre
            style={{
              backgroundColor: "black",
              marginTop: "20px",
              padding: "1px",
            }}
          ></pre>
        </div>
      )}
    </div>
  );
};

export default B2BAutomations;
