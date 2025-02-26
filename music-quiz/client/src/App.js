import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameMode from "./pages/GameMode";
import AuthCallback from "./components/AuthCallback";
import QuizPage from "./pages/QuizPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gamemode" element={<GameMode />} />
      <Route path="/callback" element={<AuthCallback />} />
      <Route path="/quiz/:mode" element={<QuizPage />} />
    </Routes>
  );
};

export default App;
