import { useEffect, useState } from "react";

const SpotifyPlayer = ({ accessToken, onReady }) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      console.warn("⚠️ Kein Spotify Access Token verfügbar!");
      loginWithSpotify();
      return;
    }

    // Spotify SDK Script einfügen
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    const onSpotifySDKReady = () => {
      if (!window.Spotify) {
        console.error("❌ Spotify SDK konnte nicht geladen werden.");
        return;
      }

      const newPlayer = new window.Spotify.Player({
        name: "Song Quiz Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      // Player Event-Listener hinzufügen
      newPlayer.addListener("ready", async ({ device_id }) => {
        console.log("✅ Spotify Player ist bereit mit ID:", device_id);
        setDeviceId(device_id);
        setIsReady(true);
        onReady(device_id);
        await activateSpotifyDevice(device_id, accessToken); // Gerät aktivieren
      });

      newPlayer.addListener("not_ready", ({ device_id }) => {
        console.error("❌ Spotify Player ist nicht bereit!", device_id);
        setIsReady(false);
      });

      newPlayer.addListener("initialization_error", ({ message }) => {
        console.error("❌ Initialisierungsfehler:", message);
      });

      newPlayer.addListener("authentication_error", ({ message }) => {
        console.error("❌ Authentifizierungsfehler:", message);
      });

      newPlayer.addListener("account_error", ({ message }) => {
        console.error("❌ Konto-Fehler:", message);
      });

      // Player verbinden
      newPlayer.connect().then((success) => {
        if (success) {
          console.log("🎵 Spotify Player erfolgreich verbunden!");
        } else {
          console.error("❌ Verbindung zum Spotify Player fehlgeschlagen!");
        }
      });

      setPlayer(newPlayer);
    };

    window.onSpotifyWebPlaybackSDKReady = onSpotifySDKReady;

    return () => {
      console.log("🔄 Spotify Player wird bereinigt...");
      script.remove();
      if (player) {
        player.disconnect();
      }
    };
  }, [accessToken]);

  const activateSpotifyDevice = async (deviceId, accessToken) => {
    try {
      console.log("🎵 Versuche Spotify Web Player als aktives Gerät zu setzen...");

      const response = await fetch("https://api.spotify.com/v1/me/player", {
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

  return (
    <p>
      {isReady ? "🎵 Spotify Player ist bereit!" : "⏳ Lade Spotify Player..."}
    </p>
  );
};

export default SpotifyPlayer;
