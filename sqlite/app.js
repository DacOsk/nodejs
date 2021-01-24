const sqlite3 = require('sqlite3').verbose(),
      express = require('express'),
      bodyParser = require('body-parser'),
      override = require('method-override'),
      fs = require('fs');

const dbData = require('./models/db-read'),
    dbInsert = require('./models/db-write');

try {
    if (fs.existsSync('./db/test.db')) {
        console.log('DB exists');
    } else {
        console.log('DB file missing');
        const dbCreate = require('./models/db-new');
        dbCreate.dbNew();
    }
} catch (err) {
    console.error(err);
} finally {

    const app = express();
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.set("view engine", "pug");

    app.get("/", (req, res) => {
        res.render("landing");
    });

    app.post("/test", (req, res) => {
        const method = 'read';
        const data = dbData.dbRead(req.body.number, method, res);
    });

    app.get("/new-data", (req, res) => {
        res.render("insert");
    });

    app.post("/write", (req,res) => {
        const method = 'new';
        const newData = dbInsert.dbWrite(req.body.new, method, res);
    });

    app.get("/edit/:id", (req, res) => {
        if (req.params.id === '0') {
            res.render("insert");
        } else {
            const method = 'edit';
            const editData = dbData.dbRead(req.params.id, method, res);
        }
    });

    app.post("/update", (req, res) => {
        const method = 'update';
        const updateData = dbInsert.dbWrite(req.body.update, method, res);
    });

    app.post("/delete", (req, res) => {
        res.send('<h2>Delete row page!</h2>');
    })
    /*
        const dbDelete = db.prepare('DELETE FROM test WHERE col1 LIKE "row%"');
        dbDelete.run(err => {
            if (err) console.error(err);
            console.log(`Contents deleted.`);
        }).finalize();
    */

    app.listen(3000, () => console.log("SQL_test listening..."));
}