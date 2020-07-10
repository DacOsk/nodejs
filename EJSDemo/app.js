const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/posts', (req, res) => {
    const posts = [
        { title: 'Post 1', author: 'Pero' },
        { title: 'Post 2', author: 'Đuro' },
        { title: 'Post 3', author: 'Ivo' },
        { title: 'Post 4', author: 'Ana' },
        { title: 'Post 5', author: 'Mara' },
    ];
    res.render('posts', { posts: posts });
});

app.get('/:pass_var', (req, res) => {
    const pass = req.params.pass_var;
    res.render('variable', { passVar: pass });
});

app.get('*', (req, res) => {
    res.render('404');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});