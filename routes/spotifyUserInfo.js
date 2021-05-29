const express = require("express");
const { spotifyApi } = require("./spotify");

const route = express.Router();

route.get("/", (req, res) => {
  spotifyApi
    .getMe()
    .then((data) => {
      res.json(data.body);
    })
    .catch((err) => {
      console.log("Something went wrong!", err);
    });
});

module.exports = {
  route,
};
