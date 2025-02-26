import { Link } from "react-router-dom";
import "../styles/styles.css"; // Stelle sicher, dass du die Styles importierst!

const GameMode = () => {
  return (
    <div className="game-mode-container">
      <h1>Wähle deinen Spielmodus</h1>
      <div className="game-mode-buttons">
        <Link to="/quiz/title" className="quiz-button">🎤 Errate den Titel</Link>
        <Link to="/quiz/artist" className="quiz-button">🎼 Errate den Künstler</Link>
        <Link to="/quiz/song" className="quiz-button">🎧 Errate den Song (Spotify Player)</Link>
      </div>
    </div>
  );
};

export default GameMode;
