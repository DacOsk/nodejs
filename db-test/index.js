/**
 * Imports
 */
const express = require("express");
const path = require("path");
const JSONdb = require("simple-json-db");

/**
 * local variables
 */
const app = express();
const port = process.env.PORT || "8000";
const db = new JSONdb(path.join(__dirname, "/db/database.json"));
let testData = {test: "data"};

/**
 * App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

if (!db.get('test')) {
    db.set('test', 'data');
    testData = db.get('test');
} else {
    testData = db.JSON();
    //console.log(testData);
}

/**
 * Routes
 */
app.get("/", (req, res) => {
    res.status(200).render("index", {
        title: "Home",
        data: testData.test[0].data0
    });
});

/**
 * Server Start
 */
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));