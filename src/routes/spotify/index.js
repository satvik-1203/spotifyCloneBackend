const { route: spotifyUserInfo } = require("./spotifyUserInfo");
const { route: login } = require("./login");
const { route: search } = require("./search");
const { route: loginToken } = require("./loginWithToken");
const route = require("express").Router();

route.use("/login", login);

route.use("/search", search);

route.use("/userInfo", spotifyUserInfo);

route.use("/loginWithToken", loginToken);

module.exports = route;
