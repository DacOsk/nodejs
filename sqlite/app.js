const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/test.db', err => {
    if(err) console.error(err);
    console.log('DB connected.');
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS test (col1 varchar(20), col2 integer)');
    const dbInsert = db.prepare('INSERT INTO test VALUES (?, ?)');
    for (let i = 1; i <= 10; i++) {
        dbInsert.run(`row ${i}`, 10 - i);
    }
    dbInsert.finalize();

    db.each('SELECT rowid AS id, col1, col2 FROM test', (err, row) => {
        if (err) console.error(err);
        console.log(`${row.id}: ${row.col1}, ${row.col2}`);
    });

    const dbDelete = db.prepare('DELETE FROM test WHERE col1 LIKE "row%"');
    dbDelete.run(err => {
        if (err) console.error(err);
        console.log(`Contents deleted.`);
    }).finalize();
});

db.close(err => {
    if(err) console.error(err);
    console.log('DB connection closed.');
});