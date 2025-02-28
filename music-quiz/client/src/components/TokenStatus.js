import React from "react";
import "../styles/TokenStatus.css"; // Import the CSS file

const TokenStatus = ({ accessToken }) => {
  return (
    <div className="token-status">
      <p>🔑 Eingeloggt als: {accessToken}</p>
      <button onClick={() => window.location.reload()}>🔄 Refresh Token</button>
    </div>
  );
};

export default TokenStatus;
