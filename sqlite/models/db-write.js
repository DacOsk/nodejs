const sqlite3 = require('sqlite3').verbose();

module.exports.dbWrite = (data, res) => {
    let db = new sqlite3.Database('./db/test.db', err => {
        if(err) console.error(err);
        console.log('DB connected.');
    });

    const sql = 'INSERT INTO test VALUES (?, ?)';

    const write = db.prepare(sql);
    write.run(data.col1, data.col2);      
    write.finalize(err => {
        if (err) console.error(err);
        console.log('data written to DB');
    });
    db.close(err => {
        if (err) console.error(err);
        console.log('DB closed');
        res.redirect("/");
    });
}