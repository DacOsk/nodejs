const sqlite3 = require('sqlite3').verbose();

module.exports.dbRead = (value, res) => {
    let db = new sqlite3.Database('./db/test.db', err => {
        if(err) console.error(err);
        console.log('DB connected.');
    });

    const dbReadResult = [];
    const sql = 'SELECT * FROM test WHERE col2 LIKE ?';

    db.all(sql, [value], (err, rows) => {
        if (err) console.error(err);    
        res.render("test", {
            data: rows
        });
    });

    db.close(err => {
        if (err) console.error(err);
        console.log('DB closed');
    });
};