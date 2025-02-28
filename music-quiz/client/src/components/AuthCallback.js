import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAccessToken } from "../auth";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    saveAccessToken();
    navigate("/gamemode");
  }, [navigate]);
  /*useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");

    console.log("Erhaltener Token:", token); // Debugging

    if (token) {
      localStorage.setItem("spotify_token", token);
      navigate("/gamemode");
    } else {
      console.error("Fehler: Kein Token erhalten!");
    }
  }, [navigate]);*/

  return <p>Authentifizierung läuft...</p>;
};

export default AuthCallback;
