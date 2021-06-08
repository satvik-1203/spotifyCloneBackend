const express = require("express");
const { spotifyClass } = require("./login");
const route = express.Router();

route.get("/:accessToken", async (req, res) => {
  spotifyClass.loginWithToken(req, res);
});

module.exports = { route };
