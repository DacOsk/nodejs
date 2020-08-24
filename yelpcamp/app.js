const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//express server
const app = express();

//db connection
mongoose.connect("mongodb://localhost/yelpcamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");

db.once("open", () => {
    const campgroundSchema = new mongoose.Schema({
        name: String,
        image: String
    });
    const Campground = mongoose.model("Campground", campgroundSchema);
});

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