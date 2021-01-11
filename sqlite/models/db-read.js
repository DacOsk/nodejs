const sqlite3 = require('sqlite3').verbose();

module.exports.dbRead = () => {
    let db = new sqlite3.Database('./db/test.db', err => {
        if(err) console.error(err);
        console.log('DB connected.');
    });

    const dbReadResult = [];
    const sql = 'SELECT * FROM test';
    db.serialize(() => {
        db.get(sql,(err, row) => {
            if (err) console.error(err);
            dbReadResult = row;
        });
    });

    db.close(err => {
        if (err) console.error(err);
        console.log('DB closed');
    });
    return dbReadResult;
};