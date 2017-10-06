const sequelize = require('sequelize');
const connection = require('../database/index.js');


// Updated syntax to simplify code and use built-in escaping functionality,
// preventing SQL injection attacks
const createNewPlayer = (obj, callback) => {
  connection.query(`INSERT into users SET ?`, obj, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// EG note: Let me know more about how this should work!
// Like, what should the endpoint be?
//returns all games that userId is in (whether they are player1 or player2)
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

const createNewGame = (obj, callback) => {
  connection.query(
    `INSERT into games (player1ID, player1Placement, player1Hits, player1Misses, player2ID, player2Placement, player2Hits, player2Misses, result) Values (
    ${obj.user1Id}, '[]', '[]', '[]', ${obj.user2Id}, '[]', '[]', '[]', null)`, (err, results, fields) => {
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

const getUser = (userName, callback) => {
  connection.query(`SELECT * FROM users WHERE username = ${userName}`, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Fold this into more general updateGame function?
// This could definity work inside the updateGame function,
// Given the initial board placement of all the user's pieces
// we can set the player1 placement
// const breadPlacement = (userId, col, row, callback) => {
//   let placement = [col, row];
//   connection.query('tbd', (err, results, fields) => {
//     if (err) {
//       callback(err, null); 
//     } else {
//       callback(null, results);
//     }
//   });
// };

// // Fold this into more general updateGame function?
// const guessLocation = (userId, col, row, callback) => {
//   connection.query('tbd', (err, results, fields) => {
//     if (err) {
//       callback(err, null); 
//     } else {
//       callback(null, results);
//     }
//   });
// };

// // Fold this into more general updateUser function?
// // Yeah, Once a game is concluded, both the winner and loser will have their profile updated
// // Winner gets their win count++ and possible level up (depending on what our achievement ranks are)
// // Loser gets their losses count ++
// // With this in mind, we can add a w/l array to the user schema to see if they are on a winning streak/losing streak

// const playerLevelUp = (userId, newLevel, callback) => {
//   connection.query(`UPDATE users SET playerLevel='${newLevel}' WHERE id='${userId}';`, (err, results, fields) => {
//   //updates players current level to given level. 
//     if (err) {
//       callback(err, null); 
//     } else {
//       callback(null, results);
//     }
//   });
// };


module.exports.selectPlayersGames = selectPlayersGames;
module.exports.createNewGame = createNewGame;
module.exports.createNewPlayer = createNewPlayer;
//module.exports.breadPlacement = breadPlacement;
//module.exports.guessLocation = guessLocation;
//module.exports.playerLevelUp = playerLevelUp;

module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.getGame = getGame;
module.exports.updateGame = updateGame;