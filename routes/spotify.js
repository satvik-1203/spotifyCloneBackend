const SpotifyWebApi = require("spotify-web-api-node");

//exoress
const express = require("express");
const route = express.Router();

// other spotify Routes

//dotEnv
require("dotenv").config(); //dotenv isnt working we need to look at it later

//credentials
// we need to put this in a dotenv file after setting it up
const credentials = {
  clientId: "0e098488165c416b8f3451c972feee06",
  clientSecret: "689ce50f2eef4ca4bc6450d19e3e1a1d",
  redirectUri: "http://localhost:3000",
};
var spotifyApi = new SpotifyWebApi(credentials); // use this since im setting the access token in this instance

route.post("/", async (req, res) => {
  // post request since we need the code from the client
  const code = req.body.code;

  try {
    // authenticating the code and getting the data
    const result = await spotifyApi.authorizationCodeGrant(code);
    const tokenData = {
      tokenExpire: result.body["expires_in"],
      tokenAccess: result.body["access_token"],
      refreshToken: result.body["refresh_token"],
    };

    spotifyApi.setAccessToken(result.body["access_token"]);
    spotifyApi.setRefreshToken(result.body["refresh_token"]);
    res.send(tokenData);
  } catch (err) {
    res.send(err).status(401);
  }
});

module.exports = {
  route,
  spotifyApi,
};
