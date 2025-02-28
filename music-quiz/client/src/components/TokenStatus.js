import React from "react"; 
import { refreshAccessToken } from "../auth"; 
import "../styles/TokenStatus.css"; // Import CSS

const TokenStatus = ({ accessToken }) => {
  const abbreviatedToken = `${accessToken.substring(0, 15)}...`;

  return (
    <div className="token-status">
      <p>🔑 Eingeloggt als: {abbreviatedToken}</p>
      <button onClick={refreshAccessToken}>🔄 Refresh Token</button>
    </div>
  );
};

export default TokenStatus;
