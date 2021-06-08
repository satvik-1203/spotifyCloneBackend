const express = require("express");
const { spotifyClass } = require("./login");

const route = express.Router();

route.get("/:accessToken", (req, res) => {
  spotifyClass.getUserInfo(req, res);
});

module.exports = {
  route,
};

// spotifyApi
//     .getMe()
//     .then((data) => {
//       res.json(data.body);
//     })
//     .catch((err) => {
//       console.log("Something went wrong!", err);
//     });
