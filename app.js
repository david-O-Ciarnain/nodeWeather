const express = require("express")

const app = express();
const PORT = 3000;

app.get("",(req,res) =>{
    res.status(200).send("Hello World")
})

app.get("/help",(req,res) => {
    res.status(200).send("Help page!")
})

app.get("/about",(req,res) => {
    res.status(200).send("About page!")
})

app.get("/weather",(req,res) => {
    res.status(200).send("Weather page!")
})

app.listen(PORT,() => console.log("Server listening on port " + PORT))
