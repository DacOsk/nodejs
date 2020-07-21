const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds");
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => console.log("YelpCamp listening..."));