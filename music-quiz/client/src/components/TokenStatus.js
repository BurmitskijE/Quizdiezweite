import React from "react"; 
import { refreshAccessToken } from "../auth"; 
import "../styles/TokenStatus.css"; // Import CSS

const TokenStatus = ({ accessToken }) => {
  return (
    <div className="token-status">
      <p>🔑 Eingeloggt als: {accessToken}</p>
      <button onClick={refreshAccessToken}>🔄 Refresh Token</button>
    </div>
  );
};

export default TokenStatus;
