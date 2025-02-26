import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TokenStatus from "./components/TokenStatus";
import GameMode from "./pages/GameMode";
import QuizPage from "./pages/QuizPage";
import SongQuizPage from "./pages/SongQuizPage";
import AuthCallback from "./components/AuthCallback";
import Home from "./pages/Home";
import "./styles/styles.css";

const App = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_token") || "");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    if (token) {
      localStorage.setItem("spotify_token", token);
      setAccessToken(token);
    } else if (!accessToken) {
      refreshAccessToken();
    }
  }, []);

  const refreshAccessToken = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/refresh", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("spotify_token", data.access_token);
        setAccessToken(data.access_token);
      }
    } catch (err) {
      console.error("❌ Fehler beim Token-Refresh:", err);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <TokenStatus accessToken={accessToken} refreshAccessToken={refreshAccessToken} />
        <Routes>
          <Route path="/" element={accessToken ? <Navigate to="/gamemode" /> : <Home />} />
          <Route path="/gamemode" element={accessToken ? <GameMode /> : <Navigate to="/" />} />
          <Route path="/quiz/:mode" element={accessToken ? <QuizPage /> : <Navigate to="/" />} />
          <Route path="/quiz/song" element={accessToken ? <SongQuizPage accessToken={accessToken} /> : <Navigate to="/" />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
