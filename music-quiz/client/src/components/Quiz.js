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
      <div className="album-cover-container">
      <img 
      src={currentSong.albumCover} 
      alt="Album Cover" 
      className="album-cover blurred"
      />
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



/*import { useEffect, useState } from "react";

const Quiz = ({ accessToken, playlistId, deviceId }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchTracks = async () => {
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      const tracks = data.items
        .map((item) => ({
          id: item.track.id,
          uri: item.track.uri,
          name: item.track.name,
        }))
        .filter((track) => track.id);
      setSongs(tracks);
      startNewRound(tracks);
    };

    if (playlistId) fetchTracks();
  }, [playlistId]);

  const startNewRound = (tracks) => {
    const shuffled = [...tracks].sort(() => 0.5 - Math.random());
    setCurrentSong(shuffled[0]);
    setOptions(shuffled.slice(0, 4));
  };

  const playSong = async () => {
    if (!deviceId || !currentSong) return;
    await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: deviceId, uris: [currentSong.uri] }),
    });
  };

  useEffect(() => {
    if (currentSong) playSong();
  }, [currentSong]);

  const checkAnswer = (selectedTrack) => {
    if (selectedTrack.id === currentSong.id) {
      setFeedback("✅ Richtig!");
    } else {
      setFeedback(`❌ Falsch! Richtig wäre: ${currentSong.name}`);
    }
    setTimeout(() => startNewRound(songs), 2000);
  };

  return (
    <div>
      <h2>Errate den Song! 🎵</h2>
      <p>{feedback}</p>
      {options.map((track) => (
        <button key={track.id} onClick={() => checkAnswer(track)}>
          {track.name}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
*/