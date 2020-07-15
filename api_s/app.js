const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

app.post('/results', (req, res) => {
    axios.get(`http://www.omdbapi.com/?apikey=thewdb&s=${req.body.search}`)
        .then(response => {
            const movies = response.data.Search.sort(
                (a, b) => a.Year - b.Year
            );
            res.render('results', {
                movies: movies
            });
        })
        .catch(err => console.log(err));
})

/* //async version
(async() => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
})();

//promise version
axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => console.log(response.data.title))
    .catch(error => console.log(error))
    .finally(() => console.log('Axios end')); */

app.listen(3000, () => {
    console.log('app listening');
})