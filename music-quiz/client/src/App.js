import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { loginWithSpotify, saveAccessToken, getAccessToken, refreshAccessToken } from "./auth";
import TokenStatus from "./components/TokenStatus";
import GameMode from "./pages/GameMode";
import QuizPage from "./pages/QuizPage";
import SongQuizPage from "./pages/SongQuizPage";
import AuthCallback from "./components/AuthCallback";
import Home from "./pages/Home";
import "./styles/styles.css";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    saveAccessToken();
    setToken(getAccessToken());

    // 🔄 Automatischer Token Refresh alle 55 Minuten (vor Ablauf der 60 Minuten)
    const refreshInterval = setInterval(() => {
      console.log("🔄 Automatischer Token-Refresh...");
      refreshAccessToken();
    }, 55 * 60 * 1000); // 55 Minuten

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <h1>Willkommen zum Quiz</h1>
        {!token ? (
          <button onClick={loginWithSpotify}>Mit Spotify anmelden</button>
        ) : (
          <>
            <p>Angemeldet! Du kannst jetzt das Quiz spielen.</p>
            <TokenStatus accessToken={token} />
            <Routes>
              <Route path="/auth/callback" element={<AuthCallback />} />  
              <Route path="/" element={token ? <Navigate to="/gamemode" /> : <Home />} />
              <Route path="/gamemode" element={token ? <GameMode /> : <Navigate to="/" />} />
              <Route path="/quiz/:mode" element={token ? <QuizPage /> : <Navigate to="/" />} />
              <Route path="/quiz/song" element={token ? <SongQuizPage accessToken={token} /> : <Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
