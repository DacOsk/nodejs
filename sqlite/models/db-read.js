const sqlite3 = require('sqlite3').verbose();

module.exports.dbRead = (value, res) => {
    let db = new sqlite3.Database('./db/test.db', err => {
        if(err) console.error(err);
        console.log('DB connected.');
    });

    const sql = 'SELECT * FROM test WHERE col2 LIKE ?';

    db.all(sql, [value], (err, rows) => {
        if (err) console.error(err);  
        const noData = [ {
            col1: 'No data',
            col2: 0
        } ]
        const data = (rows.length > 0) ? rows : noData;
        //console.log(rows.length, data);
        res.render("test", {
            data: data
        });
    });

    db.close(err => {
        if (err) console.error(err);
        console.log('DB closed');
    });
};