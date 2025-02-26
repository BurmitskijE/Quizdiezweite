import { useState, useEffect } from "react";

const TokenStatus = ({ accessToken, refreshAccessToken }) => {
  return (
    <div className="token-status">
      <p>🔑 Eingeloggt als: {accessToken ? `${accessToken.substring(0, 10)}...` : "Nicht eingeloggt"}</p>
      <button onClick={refreshAccessToken} className="refresh-button">🔄 Refresh Token</button>
    </div>
  );
};

export default TokenStatus;
