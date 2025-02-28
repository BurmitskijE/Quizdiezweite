import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/styles.css";
import "../styles/animations.css"; // 🔥 Animationen importieren

const SongQuiz = ({ accessToken, deviceId }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [blurLevel, setBlurLevel] = useState(10); // 🔥 Startet mit starkem Blur
  const navigate = useNavigate();
  let timeoutId; // Speichert den Timer für den 15-Sekunden-Countdown

  // 🎵 1️⃣ Playlists abrufen
  useEffect(() => {
    const fetchPlaylists = async () => {
      const url = "https://api.spotify.com/v1/me/playlists?limit=50";
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPlaylists(response.data.items);
    };

    if (accessToken) {
      fetchPlaylists();
    }
  }, [accessToken]);

  // 🎵 2️⃣ Playlist-Songs abrufen
  const fetchTracks = async (playlistId) => {
    if (!playlistId) return;

    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await res.json();

    const tracks = data.items
      .filter((item) => item.track) // Falls `item.track` null ist, überspringen
      .map((item) => ({
        id: item.track.id,
        uri: item.track.uri,
        name: item.track.name,
        albumCover: item.track.album.images[0].url, // 🔥 Album Cover hinzufügen
        duration_ms: item.track.duration_ms || 180000,
      }));

    setSongs(tracks);
    startNewRound(tracks);
  };

  // 🎵 3️⃣ Neues Lied starten
  const startNewRound = (tracks) => {
    if (tracks.length === 0) return;

    const shuffled = [...tracks].sort(() => 0.5 - Math.random());
    setCurrentSong(shuffled[0]);
    setOptions(shuffled.slice(0, 4));
    setBlurLevel(10); // 🔥 Album Cover wieder unscharf setzen
  };

  // 🎵 4️⃣ Zufällige 15 Sekunden abspielen
  const playRandomPart = async () => {
    if (!deviceId || !currentSong) return;

    const randomStartMs = Math.floor(Math.random() * (currentSong.duration_ms - 15000));
    console.log(`🎵 Starte Song für 15 Sekunden ab: ${randomStartMs}ms`);

    // 🔥 KICKSTART: Player aktivieren, falls er "hängt"
    await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ device_ids: [deviceId], play: false }),
    });

    // 🔥 Startet den Song nach dem Kickstart
    await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ uris: [currentSong.uri], position_ms: randomStartMs }),
    });

    // Startet den Timer für 15 Sekunden
    let blurStep = 10;
    timeoutId = setInterval(() => {
      blurStep -= 1;
      setBlurLevel(blurStep);
      if (blurStep <= 0) clearInterval(timeoutId);
    }, 1500);

    setTimeout(() => {
      stopPlayback();
      setFeedback(`⏳ Zeit abgelaufen! Richtige Antwort: ${currentSong.name}`);
      setTimeout(() => startNewRound(songs), 3000);
    }, 15000);
  };

  // 🎵 5️⃣ Wiedergabe stoppen
  const stopPlayback = async () => {
    await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  // 🎵 6️⃣ Antwort prüfen
  const checkAnswer = (selectedTrack) => {
    clearTimeout(timeoutId); // 🔥 Timer stoppen, falls das Lied erraten wurde

    if (selectedTrack.id === currentSong.id) {
      setFeedback("✅ Richtig!");
      document.body.classList.add("correct-answer");
      setTimeout(() => document.body.classList.remove("correct-answer"), 1000);
    } else {
      setFeedback(`❌ Falsch! Richtig wäre: ${currentSong.name}`);
      document.body.classList.add("wrong-answer");
      setTimeout(() => document.body.classList.remove("wrong-answer"), 1000);
    }

    setTimeout(() => startNewRound(songs), 2000);
  };

  // 🎵 7️⃣ Zurück zur Übersicht
  const handleBack = () => {
    stopPlayback();
    navigate("/");
  };

  return (
    <div className="quiz-container">
      <div className="top-bar">
        <p className="login-status">Eingeloggt als: {accessToken.substring(0, 10)}...</p>
        <button onClick={handleBack} className="back-button">
          ⬅ Zurück zur Übersicht
        </button>
      </div>
      {!selectedPlaylist ? (
        <div>
          <h2>Wähle eine Playlist</h2>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <button onClick={() => {
                  setSelectedPlaylist(playlist.id);
                  fetchTracks(playlist.id);
                }}>
                  {playlist.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        currentSong && (
          <div className={`text-center ${feedback}`}>
            <h2 className="text-xl">Errate den Song! 🎵</h2>
            <div className="album-cover" style={{ filter: `blur(${blurLevel}px)` }}>
              <img src={currentSong?.albumCover} alt="Album Cover" />
            </div>
            {currentSong.previewUrl && <audio src={currentSong.previewUrl} controls autoPlay />}

            <div className="options-container">
              {options.map((track) => (
                <button key={track.id} onClick={() => checkAnswer(track)} className="quiz-button">
                  {track.name}
                </button>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SongQuiz;
