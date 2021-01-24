const sqlite3 = require('sqlite3').verbose();

module.exports.dbNew = () => {
    let db = new sqlite3.Database('./db/test.db');
    const sql = 'CREATE TABLE IF NOT EXISTS test (col1 varchar(20), col2 integer)';

    db.serialize(() => {
        const newDB = db.run(sql);
        if (newDB) {
            console.log('DB created.');
            db.close(err => {
                if (err) console.error(err);
                console.log('DB closed.');
            });
        }
    });
}