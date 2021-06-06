const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const spotify = require("./src/routes/spotify/index");

mongoose
  .connect("mongodb://localhost:27017/spotifyHome", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database...");
  })
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["*", "content-Type"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/spotify", spotify);

app.get("/", (req, res) => {
  res.send("Connected to localhost 3001");
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
