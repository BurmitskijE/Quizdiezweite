import React, { useEffect, useState } from "react";
import axios from "axios";

const SpotifyLogin = () => {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    axios.get("https://ashy-pebble-07847df03.6.azurestaticapps.net/auth/login")
      .then((res) => setLoginUrl(res.data.url))
      .catch((err) => console.error("❌ Auth Error:", err));
  }, []);
  function SpotifyLogin() {
    const [token, setToken] = useState(null);

    return (
        <button onClick={() => console.log("Login")}>Login</button>
    );
}
  return (
    <div className="login-container">
      {loginUrl && (
        <a href={loginUrl} className="spotify-button">Log in mit Spotify</a>
      )}
    </div>
  );
};

export default SpotifyLogin;
