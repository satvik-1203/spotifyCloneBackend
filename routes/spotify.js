//sportifyApi

const SpotifyWebApi = require("spotify-web-api-node");

//exoress
const express = require("express");
const route = express.Router();

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

route.post("/login", async (req, res) => {
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
<<<<<<< HEAD
=======

var spotifyApi = new SpotifyWebApi(credentials);

// var credentials = {
//     clientId: 'someClientId',
//     clientSecret: 'someClientSecret',
//     redirectUri: 'http://www.michaelthelin.se/test-callback'
//   };

//   var spotifyApi = new SpotifyWebApi(credentials);

//   // The code that's returned as a query parameter to the redirect URI
//   var code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';

//   // Retrieve an access token and a refresh token
//   spotifyApi.authorizationCodeGrant(code).then(
//     function(data) {
//       console.log('The token expires in ' + data.body['expires_in']);
//       console.log('The access token is ' + data.body['access_token']);
//       console.log('The refresh token is ' + data.body['refresh_token']);

//       // Set the access token on the API object to use it in later calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//       spotifyApi.setRefreshToken(data.body['refresh_token']);
//     },
//     function(err) {
//       console.log('Something went wrong!', err);
//     }
//   );

module.exports = spotifyApi;
>>>>>>> 47b3acf48fe937558c2a588da76dfbdd6843c42a
