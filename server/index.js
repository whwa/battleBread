const express = require('express');
const db = require('../database/database-helpers.js');
const dbi = require('../database/index.js');
const clientHelpers = require('./client-helpers.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();  


// EG note to self: to start sql, brew services restart mysql
// mysql -u root < database/schema.sql

app.use(express.static(__dirname + '/../client/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Using to make testing easier
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('index.html');
});

app.post('/login', (req, res) => {
  console.log('loggin in');
  let username = req.body.username;
  let password = req.body.password;
  console.log(username);
  db.getUser(username, password, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      if (results.length === 0) {
        res.sendStatus(404).send('username/password is wrong');
      } else {
        console.log('this is server data', results);
        res.send(results);
      }
    }
  });
});

// This endpoint only for starting new games.
// Requires req.body to have user1ID and user2ID properties.
app.post('/games', (req, res) => {
  console.log('hello');
  db.createNewGame((err, results) => {
    console.log(results.insertId);
    if (err) { 
      console.error(err); 
    } else {
      res.send(results.insertId);
    }
  }); 
});

// This endpoint serves information about particular games
app.get('/games/:gameId', (req, res) => {
  db.getGame(req.params.gameId, (err, results) => {
    if (err) { 
      console.error(err); 
    } else {
      //console.log('Retrieved game info: ', JSON.stringify(results[0]));
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
  let username = req.body.username;
  let password = req.body.password;
  console.log('registering username:', username);
  db.getUser(username, password, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      //if user exist, send an error to client
      console.log('this is the results of registering:', results);
      if (results.length === 1) {
        res.status(404).send('Not found');
      } else {
      //if username doesnt exist, create a new user with password and username
        db.createNewPlayer({username: username, password: password}, (err, results) => {
          if (err) {
            console.err(err);
          } else {
            res.status(200).send('Created New User');
          }
        });
      }
    }
  });
});

// This endpoint serves info on particular users
app.get('/users/:userName', (req, res) => {
  // db.getUser(req.params.userName, req.pa (err, results) => {
  //   if (err) { 
  //     console.error(err); 
  //   } else {
  //     console.log('Retrieved user: ', JSON.stringify(results));
  //     res.send(results);
  //   }
  // });
  next();
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