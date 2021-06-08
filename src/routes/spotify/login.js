//express
const express = require("express");
const route = express.Router();

// other spotify Routes

//dotEnv

const SpotifyClass = require("../../classes/SpotifyClass");

const spotifyClass = new SpotifyClass();

route.post("/", async (req, res) => {
  // post request since we need the code from the client
  spotifyClass.login(req, res);
});
module.exports = {
  route,
};
