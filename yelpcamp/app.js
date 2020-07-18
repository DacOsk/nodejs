const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('*', (req, res) => {
    res.render('404');
});

app.listen(3000, () => console.log('YelpCamp listening...'));