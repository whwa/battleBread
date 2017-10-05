const sequelize = require('sequelize');
const connection = require('../database/index.js');


// Working!
const createNewPlayer = (userName, password, callback) => {
 connection.query("INSERT into users (username, password) Values ('" + userName + "', '" + password + "');", (err, results, fields) => {
  //insert userName and password combo to DB can use a hashing function later, mvp right now.
  if (err) {
   callback(err, null);
  } else {
   callback(null, results)
  }
 });
};

// EG note: Let me know more about how this should work!
// Like, what should the endpoint be?
const selectPlayersGames = (userId, callback) => {
 connection.query("SELECT * FROM games WHERE player1ID = " + userId + " or player2ID = " + userId + ";", (err, results, fields) => {
  //returns all games that userId is in (whether they are player1 or player2)
  if (err) {
   callback(err, null); 
  } else {
   callback(null, results);
  }
 });
};

// Working!
const getGame = (gameId, callback) => {
  connection.query(`SELECT * FROM games WHERE id = ${gameId}`, (err, results, fields) => {
    if (err) {
     callback(err, null); 
    } else {
     callback(null, results);
    } 
  })
};

// Working!
const createNewGame = (user1Id, user2Id, callback) => {
 connection.query(
  "INSERT into games (player1ID, player1Placement, player1Hits, player1Misses, player2ID, player2Placement, player2Hits, player2Misses, lastMove, result) Values ("
   + user1Id + ", '[]', '[]', '[]', " + user2Id + ", '[]', '[]', '[]', null, null);", (err, results, fields) => {
  //creates a new game between user1Id, and user2Id. Starts with empty tuples.
  if(err) {
   callback(err, null); 
  } else {
   callback(null, results);
  }
 });
};

// Fold this into more general updateGame function?
const breadPlacement = (userId, col, row, callback) => {
 let placement = [col, row];
 connection.query('tbd', (err, results, fields) => {
  if(err) {
   callback(err, null); 
  } else {
   callback(null, results);
  }
 });
};

// Fold this into more general updateGame function?
const guessLocation = (userId, col, row, callback) => {
 connection.query('tbd', (err, results, fields) => {
  if(err) {
   callback(err, null); 
  } else {
   callback(null, results);
  }
 });
};

// Working!
// Need to update this to do multiple keys/values
const updateGame = (gameId, key, value, callback) => {
  connection.query(`UPDATE games SET ${key} = ${value} WHERE id = ${gameId}`, (err, results, fields) => {
    if(err) {
     callback(err, null); 
    } else {
     callback(null, results);
    }    
  });
};

// Working!
// Need to update this to do multiple keys/values
const updateUser = (userId, key, value, callback) => {
  connection.query(`UPDATE users SET ${key} = ${value} WHERE id = ${userId}`, (err, results, fields) => {
    if(err) {
     callback(err, null); 
    } else {
     callback(null, results);
    }    
  });
};

// Working!
const getUser = (userId, callback) => {
  connection.query(`SELECT * FROM users WHERE id = ${userId}`, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Fold this into more general updateUser function?
const playerLevelUp = (userId, newLevel, callback) => {
 connection.query("UPDATE users SET playerLevel=" + newLevel + " WHERE id=" + userId + ";", (err, results, fields) => {
 //updates players current level to given level. 
  if(err) {
   callback(err, null); 
  } else {
   callback(null, results);
  }
 });
};

module.exports.selectPlayersGames = selectPlayersGames;
module.exports.createNewGame = createNewGame;
module.exports.breadPlacement = breadPlacement;
module.exports.guessLocation = guessLocation;
module.exports.playerLevelUp = playerLevelUp;

module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.getGame = getGame;
module.exports.updateGame = updateGame;


// Devon notes:
//"UPDATE phrases SET status='" + status + "' WHERE id=" + id,
//testing for createNewGame, copy and paste below
//INSERT into games (player1ID, player1Placement, player1Hits, player1Misses, player2ID, player2Placement, player2Hits, player2Misses, lastMove, result) Values (1, '[]', '[]', '[]', 2, '[]', '[]', '[]', null, null);