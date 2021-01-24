const sqlite3 = require('sqlite3').verbose();

module.exports.dbRead = (value, method, res) => {
    let db = new sqlite3.Database('./db/test.db', err => {
        if(err) console.error(err);
        console.log('DB connected.');
    });

    const sqlRead = 'SELECT rowid AS id, col1, col2 FROM test WHERE col2 LIKE ?';
    const sqlEdit = 'SELECT rowid AS id, col1, col2 FROM test WHERE rowid = ?';

    if (method === 'read') {
        db.all(sqlRead, [value], (err, rows) => {
            if (err) console.error(err);  
            const noData = [ {
                id: 0,
                col1: 'No data',
                col2: value
            } ]
            const data = (rows.length > 0) ? rows : noData;
            //console.log(rows.length, data);
            res.render("test", {
                data: data
            });
        });
    } else if (method === 'edit') {
        db.get(sqlEdit, [value], (err, row) => {
            if (err) console.error(err);
            res.render("edit", {
                data: row
            });
        });
    } else {
        res.render("landing");
    }

    db.close(err => {
        if (err) console.error(err);
        console.log('DB closed');
    });
};