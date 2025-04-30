import React, { useState, useEffect, useCallback } from "react";

const B2CAutomations = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [emails, setEmails] = useState([]);
  const [lastDayToShipEmails, setLastDayToShipEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingLastDay, setLoadingLastDay] = useState(false);
  const [error, setError] = useState(null);
  const [errorLastDay, setErrorLastDay] = useState(null);

  const fetchEmails = useCallback(async () => {
    const token = localStorage.getItem("gmailAccessToken");
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread subject:'A sale has been cancelled' from:support@thebrandcollector.com to:salesreport@thebrandcollector.com&maxResults=2000",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();

      if (!data.messages) {
        setEmails([]);
        setLoading(false);
        return;
      }

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
                sku: "N/A",
                saleId: "N/A",
              },
            };
          }
          const subject =
            emailData.payload.headers.find((h) => h.name === "Subject")
              ?.value || "";
          const body = decodeEmailBody(emailData.payload);

          // Extract SKU and Sale ID from body
          const skuMatch = body.match(/SKU[:\s]*([^\s,]+)/i);
          const saleIdMatch = body.match(/sale id[:\s]*([^,]+)/i);
          const sku = skuMatch ? skuMatch[1] : "N/A";
          const saleId = saleIdMatch ? saleIdMatch[1] : "N/A";

          return {
            id: email.id,
            subject,
            snippet: emailData.snippet,
            data: { sku, saleId },
          };
        })
      );

      setEmails(emailDetails.filter(Boolean));
    } catch (error) {
      setError(error.message);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLastDayToShipEmails = useCallback(async () => {
    const token = localStorage.getItem("gmailAccessToken");
    if (!token) return;

    setLoadingLastDay(true);
    setErrorLastDay(null);

    try {
      const querySubjects = [
        "'Demain est votre dernier jour pour expédier'",
        "'🚨 Demain sera votre dernier jour d'expédition'",
        "'⚠️ Tomorrow is the last day to ship your item! '",
        "'Tomorrow is the last day to ship your item! '",
      ];
      const subjectQuery = querySubjects
        .map((s) => `subject:${s}`)
        .join(" OR ");
      const query = `is:unread (${subjectQuery}) from:hello@thebrandcollector.com to:hello@thebrandcollector.com`;

      const response = await fetch(
        `https://www.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(
          query
        )}&maxResults=2000`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch last day to ship emails");
      }

      const data = await response.json();

      if (!data.messages) {
        setLastDayToShipEmails([]);
        setLoadingLastDay(false);
        return;
      }

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
              date: "Unknown",
              ref: "N/A",
            };
          }

          // Extract date from headers
          const dateHeader = emailData.payload.headers.find(
            (h) => h.name === "Date"
          );
          const date = dateHeader
            ? new Date(dateHeader.value).toLocaleString()
            : "Unknown";

          const body = decodeEmailBody(emailData.payload);

          // Extract Ref from body
          const refMatch = body.match(/Ref:\s*([^\s<]+)/i);
          const ref = refMatch ? refMatch[1] : "N/A";

          return {
            id: email.id,
            date,
            ref,
          };
        })
      );

      setLastDayToShipEmails(emailDetails.filter(Boolean));
    } catch (error) {
      setErrorLastDay(error.message);
      setLastDayToShipEmails([]);
    } finally {
      setLoadingLastDay(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 0) {
      fetchEmails();
    } else if (activeTab === 1) {
      fetchLastDayToShipEmails();
    }
  }, [activeTab, fetchEmails, fetchLastDayToShipEmails]);

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

  const renderEmailList = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (emails.length === 0) return <p>No order cancelled emails found.</p>;

    return (
      <ul>
        {emails.map(({ id, data }) => {
          // Clean up SKU and Sale ID
          const cleanSku = data.sku.replace(/<[^>]+>/g, "").trim();
          let cleanSaleId = data.saleId.replace(/<[^>]+>/g, "").trim();

          // Handle "To" case and empty values
          if (cleanSaleId === "To" || cleanSaleId === "") {
            cleanSaleId = "N/A";
          }

          return (
            <li key={id}>
              {cleanSku} / {cleanSaleId}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderLastDayToShipEmails = () => {
    if (loadingLastDay) return <p>Loading...</p>;
    if (errorLastDay)
      return <p style={{ color: "red" }}>Error: {errorLastDay}</p>;
    if (lastDayToShipEmails.length === 0)
      return <p>No last day to ship emails found.</p>;

    return (
      <ul>
        {lastDayToShipEmails.map(({ id, date, ref }) => (
          <li key={id}>
            {date} - {ref}
          </li>
        ))}
      </ul>
    );
  };

  const tabData = [
    {
      name: "Order Cancelled by Suppleir",
      content: renderEmailList(),
    },
    {
      name: "Last Day to ship : VC",
      content: renderLastDayToShipEmails(),
    },
    {
      name: "All Orders",
      content:
        "All orders from all B2C platforms will be shown here. SKU , Sale ID , Date , Price and Shipping address",
    },
    { name: "Cancellations", content: "All Cancellation mails" },
    { name: "Returns", content: "All Return mails" },
    { name: "Receievd by platform", content: "All Receievd by platform mails" },
    { name: "Sold", content: "All Sold mails" },
  ];

  return (
    <div style={{ position: "absolute", paddingTop: "1px" }}>
      <ul
        style={{
          display: "flex",
          borderBottom: "1px solid #ccc",
          padding: 5,
          marginBottom: 20,
          width: "1525px", // Make it full width
          justifyContent: "space-between",
        }}
      >
        {tabData.map((tab, idx) => (
          <li
            key={tab.name}
            onClick={() => {
              setSelectedEmail(null);
              setActiveTab(idx);
            }}
            style={{
              listStyle: "none",
              padding: "10px 66px",
              cursor: "pointer",
              borderBottom:
                activeTab === idx ? "3px solid rgb(109, 121, 134)" : "none",
              color: activeTab === idx ? "#007bff" : "#333",
              fontWeight: activeTab === idx ? "bold" : "normal",
              transition: "border-bottom 0.2s",
              flex: 1, // Make each tab take equal width
              textAlign: "center", // Center the tab text
            }}
          >
            {tab.name}
          </li>
        ))}
      </ul>
      <div style={{ padding: 16, background: "#fafafa", borderRadius: 4 }}>
        {tabData[activeTab].content}
      </div>
    </div>
  );
};

export default B2CAutomations;
