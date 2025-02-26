import { useState } from "react";
import SpotifyPlayer from "../components/SpotifyPlayer";
import PlaylistSearch from "../components/PlaylistSearch";
import SongQuiz from "../components/SongQuiz";

const SongQuizPage = () => {
  const accessToken = localStorage.getItem("spotify_token");
  const [playlistId, setPlaylistId] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  return (
    <div>
      <h1>Spotify Song Quiz 🎶</h1>
      {!deviceId ? (
        <SpotifyPlayer accessToken={accessToken} onReady={setDeviceId} />
      ) : (
        <>
          <PlaylistSearch accessToken={accessToken} onSelectPlaylist={setPlaylistId} />
          {playlistId && <SongQuiz accessToken={accessToken} playlistId={playlistId} deviceId={deviceId} />}
        </>
      )}
    </div>
  );
};

export default SongQuizPage;
