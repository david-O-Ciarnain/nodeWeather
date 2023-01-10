const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { forecast } = require("./util/forecast");
const { gecode } = require("./util/gecode");

const app = express();
const PORT = 3000;

//Define paths for Express config
const publicPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views loaction
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath));

const name = "Sven Svensson";

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP PAGE",
    message: "This should be helpful or is it? ;)",
    name,
  });
});

app.get("/weather", ({ query }, res) => {
  if (!query.address) {
    return res.status(400).send({
      error: "No Address was provided",
    });
  }
  gecode(query.address, (error, { longitude, latitude, location} = {}) => {
    if (error) {
      console.log(error);
      return res.send(error);
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        console.log(error);
        return res.send(error);
      }

      res.status(200).send({
        forecast: forecastData,
        location,
        address: query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.status(404).render("page404", {
    title: "Page not found",
    message: "404 Help artical not found!",
    name,
  });
});
app.get("*", (req, res) => {
  res.status(404).render("page404", {
    title: "Page not found",
    message: "404 page not found!",
    name,
  });
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));
