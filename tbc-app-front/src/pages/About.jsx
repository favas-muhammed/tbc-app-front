import React from "react";

const About = () => {
  return (
    <div>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#333",
        }}
      >
        About
      </p>
      <p>
        A simple, lightweight internal tool designed to automatically collect,
        categorize, and display useful data from email, streamlining inbox
        management and reducing manual sorting time.
      </p>
      <p>
        The tool fetches and organizes incoming emails relevant to The Brand
        Collector’s operations, focusing on the following categories:
      </p>
      <ul>
        <li>Access requests, quote requests, and new sales</li>
        <li>Order cancellations by suppliers</li>
        <li>Last day to ship : Vestiaire Collective</li>
        <li>DHL invoices</li>
        <li>
          All order-related emails: new orders, orders received by the platform,
          sold orders, cancellations, and returns
        </li>
      </ul>
      <a href="https://github.com/favas-muhammed">GIT HUB</a>
    </div>
  );
};

export default About;
