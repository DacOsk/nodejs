const sqlite3 = require('sqlite3').verbose(),
      express = require('express'),
      bodyParser = require('body-parser'),
      override = require('method-override');

//const dbData = require('./models/db-read');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/test", (req, res) => {
    /* const dbFill = require('./models/db-write');
    dbFill.dbWrite(); 
    const data = dbData.dbRead();*/
    const sql = 'SELECT * FROM test WHERE col2 = ?';
    db.all(sql, [6], (err,rows) => {
        if (err) console.error(err);
        res.render("test", {
            data: rows
        });
    });
});

app.post("/test", (req, res) => {
    const sql = 'SELECT * FROM test WHERE col2 = ?';
    db.all(sql, [req.body.number], (err,rows) => {
        if (err) console.error(err);
        res.render("test", {
            data: rows
        });
    });
});

let db = new sqlite3.Database('./db/test.db', err => {
    if(err) console.error(err);
    console.log('DB connected.');
});
/*
    const newDB = db.run('CREATE TABLE IF NOT EXISTS test (col1 varchar(20), col2 integer)');
    if (newDB) {
        const dbInsert = db.prepare('INSERT INTO test VALUES (?, ?)');
        for (let i = 1; i <= 10; i++) {
            dbInsert.run(`row ${i}`, 10 - i);
        }
        dbInsert.finalize();
        db.close(err => {
            if(err) console.error(err);
            console.log('DB connection closed.');
        });
    }

    db.each('SELECT rowid AS id, col1, col2 FROM test', (err, row) => {
        if (err) console.error(err);
        //console.log(`${row.id}: ${row.col1}, ${row.col2}`);
        dbData[row.id] = [row.col1, row.col2];
    });

    const dbDelete = db.prepare('DELETE FROM test WHERE col1 LIKE "row%"');
    dbDelete.run(err => {
        if (err) console.error(err);
        console.log(`Contents deleted.`);
    }).finalize();
*/

app.listen(3000, () => console.log("SQL_test listening..."));