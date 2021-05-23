const express = require("express");

const app = express();
const { route: spotify } = require("./routes/spotify");
const { route: search } = require("./routes/search");

app.use(express.json());

app.use("/spotify", spotify);

app.use("/spotify/search", search);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
