const express = require('express');
const db = require('../database/database-helpers.js');
const dbi = require('../database/index.js');
const clientHelpers = require('./client-helpers.js');
const bodyParser = require('body-parser');
const app = express();  

// EG note to self: to start sql, brew services restart mysql
// mysql -u root < database/schema.sql

app.use(express.static(__dirname + '/../client/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('index.html');
});

app.post('/login', (req, res) => {
  // log user in
});

// This endpoint only for starting new games
app.post('/games', (req, res) => {
  db.createNewGame(req.body.user1ID, req.body.user2ID, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      console.log('Created new game: ', results);
      res.send(results);
    }
  }); 
});

// This endpoint serves information about particular games
app.get('/games/:gameId', (req, res) => {
  db.getGame(req.params.gameId, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      console.log('Retrieved game info: ', results[0]);
      res.send(clientHelpers.buildStateForClient(results[0]));
      //res.send(results);  
    }    
  });
});

// This endpoint updates games (e.g. hits, misses, etc.)
app.post('/games/:gameId', (req, res) => {
  db.updateGame(req.params.gameId, req.body, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      console.log('Updated game: ', results);
      res.send(results);
    }
  });
});

// This endpoint only for creating new users
app.post('/users', (req, res) => {
  db.createNewPlayer(req.body.userName, req.body.password, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      //console.log('Created new user: ', results);
      res.send(results);
    }
  }); 
});

// This endpoint serves info on particular users
app.get('/users/:userId', (req, res) => {
  db.getUser(req.params.userId, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      console.log('Retrieved user: ', results);
      res.send(results);
    }
  });
});

// This endpoint is for updating user profiles
app.post('/users/:userId', (req, res) => {
  db.updateUser(req.params.userId, req.body, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      console.log('Updated user: ', results);
      res.send(results);
    }
  });
});

app.listen(3000, () => console.log(`Express listening on port 3000`));