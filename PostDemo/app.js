const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const friends = ['Pero', 'Đuro', 'Janko', 'Marko'];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/addfriend', (req, res) => {
  friends.push(req.body.newFriend);
  res.redirect('/friends');
});

app.get('/friends', (req, res) => {
  res.render('friends', {
    friends: friends
  });
});

app.get('*', (req, res) => {
  res.render('404');
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
