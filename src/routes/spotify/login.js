const SpotifyWebApi = require("spotify-web-api-node");

//express
const express = require("express");
const route = express.Router();

const Token = require("../../schema/refreshToken");

// other spotify Routes

//dotEnv
require("dotenv").config; //dotenv isnt working we need to look at it later

const SpotifyClass = require("../../classes/SpotifyClass");

//credentials
// we need to put this in a dotenv file after setting it up
const credentials = {
  clientId: "0e098488165c416b8f3451c972feee06",
  clientSecret: "689ce50f2eef4ca4bc6450d19e3e1a1d",
  redirectUri: "http://localhost:3000",
};

// let spotifyApi = new SpotifyWebApi(credentials); // use this since im setting the access token in this instance
const spotifyClass = new SpotifyClass();

route.post("/", async (req, res) => {
  // post request since we need the code from the client
  spotifyClass.login(req, res);
});
module.exports = {
  route,
  // spotifyApi,
};

// const code = req.body.code;
//   try {
//     // authenticating the code and getting the data
//     const result = await spotifyApi.authorizationCodeGrant(code);
//     const tokenData = {
//       tokenExpire: result.body["expires_in"],
//       tokenAccess: result.body["access_token"],
//       refreshToken: result.body["refresh_token"],
//     };
//     const token = new Token({
//       accessToken: result.body["access_token"],
//       refreshToken: result.body["refresh_token"],
//     });

//     try {
//       spotifyApi.setAccessToken(result.body["access_token"]);
//       spotifyApi.setRefreshToken(result.body["refresh_token"]);
//     } catch (err) {
//       console.log("Couldn't set the token");
//     }

//     try {
//       res.send(tokenData);
//       await token.save();
//     } catch (err) {
//       console.log("Already exists");
//     }
//   } catch (err) {
//     res.send("error from backend").status(401);
//   }
