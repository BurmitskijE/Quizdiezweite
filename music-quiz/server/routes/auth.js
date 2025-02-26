const express = require("express");
const axios = require("axios");
const querystring = require("querystring");

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

router.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative";
  const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: "code",
    client_id: CLIENT_ID,
    scope,
    redirect_uri: REDIRECT_URI,
  })}`;
  res.json({ url: authUrl });
});

router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  if (!code) return res.status(400).json({ error: "No code provided" });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    res.redirect(`${FRONTEND_URL}/callback?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate" });
  }
});

module.exports = router;
