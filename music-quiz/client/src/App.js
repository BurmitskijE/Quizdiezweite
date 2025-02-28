import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { loginWithSpotify, saveAccessToken, getAccessToken } from "./auth";
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
              <Route path="/" element={accessToken ? <Navigate to="/gamemode" /> : <Home />} />
              <Route path="/gamemode" element={accessToken ? <GameMode /> : <Navigate to="/" />} />
              <Route path="/quiz/:mode" element={accessToken ? <QuizPage /> : <Navigate to="/" />} />
              <Route path="/quiz/song" element={accessToken ? <SongQuizPage accessToken={accessToken} /> : <Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
