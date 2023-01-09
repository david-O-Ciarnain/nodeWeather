const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

const publicPath = path.join(__dirname, "../public/");

app.use(express.static(publicPath));

app.get("/weather", (req, res) => {
  res.status(200).send({
    forcast: -5,
    location: "Stockholm",
  });
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));
