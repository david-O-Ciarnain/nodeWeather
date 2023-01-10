const path = require("path");
const express = require("express");
const hbs = require("hbs");

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

const name = "Sven Svensson"

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

app.get("/weather", (req, res) => {
  res.status(200).send({
    forcast: -5,
    location: "Stockholm",
  });
});

app.get("/help/*", (req, res) => {
  res.render("page404",{
    title:"Page not found",
    message:"404 Help artical not found!",
    name
  })

});
app.get("*", (req, res) => {
  res.render("page404",{
    title:"Page not found",
    message:"404 page not found!",
    name
  })
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));
