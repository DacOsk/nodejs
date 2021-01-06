const express = require('express');
const app = express();

//ROUTES//

//Root
app.get('/', (req, res) => {
    res.send('Hi there, welcome to Node exercise!');
});

//Animal languages ;)
app.get('/speak/:animal', (req, res) => {
    const animal = req.params.animal;
    const speak = {
        pig: 'Oink',
        cow: 'Moo',
        dog: 'Woof Woof!'
    };
    if (speak.hasOwnProperty(animal)) {
        res.send(`The ${animal} says "${speak[animal]}"`);
    } else {
        res.send(`Sorry, no ${animal} here!`);
    }
});

//Repeat
app.get('/repeat/:word/:times', (req, res) => {
    const word = req.params.word;
    const times = Number(req.params.times);
    const message = ''.padEnd((word.length * times + times), ` ${word}`);
    res.send(message);
});

//Catch all
app.get('*', (req, res) => {
    res.send('<h1>Error 404 - Page not found!</h1>');
});

//Server startup
app.listen(3000, () => {
    console.log('Express server listening on port 3000.');
});