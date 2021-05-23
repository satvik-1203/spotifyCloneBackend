// packages
const express = require("express");
const { spotifyApi } = require("./spotify");

const route = express.Router();

route.get("/:name", (req, res) => {
  const songName = req.params.name;

  spotifyApi
    .searchTracks(songName)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json("No songs found under that name");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = route;
