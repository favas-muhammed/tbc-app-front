import React, { useState } from "react";

const tabData = [
  {
    name: "Order Cancelled by Suppleir",
    content:
      "Order Cancelled mail from supplier will be shown here. SKU , Sale ID, ",
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

const B2CAutomations = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ maxWidth: 3200, gap: "10px", margin: "0 auto" }}>
      <ul
        style={{
          display: "flex",
          borderBottom: "1px solid #ccc",
          padding: 0,
          gap: "100px", // Reduced from 100px
          marginBottom: 20,
          width: "100", // Ensure full width
          overflowX: "auto",
        }}
      >
        {tabData.map((tab, idx) => (
          <li
            key={tab.name}
            onClick={() => setActiveTab(idx)}
            style={{
              listStyle: "none",
              padding: "10px 24px",
              cursor: "pointer",
              borderBottom:
                activeTab === idx ? "3px solidrgb(109, 121, 134)" : "none",
              color: activeTab === idx ? "#007bff" : "#333",
              fontWeight: activeTab === idx ? "bold" : "normal",
              transition: "border-bottom 0.2s",
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
