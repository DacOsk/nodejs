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
    image: String,
    description: String
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

app.post("/campgrounds", (req, res) => {
    Campground.create(req.body.camp, (err, newCamp) => {
        if (err) return console.error(err);
        res.redirect("/campgrounds");
    });
});

app.get("/campgrounds/:id", (req, res) => {
    //show details about selected campground
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) return console.error(err);
        res.render("show", { campground: foundCampground });
    });
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => console.log("YelpCamp listening..."));