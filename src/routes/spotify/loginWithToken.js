const route = require("express").Router();
const Token = require("../../schema/refreshToken");
const { spotifyApi } = require("./login");

route.get("/:accessToken", async (req, res) => {
  const result = await Token.findOne({
    accessToken: req.params.accessToken,
  });
  if (!result) return res.status(400).send("Invalid Token");
  spotifyApi
    .refreshAccessToken()
    .then(async (data) => {
      console.log("The access token has been refreshed!");

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
      await Token.findOneAndUpdate(
        { accessToken: req.params.accessToken },
        {
          accessToken: data.body["access_token"],
        }
      );
      res.json({ accessToken: data.body["access_token"] });
    })
    .catch((err) => {
      console.log("Could not refresh access token", err);
    });
});

module.exports = route;
