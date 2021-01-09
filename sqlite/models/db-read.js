const sqlite3 = require('sqlite3').verbose();

module.exports.dbRead = () => {
    let db = new sqlite3.Database('./db/test.db', err => {
        if(err) console.error(err);
        console.log('DB connected.');
    });
    const dbReadResult = {};
    const sql = `SELECT rowid AS id, col1, col2 FROM test`
    db.serialize(() => {
        db.each(sql,(err, row) => {
            if (err) console.error(err);
            dbReadResult[row.id] = {
                col1: row.col1, 
                col2: row.col2
            };
        });
    });

    db.close(err => {
        if (err) console.error(err);
        console.log('DB closed');
    });
    console.log(dbReadResult);
    return dbReadResult;
};