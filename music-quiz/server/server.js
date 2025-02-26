const express = require("express");
const cors = require("cors");
const session = require("express-session");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/auth/login", (req, res) => {
  const scope = "user-read-private user-read-email user-read-playback-state streaming";
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  res.json({ url: authUrl });
});

app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
      }
    );
    req.session.accessToken = response.data.access_token;
    res.redirect(`http://localhost:3000?access_token=${response.data.access_token}`);
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Token-Austausch" });
  }
});

app.post("/auth/refresh", async (req, res) => {
  try {
    if (!req.session.accessToken) return res.status(401).json({ error: "Nicht eingeloggt" });
    res.json({ access_token: req.session.accessToken });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Token-Refresh" });
  }
});

app.listen(5000, () => console.log("🚀 Server läuft auf http://localhost:5000"));
