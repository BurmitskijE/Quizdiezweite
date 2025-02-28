import React from "react";

const TokenStatus = ({ accessToken }) => {
  return (
    <div>
      <p>🔑 Eingeloggt als: {accessToken}</p>
      <button onClick={() => window.location.reload()}>🔄 Refresh Token</button>
    </div>
  );
};

export default TokenStatus;
