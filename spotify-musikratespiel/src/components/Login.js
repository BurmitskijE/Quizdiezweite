// components/Login.js
import React from 'react';
import { clientId, redirectUri } from '../config';

function Login() {
  const handleLogin = () => {
    const scopes = 'user-read-private user-read-email streaming';
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  };

  return (
    <div className="login-container">
      <h1>Spotify Musikratespiel</h1>
      <button onClick={handleLogin} className="login-button">Mit Spotify anmelden</button>
    </div>
  );
}

export default Login;
