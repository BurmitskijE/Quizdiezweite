import { useEffect, useState } from "react";

const SpotifyPlayer = ({ accessToken, onReady }) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: "Song Quiz Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      newPlayer.addListener("ready", async ({ device_id }) => {
        console.log("✅ Spotify Player ist bereit mit ID:", device_id);
        setDeviceId(device_id);
        onReady(device_id);
        await activateDevice(device_id); // Gerät aktivieren
      });

      newPlayer.addListener("not_ready", ({ device_id }) => {
        console.error("❌ Spotify Player ist nicht bereit!", device_id);
      });

      newPlayer.connect().then((success) => {
        if (success) {
          console.log("🎵 Spotify Player erfolgreich verbunden!");
        } else {
          console.error("❌ Verbindung zum Spotify Player fehlgeschlagen!");
        }
      });

      setPlayer(newPlayer);
    };
  }, [accessToken]);

  const activateDevice = async (deviceId) => {
    try {
      console.log("🔄 Gerät aktivieren:", deviceId);

      const res = await fetch("https://api.spotify.com/v1/me/player", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ device_ids: [deviceId], play: false }),
      });

      if (!res.ok) {
        console.error("❌ Fehler beim Aktivieren des Players:", await res.text());
      } else {
        console.log("✅ Gerät erfolgreich als Spotify-Wiedergabegerät gesetzt.");
      }
    } catch (error) {
      console.error("❌ Fehler beim Aktivieren des Spotify-Geräts:", error);
    }
  };

  return <p>{deviceId ? "Player bereit! 🎵" : "Lade Spotify Player..."}</p>;
};

export default SpotifyPlayer;
