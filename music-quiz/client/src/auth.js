const CLIENT_ID = "a3e1c2e4e1f940fcaea7fc66085bea64";  
const REDIRECT_URI = "https://ashy-pebble-07847df03.6.azurestaticapps.net/auth/callback";  
const AUTH_URL = "https://accounts.spotify.com/authorize";
const SCOPES = "user-read-private user-modify-playback-state user-read-email user-read-playback-state streaming";  

export function loginWithSpotify() {  
    const url = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = url;  
}
export function refreshAccessToken() {
  console.log("🔄 Spotify Token erneuern...");

  localStorage.removeItem("spotify_token");  // Alten Token löschen
  loginWithSpotify(); // Startet die Authentifizierung erneut
}

export function getAccessTokenFromUrl() {  
    const hash = window.location.hash.substring(1);  
    const params = new URLSearchParams(hash);  
    return params.get("access_token");  
}

export const saveAccessToken = () => {
  const hash = window.location.hash;
  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    if (accessToken) {
      localStorage.setItem("spotify_token", accessToken);
      window.history.replaceState({}, document.title, "/");
    }
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("spotify_token");
};
