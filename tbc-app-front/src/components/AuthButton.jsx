import React from "react";

const AuthButton = ({ onClick }) => {
  const handleAuth = () => {
    window.location.href = "/auth/gmail";
  };

  return <button onClick={onClick}>Authenticate with Gmail</button>;
};

export default AuthButton;
