const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//express server
const app = express();

//db connection
mongoose.connect("mongodb://localhost:27017/yelpcamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
const Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, campground) => {
        if (err) return console.error(err);
        res.render("campgrounds", {
            campground: campground
        });
    });
});

app.post("/newcamp", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {
        name: name,
        image: image
    };
    Campground.create(newCampground, (err, newCamp) => {
        if (err) return console.error(err);
        res.redirect("/campgrounds");
    });
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => console.log("YelpCamp listening..."));