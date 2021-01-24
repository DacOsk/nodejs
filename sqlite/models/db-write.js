const sqlite3 = require('sqlite3').verbose();

module.exports.dbWrite = (data, method, res) => {
    let db = new sqlite3.Database('./db/test.db', err => {
        if (err) console.error(err);
        console.log('DB connected.');
    });

    const sql = (method === 'new') ? 
            'INSERT INTO test VALUES (?, ?)':
            'UPDATE test SET col1 = ?, col2 = ? WHERE rowid = ' + data.id;

    db.serialize(() => {    
        const write = db.prepare(sql);
        write.run(data.col1, data.col2).finalize(err => {
            if (err) console.error(err);
            console.log('data written to DB');
        });
        db.close(err => {
            if (err) console.error(err);
            console.log('DB closed');
            res.redirect("/");
        });
    });
}