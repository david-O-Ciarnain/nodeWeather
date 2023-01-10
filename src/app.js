const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

//Define paths for Express config
const publicPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname,"../templates")

//Setup handlebars engine and views loaction
app.set("view engine", "hbs");
app.set("views",viewsPath)

//Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sven",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Sven",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP PAGE",
    message: "This should be helpful or is it? ;)",
  });
});

app.get("/weather", (req, res) => {
  res.status(200).send({
    forcast: -5,
    location: "Stockholm",
  });
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));
