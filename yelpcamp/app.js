const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    override = require("method-override");

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
app.use(override("_method"));

app.set("view engine", "pug");

const Campground = require("./models/campgrounds");
const Comment = require("./models/comment");
const campgrounds = require("./models/campgrounds");

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
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) return console.error(err);
        res.render("show", { campground: foundCampground });
    });
});
// Add comments route
app.post("/campgrounds/:id/comments", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) return console.error(err);
        Comment.create(req.body.comment, (err, comment) => {
            if (err) return console.error(err);
            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/" + campground._id);
        });
    });
});
app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => console.log("YelpCamp listening..."));