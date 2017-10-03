const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'battlebread'
});

const createNewPlayer = (userName, password, callback) => {
	connection.query("INSERT into users (username, password) Values ('" + userName + "', '" + password + "');", (err, results, fields) => {
		//insert userName and password combo to DB can use a hashing function later, mvp right now.
		if (err) {
			callback(err, null);
		} else {
			callback(null, results))
		}
	});
};

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

const breadPlacement = (userId, col, row, callback) => {
	let placement = [col, row];

	connection.query('tbd'), (err, results, fields) => {
		if(err) {
			callback(err, null); 
		} else {
			callback(null, results);
		}
	});
};

const guessLocation = (userId, col, row, callback) => {
	connection.query('tbd', (err, results, fields) => {
		if(err) {
			callback(err, null); 
		} else {
			callback(null, results);
		}
	});
};

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

//"UPDATE phrases SET status='" + status + "' WHERE id=" + id,

//testing for createNewGame, copy and paste below
//INSERT into games (player1ID, player1Placement, player1Hits, player1Misses, player2ID, player2Placement, player2Hits, player2Misses, lastMove, result) Values (1, '[]', '[]', '[]', 2, '[]', '[]', '[]', null, null);