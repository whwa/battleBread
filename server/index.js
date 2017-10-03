const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../client/'));

app.get('/', (req, res) => {
  res.send('index.html');
});

app.post('/login', (req, res) => {
 // log user in
});

app.post('/games', (req, res) => {
 // add to games table
});

app.get('/games/:gameId', (req, res) => {
 // get from games table
});

app.post('/games/:gameId', (req, res) => {
 // add to games table
});

app.post('/users', (req, res) => {
 // add to users table
});

app.get('/users/:userId', (req, res) => {
 // get info from users table
});

app.post('/users/:userId', (req, res) => {
 // add to users table
});

app.get('/scores', (req, res) => {
 // get from scores table
});

app.post('/scores', (req, res) => {
 // add to scores table
});

app.listen(3000, () => console.log(`Express listening on port 3000`));