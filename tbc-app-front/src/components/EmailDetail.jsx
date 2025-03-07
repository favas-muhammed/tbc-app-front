import React from "react";

const EmailDetail = ({ match }) => {
  const emailId = match.params.id;
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchEmailDetails = async () => {
      const token = localStorage.getItem("gmailAccessToken");
      const response = await fetch(
        `https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const emailData = await response.json();
      const sender = emailData.payload.headers.find(
        (header) => header.name === "From"
      ).value;
      const subject = emailData.payload.headers.find(
        (header) => header.name === "Subject"
      ).value;
      const body = emailData.payload.parts[0].body.data; // Assuming the body is in the first part
      setEmail({ sender, subject, body });
    };

    fetchEmailDetails();
  }, [emailId]);

  return (
    <div>
      <h1>Email Detail for {emailId}</h1>
      {email && (
        <>
          <strong>From:</strong> {email.sender} <br />
          <strong>Subject:</strong> {email.subject} <br />
          <div
            dangerouslySetInnerHTML={{
              __html: atob(email.body.replace(/-/g, "+").replace(/_/g, "/")),
            }}
          />
        </>
      )}
    </div>
  );
};

export default EmailDetail;
