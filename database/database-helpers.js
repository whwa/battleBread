const sequelize = require('sequelize');
const connection = require('../database/index.js');


const createNewPlayer = (obj, callback) => {
  connection.query(`INSERT into users SET ?`, obj, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const checkPassword = (userName, passwordHash, callback) => {
  connection.query(`SELECT * FROM users WHERE username = ${userName} and password = ${passwordHash}`, (err, results, fields) => {
    if (err) {
      callback (err, null);
    } else {
      callback(null, results);
    }
  });
}; 

const selectPlayersGames = (userId, callback) => {
  connection.query(`SELECT * FROM games WHERE player1ID = '${userId}' or player2ID = '${userId}'`, (err, results, fields) => {
    if (err) {
      callback(err, null); 
    } else {
      callback(null, results);
    }
  });
};

const getGame = (gameId, callback) => {
  connection.query(`SELECT * FROM games WHERE id = ${gameId}`, (err, results, fields) => {
    if (err) {
      callback(err, null); 
    } else {
      callback(null, results);
    }
  });
}; 

const createNewGame = (callback) => {
  connection.query(
    `INSERT into games (player1ID, player1Placement, player1Hits, player1Misses, player2ID, player2Placement, player2Hits, player2Misses, result) Values (
    0, '[]', '[]', '[]', 1, '[]', '[]', '[]', null);`, (err, results, fields) => {
      //creates a new game between user1Id, and user2Id. Starts with empty tuples.
      if (err) {
        callback(err, null); 
      } else {
        callback(null, results);
      }
    });
};

// Updated syntax to simplify code and use built-in escaping functionality,
// preventing SQL injection attacks
const updateGame = (gameId, obj, callback) => {
  connection.query(`UPDATE games SET ? WHERE id = ${gameId}`, obj, (err, results, fields) => {
    if (err) {
      callback(err, null); 
    } else {
      callback(null, results);
    }    
  });
};

// Updated syntax to simplify code and use built-in escaping functionality,
// preventing SQL injection attacks
const updateUser = (userId, obj, callback) => {
  connection.query(`UPDATE users SET ? WHERE id = ${userId}`, obj, (err, results, fields) => {
    if (err) {
      callback(err, null); 
    } else {
      callback(null, results);
    }    
  });
};

const getUser = (userName, password, callback) => {
  connection.query(`SELECT * FROM users WHERE username = '${userName}' and password = '${password}'`, (err, results) => {
    console.log(results);
    console.log('this is err', err);
    if (err) {
      callback (err, null);
    } else {
      callback(null, results);
    }
  });
};


// module.exports.getAllusers = getAllusers;
module.exports.selectPlayersGames = selectPlayersGames;
module.exports.createNewGame = createNewGame;
module.exports.createNewPlayer = createNewPlayer;
//module.exports.breadPlacement = breadPlacement;
//module.exports.guessLocation = guessLocation;
//module.exports.playerLevelUp = playerLevelUp;
module.exports.checkPassword = checkPassword;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.getGame = getGame;
module.exports.updateGame = updateGame;