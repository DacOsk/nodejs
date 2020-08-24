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

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
const Campground = mongoose.model("Campground", campgroundSchema);

/* const camp = new Campground({
    name: "Papuk",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arang_Kel_-_Neelum_Valley.jpg/640px-Arang_Kel_-_Neelum_Valley.jpg"
});
camp.save((err, camp) => {
    if (err) return console.error(err);
    console.log("Database initialized");
}); */

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

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => console.log("YelpCamp listening..."));