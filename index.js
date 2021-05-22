const express = require("express");

const app = express();
const spotify = require("./routes/spotify");

app.use(express.json());

app.use("/spotify", spotify);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
