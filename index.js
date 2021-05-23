const express = require("express");

const app = express();
<<<<<<< HEAD
const { route: spotify } = require("./routes/spotify");
=======
const spotify = require("./routes/spotify");
const search = require("./routes/search");
>>>>>>> 47b3acf48fe937558c2a588da76dfbdd6843c42a

app.use(express.json());

app.use("/spotify", spotify);

app.use("/spotify/search", search);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
