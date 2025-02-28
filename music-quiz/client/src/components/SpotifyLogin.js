import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/styles.css'; // Ensure the CSS file is imported

const SpotifyLogin = () => {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    axios.get("https://ashy-pebble-07847df03.6.azurestaticapps.net/auth/callback")
      .then((res) => setLoginUrl(res.data.url))
      .catch((err) => console.error("❌ Auth Error:", err));
  }, []);

  return (
    <div className="login-container">
      {loginUrl && (
        <a href={loginUrl} className="spotify-button">Log in mit Spotify</a>
      )}
    </div>
  );
};

export default SpotifyLogin;
