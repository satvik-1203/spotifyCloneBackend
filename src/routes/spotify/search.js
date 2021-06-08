const express = require("express");
const { spotifyClass } = require("./login");

const route = express.Router();

route.get("/:accessToken/:name", (req, res) => {
  spotifyClass.spotifySearch(req, res);
});

module.exports = {
  route,
};
