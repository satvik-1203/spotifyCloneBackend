const express = require("express");
const cors = require("cors");
const app = express();
const { route: spotify } = require("./routes/spotify");
const { route: search } = require("./routes/search");
const { route: userInfo } = require("./routes/spotifyUserInfo");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["*", "content-Type"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/spotify/login", spotify);

app.use("/spotify/search", search);

app.use("/spotify/userInfo", userInfo);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
