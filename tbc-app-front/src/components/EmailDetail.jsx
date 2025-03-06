import React from "react";

const EmailDetail = ({ match }) => {
  const emailId = match.params.id;

  // Fetch email details using emailId (implementation not shown)

  return (
    <div>
      <h1>Email Detail for {emailId}</h1>
      {/* Display email content here */}
    </div>
  );
};

export default EmailDetail;
