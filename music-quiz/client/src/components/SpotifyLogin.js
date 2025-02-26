import React, { useEffect, useState } from "react";
import axios from "axios";

const SpotifyLogin = () => {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/login`)
      .then((res) => setLoginUrl(res.data.url))
      .catch((err) => console.error("Auth Error:", err));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {loginUrl && (
        <a href={loginUrl} className="spotify-button">
        Log in mit Spotify
      </a>
      )}
    </div>
  );
};

export default SpotifyLogin;
