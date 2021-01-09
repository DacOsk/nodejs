const sqlite3 = require('sqlite3').verbose();

module.exports.dbWrite = () => {
    let db = new sqlite3.Database('./db/test.db', err => {
        if(err) console.error(err);
        console.log('DB connected.');
    });

    const sql = 'INSERT INTO test VALUES (?, ?)';

    const write = db.prepare(sql);
    for (let i = 1; i <= 10; i++){
        write.run(`row${i}`, 11 - i);      
    }
    write.finalize(err => {
        if (err) console.error(err);
        console.log('data written to DB');
    });
    db.close(err => {
        if (err) console.error(err);
        console.log('DB closed');
    })
}