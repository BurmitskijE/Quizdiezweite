// components/Game.js
import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

function Game() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.substr(1)).get('access_token');
    if (token) {
      spotifyApi.setAccessToken(token);
      startGame();
    }
  }, []);

  const startGame = async () => {
    const response = await spotifyApi.getRecommendations({ limit: 1, market: 'DE', seed_genres: ['pop'] });
    setCurrentTrack(response.tracks[0]);
  };

  const handleGuess = () => {
    if (guess.toLowerCase() === currentTrack.name.toLowerCase()) {
      setResult('Richtig!');
    } else {
      setResult(`Falsch. Der richtige Titel war: ${currentTrack.name}`);
    }
    setGuess('');
    startGame();
  };

  return (
    <div className="game-container">
      <h1>Musikratespiel</h1>
      {currentTrack && (
        <div>
          <audio src={currentTrack.preview_url} controls />
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Titel erraten"
            className="guess-input"
          />
          <button onClick={handleGuess} className="guess-button">Raten</button>
          <p className="result">{result}</p>
        </div>
      )}
    </div>
  );
}

export default Game;
