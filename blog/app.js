const bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    methodOverride = require("method-override"),
    app = express();

mongoose.connect("mongodb://localhost/blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Mongoose model config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTful routes
// index route
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) return console.error(err);
        res.render("index", { blogs: blogs });
    });
});

// create route
app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) return console.error(err);
        res.redirect("/blogs");
    });
});

// show route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, showBlog) => {
        if (err) return console.error(err);
        res.render("show", { blog: showBlog });
    });
});

// edit route
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, showBlog) => {
        if (err) return console.error(err);
        res.render("edit", { blog: showBlog });
    });
});

// update route
app.put("/blogs/:id", (req, res) => {
    Blog.findOneAndUpdate({
            _id: req.params.id
        },
        req.body.blog, {
            new: true
        },
        (err, updatedBlog) => {
            if (err) {
                res.render("/edit", { blog: updatedBlog });
            }
            res.redirect("/blogs/" + req.params.id);
        }
    );
});

// delete route
app.delete("/blogs/:id", (req, res) => {
    Blog.findOneAndDelete({
            _id: req.params.id
        },
        err => {
            if (err) return console.error(err);
            res.redirect("/blogs");
        }
    );
});

// 404 route
app.get("*", (req, res) => {
    res.render("404");
});

// server start
app.listen(3000, () => console.log("Blog active!"));