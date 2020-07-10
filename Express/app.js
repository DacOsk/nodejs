const express = require('express');
const app = express();

//ROUTES//
app.get('/', (req, res) => {
    res.send('Hi there!');
});

app.get('/bye', (req, res) => {
    console.log(req.params);
    res.send('Goodbye!!');
});

app.get('*', (req, res) => {
    res.send('404 Error!');
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000.');
});