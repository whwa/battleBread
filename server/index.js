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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Using to make testing easier
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('index.html');
});

app.post('/login', (req, res) => {
  // log user in
});

// This endpoint only for starting new games.
// Requires req.body to have user1ID and user2ID properties.
app.post('/games', (req, res) => {
  db.createNewGame(req.body, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      console.log('Created new game: ', JSON.stringify(results));
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
      console.log('Retrieved game info: ', JSON.stringify(results[0]));
      res.send(clientHelpers.buildStateForClient(results[0]));
    }    
  });
});

// This endpoint updates games (e.g. hits, misses, etc.)
app.post('/games/:gameId', (req, res) => {
  db.updateGame(req.params.gameId, req.body, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      console.log('Updated game: ', JSON.stringify(results));
      res.send(results);
    }
  });
});

// This endpoint only for creating new users.
// Requires req.body to have username and password properties.
app.post('/users', (req, res) => {
  db.createNewPlayer(req.body, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      console.log('Created new user: ', JSON.stringify(results));
      res.send(results);
    } 
  }); 
});

// This endpoint serves info on particular users
app.get('/users/:userName', (req, res) => {
  db.getUser(req.params.userName, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      console.log('Retrieved user: ', JSON.stringify(results));
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
      console.log('Updated user: ', JSON.stringify(results));
      res.send(results);
    }
  });
});

app.listen(3000, () => console.log(`Express listening on port 3000`));