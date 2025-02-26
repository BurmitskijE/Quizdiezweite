import axios from "axios";

export const fetchSongs = async (token) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/playlists/{playlist_id}/tracks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.items.map((item) => ({
      title: item.track.name,
      artist: item.track.artists[0].name,
      albumCover: item.track.album.images[0].url,
      previewUrl: item.track.preview_url,
    }));
  } catch (error) {
    console.error("Fehler beim Abrufen der Songs:", error);
    return [];
  }
};
