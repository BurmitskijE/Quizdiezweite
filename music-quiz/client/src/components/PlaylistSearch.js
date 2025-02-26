import { useState } from "react";
import "../styles/styles.css"; // Importiere Styles

const PlaylistSearch = ({ accessToken, onSelectPlaylist }) => {
  const [query, setQuery] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const searchPlaylists = async () => {
    if (!query) return;
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=5`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const data = await res.json();
    setPlaylists(data.playlists.items);
  };

  return (
    <div className="playlist-search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Playlist suchen..."
        className="playlist-input"
      />
      <button onClick={searchPlaylists} className="search-button">Suchen</button>

      <select onChange={(e) => onSelectPlaylist(e.target.value)} className="playlist-dropdown">
        <option value="">Wähle eine Playlist</option>
        {playlists
            .filter((pl) => pl && pl.id) // 🛠 Falls `pl` oder `pl.id` null ist → überspringen
            .map((pl) => (
            <option key={pl.id} value={pl.id}>
                {pl.name}
            </option>
            ))}
        </select>
    </div>
  );
};

export default PlaylistSearch;
