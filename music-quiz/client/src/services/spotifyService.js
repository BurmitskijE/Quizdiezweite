import axios from "axios";

export const fetchSongs = async (token) => {
  try {
    if (!token) {
      console.error("Kein Token verfügbar! Logge dich neu ein.");
      return [];
    }

    const url = "https://api.spotify.com/v1/me/top/tracks?limit=50"; // Top 50 Lieblingssongs
    console.log("API-Anfrage an:", url);

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Spotify API Response:", response.data);

    if (!response.data.items || response.data.items.length === 0) {
      console.warn("⚠️ Keine Lieblingssongs gefunden.");
      return [];
    }

    return response.data.items.map((track) => ({
      title: track.name,
      artist: track.artists[0]?.name || "Unbekannter Künstler",
      albumCover: track.album.images[0]?.url || "",
      previewUrl: track.preview_url,
    }));
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Songs:", error.response?.data || error);
    return [];
  }
};