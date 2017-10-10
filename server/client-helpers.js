// Used by server to send game info to client in correct form
const buildStateForClient = results => {
  let state = {};
  state.board = {};
  state.allMoves = JSON.parse(results.allMoves);
  state.board.turn = JSON.parse(results.allMoves).p1guess.length;
  state.board.p1Pieces = 0; // not sure what this should be
  state.board.p2Pieces = 0; 
  state.board.p1 = buildGridForClient(results, 1);
  state.board.p2 = buildGridForClient(results, 2);
  //state.chats = buildChatsForClient(results);
  return state;
};

const buildChatsForClient = results => {
  let chats = [];
  let p1chat = JSON.parse(results.chats[0]);
  let p2chat = JSON.parse(results.chats[1]);
  for (let i = 0; i < p1chat.length; i++) {
    if (i % 2 === 0) {
      chats.push({"player": "p1", "text": p1chat[i]});
    } else {
      if (p2chat[i] !== undefined) {
        chats.push({"player": "p2", "text": p2chat[i]});
      }
    }
  }
  return chats;
};

const buildGridForClient = (results, player) => {
  let grid = {};
  console.log('Type of player: ', typeof player);

  // A sq has been guessed if the other player hit it or missed on it
  let otherPlayer = player === 1 ? 2 : 1;
  let guessArr = JSON.parse(results['player' + otherPlayer + 'Hits']).concat(
    JSON.parse(results['player' + otherPlayer + 'Misses'])
  );
  let placeArr = JSON.parse(results['player' + player + 'Placement']);

  // Assume results.player1Placement will look like this:
  // [{'0,0': true}, {'0,1': false}, ...]
  for (let c = 0; c <= 8; c++) {
    for (let r = 0; r <= 8; r++) {
      let sq = `${r},${c}`;
      grid[sq] = {
        id: sq,
        row: r,
        col: c,
        color: 'blue' // placeholder - fill this in
      };
      grid[sq].hasBread = placeArr.includes(sq);
      grid[sq].guessed = guessArr.includes(sq);
    }
  }
  return grid;
};

module.exports.buildStateForClient = buildStateForClient;
