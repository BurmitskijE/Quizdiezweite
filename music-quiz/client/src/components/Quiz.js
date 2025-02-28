import React, { useState, useEffect } from "react";
import { fetchSongs } from "../services/spotifyService";
import Question from "./Question";
import "../styles/animations.css"; // Importiert CSS für Animationen

const Quiz = ({ token, mode }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(""); // Richtig/Falsch Animation
  const [blurLevel, setBlurLevel] = useState(10); // Startet mit starkem Blur

  useEffect(() => {
    const loadSongs = async () => {
      const data = await fetchSongs(token);
      setSongs(data);
      selectNewSong(data);
    };

    if (token) {
      loadSongs();
    }
  }, [token]);

  const selectNewSong = (data) => {
    if (data.length === 0) return;
    const song = data[Math.floor(Math.random() * data.length)];
    setCurrentSong(song);

    let incorrectOptions = data
      .filter((item) => item !== song)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const correctAnswer = mode === "title" ? song.title : song.artist;
    const choices = mode === "title"
      ? [song.title, ...incorrectOptions.map((s) => s.title)]
      : [song.artist, ...incorrectOptions.map((s) => s.artist)];

    setOptions(choices.sort(() => 0.5 - Math.random())); // Zufällige Reihenfolge
    setAnswer(correctAnswer);
  };

  const checkAnswer = (selected) => {
    if (selected === answer) {
      setScore(score + 1);
      setFeedback("correct"); // Startet die grüne Animation
    } else {
      setFeedback("wrong"); // Startet die rote Animation
    }

    setTimeout(() => {
      setFeedback(""); // Animation zurücksetzen
      selectNewSong(songs); // Nächstes Lied laden
    }, 1000);
  };

  return currentSong ? (
    <div className={`text-center ${feedback}`}>
      <h2 className="text-xl">Punkte: {score}</h2>
      <div className="album-cover" style={{ filter: `blur(${blurLevel}px)` }}>
        <img src={currentSong?.albumCover} alt="Album Cover" />
      </div>
      {currentSong.previewUrl && <audio src={currentSong.previewUrl} controls autoPlay />}

      <Question 
        questionText={`Welcher ${mode === "title" ? "Titel" : "Künstler"} gehört zu diesem Song?`}
        options={options}
        onAnswer={checkAnswer}
      />
    </div>
  ) : (
    <p>Lade Songs...</p>
  );
};

export default Quiz;