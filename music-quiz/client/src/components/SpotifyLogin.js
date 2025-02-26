import React, { useEffect, useState } from "react";
import axios from "axios";

const SpotifyLogin = () => {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/auth/login")
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
