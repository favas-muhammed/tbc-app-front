import React, { useState, useEffect } from "react";

const B2CAutomations = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [orderCancelledData, setOrderCancelledData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === 0) {
      // Fetch emails when "Order Cancelled by Suppleir" tab is active
      const fetchEmails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=2000"
          );

          if (!response.ok) {
            throw new Error("Failed to fetch emails");
          }
          const text = await response.text();
          let data;
          try {
            data = JSON.parse(text);
          } catch (jsonError) {
            throw new Error("Invalid JSON response: " + text);
          }
          // Filter emails: unread, subject "A sale has been cancelled", from support@thebrandcollector.com, to salesreport@thebrandcollector.com
          const filteredEmails = (data.messages || []).filter((msg) => {
            // We need to fetch full message details for each msg to check headers and body
            // But since only message list is returned here, we will assume backend returns full messages in data.messages
            // If not, this logic needs to be adjusted accordingly
            const headers = msg.payload?.headers || [];
            const subjectHeader = headers.find(
              (h) => h.name.toLowerCase() === "subject"
            );
            const fromHeader = headers.find(
              (h) => h.name.toLowerCase() === "from"
            );
            const toHeader = headers.find((h) => h.name.toLowerCase() === "to");
            const isUnread = !msg.labelIds || !msg.labelIds.includes("READ");
            return (
              isUnread &&
              subjectHeader?.value === "A sale has been cancelled" &&
              fromHeader?.value
                .toLowerCase()
                .includes("support@thebrandcollector.com") &&
              toHeader?.value
                .toLowerCase()
                .includes("salesreport@thebrandcollector.com")
            );
          });

          // Extract SKU and Sale ID from email body snippet or body
          const extractedData = filteredEmails.map((email) => {
            // Try to extract SKU and Sale ID from snippet or body
            const snippet = email.snippet || "";
            // Simple regex to extract SKU and Sale ID from snippet
            // Assuming SKU and Sale ID appear as "SKU: <value>" and "Sale ID: <value>"
            const skuMatch = snippet.match(/SKU[:\s]*([^\s,]+)/i);
            const saleIdMatch = snippet.match(/Sale ID[:\s]*([^\s,]+)/i);
            const sku = skuMatch ? skuMatch[1] : "N/A";
            const saleId = saleIdMatch ? saleIdMatch[1] : "N/A";
            return { sku, saleId };
          });

          setOrderCancelledData(extractedData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEmails();
    }
  }, [activeTab]);

  const renderOrderCancelledContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (orderCancelledData.length === 0)
      return <p>No order cancelled emails found.</p>;

    return (
      <ul>
        {orderCancelledData.map(({ sku, saleId }, idx) => (
          <li key={idx}>
            {sku} / {saleId} /
          </li>
        ))}
      </ul>
    );
  };

  const tabData = [
    {
      name: "Order Cancelled by Suppleir",
      content: renderOrderCancelledContent(),
    },
    {
      name: "Last Day to ship : VC",
      content:
        "VC last day mails will be shown here. date of the mail, Sale ID, ",
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
    <div>
      <ul
        style={{
          display: "flex",
          borderBottom: "1px solid #ccc",
          padding: 5,
          marginBottom: 20,
          width: "100%", // Make it full width
          justifyContent: "space-between",
        }}
      >
        {tabData.map((tab, idx) => (
          <li
            key={tab.name}
            onClick={() => setActiveTab(idx)}
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
