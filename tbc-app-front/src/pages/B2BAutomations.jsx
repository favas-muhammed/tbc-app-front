import React, { useEffect, useState, useCallback } from "react";
import countryCodes from "../assets/countryCode";
import kamName from "../assets/kamName";
import companyKAM from "../assets/companyKAM";
import companyCountry from "../assets/companyCountry";
import zipCodeKAM from "../assets/zipCodeKAM";

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
  }, []); // Quote Request Parsers
  const parseQuoteRequestData = useCallback((content, snippet) => {
    return {
      qCompany: extractField(snippet, /Company:\s*([^\r\n]+)/i)
        .split("Full Name")[0]
        .trim(),
      qName: extractField(content, /Name:\s*([^\r\n]+)/i),
      qEmail: extractField(snippet, /Email:\s*([^\s]+)/i),
    };
  }, []);

  const parseNewSaleData = useCallback((content, snippet) => {
    return {
      nCompany: extractField(
        snippet,
        /Company([^-]+(?:-[^-]+)*?)(?:\s+-[a-f0-9-]+)/i
      ).trim(),
      nOrderNumber: extractField(content, /Order Number:\s*([^\r\n]+)/i),
    };
  }, []);

  const extractField = (text, regex) => {
    const match = text.match(regex);
    return match ? (match ? match[1].trim() : "N/A") : "N/A"; // Modified to return "N/A" if no match
  };

  const fetchEmails = useCallback(async () => {
    const token = localStorage.getItem("gmailAccessToken");
    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=2000",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await new Promise((resolve) => setTimeout(resolve, 3000)); // Further increased delay to avoid rate limiting

      const data = await response.json();

      if (!data.messages) return;

      const emailDetails = await Promise.all(
        data.messages.map(async (email) => {
          const emailRes = await fetch(
            `https://www.googleapis.com/gmail/v1/users/me/messages/${email.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const emailData = await emailRes.json();
          if (!emailData.payload) {
            console.error(
              "Email data is missing payload for email ID:",
              email.id,
              emailData
            );
            return {
              id: email.id,
              subject: "Unknown",
              snippet: "No snippet available",
              data: {
                country: "N/A",
                email: "N/A",
                zipCode: "N/A",
              },
            }; // Return a default structure for emails without payload
          }
          const subject =
            emailData.payload.headers.find((h) => h.name === "Subject")
              ?.value || "";
          const body = decodeEmailBody(emailData.payload);
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Increased delay to avoid rate limiting

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
              data: parseNewSaleData(body, emailData.snippet),
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

  const getCountryCode = (countryName) => {
    const cleanedCountryName = countryName?.replace(/\*\*Â/g, "").trim(); // Clean the input
    return countryCodes[cleanedCountryName] || countryName || "N/A"; // Return "N/A" if no match
  };

  const getKAM = (countryName) => {
    const cleanedCountryName = countryName?.replace(/\*\*Â/g, "").trim(); // Clean the input
    return kamName[cleanedCountryName] || "N/A"; // Return "N/A" if no match
  };

  const getcompanyKAM = (companyName) => {
    const cleanedCompanyName = companyName?.replace(/\*\*Â/g, "").trim();
    return companyKAM[cleanedCompanyName] || "N/A";
  };

  const getCompanyCountry = (companyName) => {
    const cleanedCompanyCountry = companyName?.replace(/\*\*Â/g, "").trim();
    return companyCountry[cleanedCompanyCountry] || "N/A";
  };

  const getZipCodeKAM = (zipCode) => {
    const cleanedZipCode = zipCode?.replace(/\*\*Â/g, "").trim();
    return zipCodeKAM[cleanedZipCode] || "N/A";
  };

  const renderEmailList = (emailList, type) => (
    <div style={{ marginTop: "50px" }}>
      {emailList.map((email) => {
        let countryCode = "N/A";
        let kam = "N/A";
        let companyKAMName = "N/A";
        let companyCountryName = "N/A";

        if (type === "access") {
          // Extract, clean, and get the country code

          const cleanedCountry = email.data.country
            ?.replace(/\*\*Â/g, "")
            .trim();
          countryCode = getCountryCode(cleanedCountry);
          kam = getKAM(cleanedCountry);
        } else if (type === "quote") {
          companyKAMName = getcompanyKAM(email.data.qCompany);
          companyCountryName = getCompanyCountry(email.data.qCompany); // Get company country
        } else if (type === "sale") {
          companyKAMName = getcompanyKAM(email.data.nCompany);
          companyCountryName = getCompanyCountry(email.data.nCompany); // Get company country
        }
        return (
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
              {/*} {type === "access" && (
                <>
                  :{countryCode}: -{email.data.email.replace(/\*\*Â/g, "")} /{" "}
                  {kam} - {email.data.country.replace(/\*\*Â/g, "")} -{" "}
                  {email.data.zipCode.replace(/\*\*Â/g, "")}
                </>
              }*/}

              {type === "access" &&
                (countryCode !== "US" ? (
                  <>
                    :{countryCode}: -{email.data.email.replace(/\*\*Â/g, "")} /{" "}
                    {kam}
                  </>
                ) : (
                  <>
                    :{countryCode}: -{email.data.email.replace(/\*\*Â/g, "")} /{" "}
                    -
                    {/*}  {kam} - {email.data.country.replace(/\*\*Â/g, "")} -{" "}*/}
                    {getZipCodeKAM(email.data.zipCode)}-
                  </>
                ))}

              {type === "quote" && (
                <>
                  :{companyCountryName}: -
                  {email.data.qCompany
                    .replace(/amp; /g, " ")
                    .replace(/&quot;/g, "")
                    .replace(/&amp;/g, "")x
                    .replace(/ &#39;/g, "''")}{" "}
                  {email.data.qName.replace(/\*\*Â/g, "")} /{" "}
                  {email.data.qEmail.replace(/\*\*Â/g, "")} / @{companyKAMName}
                </>
              )}

              {type === "sale" && (
                <>
                  {email.data.nCompany.replace(/:/g, "")} -{" "}
                  {email.data.nOrderNumber.replace(/Â/g, "")} / @
                  {companyKAMName}
                </>
              )}
            </div>
          </div>
        );
      })}
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
