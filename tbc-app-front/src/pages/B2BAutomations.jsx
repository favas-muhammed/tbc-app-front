import React, { useEffect, useState, useCallback } from "react";
import countryCodes from "../assets/countryCode";
import kamName from "../assets/kamName";
import companyKAM from "../assets/companyKAM";
import companyCountry from "../assets/companyCountry";
import zipCodeKAM from "../assets/zipCodeKAM";

const B2BAutomations = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const demoQuoteEmails = [
    "mdahlenmark@thebrandcollector.com",
    "mdahlenmark@thebrandcollector.com",
    "hippolyte@thebrandcollector.com",
    "jploue@thebrandcollector.com",
    "abouskine+postmep@thebrandcollector.com",
    "abouskine+accessrequest@thebrandcollector.com",
    "abouskine+test@thebrandcollector.com",
    "jigot24822@jahsec.com",
    "hippolyte+45445@thebrandcollector.com",
    "test@test.com",
    "hippolyte+44@thebrandcollector.com",
    "ngautier+tbctest@gmail.com",
    "hippolyte.noton+45@essca.eu",
    "hippolyte.noton+2@essca.eu",
    "hippolyte+50@thebrandcollector.com",
    "qincindy60@gmail.com",
    "mybestdeal@yopmail.com",
    "testtest2@yopmail.com",
    "laurentluc7@thebrandcollector.com",
    "myemailtest45@gmail.com",
    "laura.fouquet7@orange.fr",
    "laura.fouquet@orange.fr",
    "testcom@yopmail.com",
    "94848595959@gmail.com",
    "tes@hotmail.fr",
    "test@thebrandcollector.com",
    "nicolas+test2@thebrandcollector.com",
    "soukii.amrani@gmail.com",
    "forjfoirjofjrjfj@hotmail.com",
    "xilon.jul+test@gmail.com",
    "testluc@gmail.com",
    "turterorti@gufum.com",
    "info@lfy.ch",
    "alicelevkovichlev@gmail.com",
    "e.zaharko@nord-soft.com",
    "a.rymareva@nord-soft.com",
    "zaharko.1998@gmail.com",
    "e.leshkova@nord-soft.com",
    "nmedina@thebrandcollector.com",
    "estahl@thebrandcollector.com",
    "amelyah@thebrandcollector.com",
    "drelleke@thebrandcollector.com",
    "hgazzar@thebrandcollector.com",
    "aegoaguirre@thebrandcollector.com",
    "acalattini@thebrandcollector.com",
    "mcharpentier@thebrandcollector.com",
    "imartinez@thebrandcollector.com",
    "leo@blanche.agency",
    "jmakaya@thebrandcollector.com",
    "egrimaud@thebrandcollector.com",
    "mandybaileqqqx@outlook.com",
    "liezl.cayanan@hokodo.co",
    "vdoux@thebrandcollector.com",
    "itika.a@theluxurycloset.com",
    "gbianchi@thebrandcollector.com",
    "khinna@thebrandcollector.com",
    "afaudel@thebrandcollector.com",
    "gfernet@thebrandcollector.com",
    "nzhou@thebrandcollector.com",
    "edelagnes@thebrandcollector.com",
    "ielazhari@thebrandcollector.com",
    "bforth@thebrandcollector.com",
    "vrajobson@thebrandcollector.com",
    "sdossavi@thebrandcollector.com",
    "mzoppi@thebrandcollector.com",
    "lbenyahia@thebrandcollector.com",
    "pxu@thebrandcollector.com",
    "julietteploue@gmail.com",
    "j.ploue@ei-montpellier.com",
    "jnyoon@thebrandcollector.com",
    "f.fattami@gmail.com",
    "xtong@thebrandcollector.com",
    "ngautier@engenious.fr",
    "jmekina@thebrandcollector.com",
    "jpons+test@thebrandcollector.com",
    "csanchez@thebrandcollector.com",
    "mapeladavid@outlook.fr",
    "hello@thebrandcollector.com",
    "zhong.grace@hotmail.fr",
    "hippolyte+4@thebrandcollector.com",
    "lusy.zaryan2@gmail.com",
    "ibarkallah@thebrandcollector.com",
    "jruchaud17@gmail.com",
    "fortega@thebrandcollector.com",
    "laura.salamon@vestiairecollective.com",
    "dmitry@thebrandcollector.com",
    "jwu@thebrandcollector.com",
    "sdevaux@thebrandcollector.com",
    "ngautier+wholesaletest@gmail.com",
    "epalmeiro@thebrandcollector.com",
    "hgouyette@thebrandcollector.com",
    "scullerier@thebrandcollector.com",
    "hippolyte.noton@essca.eu",
    "nabubaker@thebrandcollector.com",
    "asanto@thebrandcollector.com",
    "llaurent@thebrandcollector.com",
    "luxworldangie@gmail.com",
    "van@shopthing.com",
    "mmirzai@thebrandcollector.com",
    "camille@imparfaiteparis.com",
    "ipelissier@thebrandcollector.com",
    "llaborde@thebrandcollector.com",
    "antoine@thebrandcollector.com",
    "jploue@thebrandcollector.com",
    "farhadinou3@gmail.com",
    "hbenaissa@thebrandcollector.com",
    "ashvija.s@theluxurycloset.com",
    "pscashbuy@gmail.com",
    "cmoussimi@thebrandcollector.com",
    "karinekaur@gmail.com",
    "cqin@thebrandcollector.com",
    "hippolyte@thebrandcollector.com",
  ];

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
    // Regex to capture content between 'Company :' and 'ORDER RECAP'
    const companyRegex = /Company\s*:\s*(.*?)\s*ORDER RECAP/i;

    return {
      nCompany: extractField(content, companyRegex).trim(), // Extract company name
      nOrderNumber: extractField(content, /Order Number:\s*([^\r\n]+)/i), // Extract order number
    };
  }, []);

  const extractField = (text, regex) => {
    const match = text.match(regex);
    return match ? (match ? match[1].trim() : "N/A") : "N/A"; // Modified to return "N/A" if no match
  };

  const cleanText = (text) => {
    if (!text) return text;
    return text
      .replace(/:/g, "")
      .replace(/Â/g, "")
      .replace(/Ã­/g, "í")
      .replace(/Ã«/g, "ë")
      .replace(/Ã³/g, "ó")
      .replace(/amp;/g, "")
      .replace(/Ã´/g, "ô")
      .replace(/â/g, "’")
      .replace(/&#39;/g, "'")
      .replace(/"/g, "")
      .replace(/&amp;/g, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();
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
    (e) =>
      e.subject === "User Request Quote" &&
      !demoQuoteEmails.includes(e.data.qEmail)
  );
  const newSales = emails.filter((e) => e.subject === "New Sale");

  const getCountryCode = (countryName) => {
    const cleanedCountryName = cleanText(countryName?.replace(/\*\*Â/g, ""));
    return countryCodes[cleanedCountryName] || countryName || "N/A";
  };

  const getKAM = (countryName) => {
    const cleanedCountryName = cleanText(countryName?.replace(/\*\*Â/g, ""));
    return kamName[cleanedCountryName] || "N/A";
  };

  const getcompanyKAM = (companyName) => {
    if (!companyName) return "N/A";
    const cleanedCompanyName = cleanText(companyName?.replace(/\*\*Â/g, ""));
    return companyKAM[cleanedCompanyName] || "N/A";
  };

  const getCompanyCountry = (companyName) => {
    const cleanedCompanyCountry = cleanText(companyName?.replace(/\*\*Â/g, ""));
    return companyCountry[cleanedCompanyCountry] || "N/A";
  };

  const getZipCodeKAM = (zipCode) => {
    const cleanedZipCode = cleanText(zipCode?.replace(/\*\*Â/g, ""));
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
          const cleanedCountry = cleanText(
            email.data.country?.replace(/\*\*Â/g, "")
          );
          countryCode = getCountryCode(cleanedCountry);
          kam = getKAM(cleanedCountry);
        } else if (type === "quote") {
          let coompanyKAM = cleanText(email.data.qCompany);
          companyKAMName = getcompanyKAM(email.data.qCompany);
          companyCountryName = getCompanyCountry(email.data.qCompany);
          coompanyKAM = coompanyKAM.slice(0, -39);
          coompanyKAM = coompanyKAM.trim();
        } else if (type === "sale") {
          let companyName = cleanText(email.data.nCompany);
          companyKAMName = getcompanyKAM(companyName);
          companyCountryName = getCompanyCountry(email.data.nCompany);
          companyName = companyName.slice(0, -39);
          companyName = companyName.trim();
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
              {type === "access" &&
                (countryCode !== "US" ? (
                  <>
                    :{countryCode}: -{cleanText(email.data.email)} / {kam}
                  </>
                ) : (
                  <>
                    :{countryCode}: -{cleanText(email.data.email)} /{" "}
                    {getZipCodeKAM(email.data.zipCode)}
                  </>
                ))}

              {type === "quote" && (
                <>
                  :{companyCountryName}: -{coompanyKAM} {email.data.qName} /{" "}
                  {email.data.qEmail} / {companyKAMName}
                </>
              )}

              {type === "sale" && (
                <>
                  {companyName} - {email.data.nOrderNumber} / {companyKAMName}
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
    </div>
  );
};

export default B2BAutomations;
