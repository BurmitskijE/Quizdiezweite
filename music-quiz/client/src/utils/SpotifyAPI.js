const SPOTIFY_API_URL = "https://api.spotify.com/v1"; // API-URL als Konstante

export const activateSpotifyDevice = async (deviceId, accessToken) => {
  try {
    console.log("🎵 Versuche, den Spotify Web Player als aktives Gerät zu setzen...");

    const response = await fetch(`${SPOTIFY_API_URL}/me/player`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ device_ids: [deviceId], play: false }),
    });

    if (!response.ok) {
      console.error("❌ Fehler beim Aktivieren des Spotify-Geräts:", await response.text());
    } else {
      console.log("✅ Spotify Web Player erfolgreich als aktives Gerät gesetzt.");
    }
  } catch (error) {
    console.error("❌ Fehler beim Aktivieren des Geräts:", error);
  }
};

export const startPlayback = async (deviceId, accessToken) => {
  try {
    console.log("▶️ Versuche, die Wiedergabe zu starten...");

    const response = await fetch(`${SPOTIFY_API_URL}/me/player/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ device_id: deviceId }),
    });

    if (!response.ok) {
      console.error("❌ Fehler beim Starten der Wiedergabe:", await response.text());
    } else {
      console.log("✅ Wiedergabe erfolgreich gestartet!");
    }
  } catch (error) {
    console.error("❌ Fehler beim Starten der Wiedergabe:", error);
  }
};

export const checkActiveDevice = async (accessToken) => {
  try {
    const response = await fetch(`${SPOTIFY_API_URL}/me/player/devices`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await response.json();
    console.log("🔍 Aktive Geräte:", data);

    if (data.devices.length === 0) {
      console.warn("⚠️ Kein aktives Gerät gefunden.");
    } else {
      console.log("✅ Aktives Gerät:", data.devices.find(d => d.is_active));
    }
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Geräte:", error);
  }
};
