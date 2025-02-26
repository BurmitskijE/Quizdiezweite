import React from "react";
import { useNavigate } from "react-router-dom";

const GameMode = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl">Wähle einen Spielmodus</h1>
      <button onClick={() => navigate("/quiz/title")} className="m-4 bg-blue-500 text-white px-6 py-3 rounded">
        🎼 Titel erraten
      </button>
      <button onClick={() => navigate("/quiz/artist")} className="m-4 bg-red-500 text-white px-6 py-3 rounded">
        🎤 Künstler erraten
      </button>
    </div>
  );
};

export default GameMode;
