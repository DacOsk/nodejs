const bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

mongoose.connect("mongodb://localhost/blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

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

// server start
app.listen(3000, () => console.log("Blog active!"));