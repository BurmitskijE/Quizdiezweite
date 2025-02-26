import axios from "axios";

export const fetchSongs = async (token) => {
    const PLAYLIST_ID = "37i9dQZEVXbJiZcmkrIHGU"; // Spotify Top 50 Global

  try {
    if (!token) {
      console.error("Kein Token verfügbar! Logge dich neu ein.");
      return [];
    }

    const url = `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`;
    console.log("API-Anfrage an:", url, "mit Token:", token);

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Spotify API Response:", response.data);

    return response.data.items.map((item) => ({
      title: item.track.name,
      artist: item.track.artists[0].name,
      albumCover: item.track.album.images[0]?.url || "",
      previewUrl: item.track.preview_url,
    }));
  } catch (error) {
    console.error("Fehler beim Abrufen der Songs:", error.response?.data || error);
    return [];
  }
};
