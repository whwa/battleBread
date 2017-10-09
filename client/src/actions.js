import store from './store.js';
import randomInt from 'random-int';
import axios from 'axios';
import { range } from 'lodash';

const url = 'http://localhost:3000';

///////////////////
// BOARD ACTIONS //
///////////////////

/**
 * Dispatches a createBoard action to the state via boardReducer
 * No params necessary.
 * Invoke to create a new board state from scratch. 
 */
export const createBoard = () => {
  store.dispatch({ type: 'createBoard' });
};

export const setBoard = board => {
  store.dispatch({ type: 'setBoard', payload: { board }});
};

/**
 * Performs a 'guess' action on a single tile. Depending on whether or not there is
 * bread on that tile, different actions will occur.
 * @param {string} player either 'p1' or 'p2'. Represents TARGET player's board.
 * @param {string} id the ID of the guessed tile, ex: '1,1' or '4,3'
 */
export const guess = (player, id) => {
  store.dispatch({
    type: 'guess', 
    payload: { player, id },
  });
  store.dispatch({ type: 'toggleTurn' });
  const { p1Pieces, p2Pieces } = store.getState().board;
  store.dispatch({
    type: 'updatePieces',
    payload: { player: 'p1', pieces: p1Pieces },
  });
  store.dispatch({
    type: 'updatePieces',
    payload: { player: 'p2', pieces: p2Pieces },
  });
};

/**
 * Sets a single piece, which is represented by an array of its coordinates
 * @param {string} player either 'p1' or 'p2'
 * @param {array} piece an array of tile ID strings, ex: ['1,1','4,3']
 */
export const setPiece = (player, piece) => {
  store.dispatch({
    type: 'setPiece',
    payload: { player, piece },
  });
  store.dispatch({
    type: 'updatePieces',
    payload: { player, pieces: piece.length },
  });
};

/**
 * Sets a 2x1, 3x1, 4x1, and 5x1 piece on one player's board. TODO - prevent overlaps.
 * @param {string} player  either 'p1' or 'p2'
 */
export const setRandomPieces = (player) => {
  const pieces = range(2, 6)
    .map((len) => {
      const rotate = randomInt(0, 1);
      const scalar = randomInt(0, 7);
      return range(0, len).map((el, j) => (rotate) ? [scalar, j] : [j, scalar]);
    })
    .forEach(piece => setPiece(player, piece));
};

/**
 * OLD/FOR TESTING ONLY: randomly selects 14 tiles to have bread
 */
export const randomPieces = () => store.dispatch({ type: 'randomPieces' });

//////////////////
// CHAT ACTIONS //
//////////////////

/**
 * Adds a chat to the chat store
 * @param {string} player either 'p1' or 'p2'
 * @param {string} text the text of the message
 */
export const setChat = (player, text) => store.dispatch({
  type: 'setChat',
  payload: { player, text },
});

/**
 * Returns the entire chat store
 */
export const getChats = () => store.dispatch({ type: 'getChats' });

///////////////////////
// GAME INFO ACTIONS //
///////////////////////

/**
 * Simply returns entire gameInfo state
 */
export const getInfo = () => store.dispatch({ type: 'getInfo' });

/**
 * Updates a player's piece count in the state
 * @param { string } player 'p1' || 'p2'
 * @param { number } pieces The updated piece count total
 */
export const updatePieces = (player, pieces) => store.dispatch({
  type: 'updatePieces',
  payload: { player, pieces },
});

///////////////////////
// USER INFO ACTIONS //
///////////////////////

/**
 * Simply retrieves both user's info
 */
export const getUsers = () => store.dispatch({ type: 'getUsers' });

/**
 * Takes in the player's username, level, and chats, and modifies state to reflect
 * @param { string } player 'p1' || 'p2'
 * @param { string } username
 * @param { number } level
 * @param { string  } avatarUrl
 * @param { string  } streak
 * @param { number  } wins
 * @param { array } chats valid chats
 */
export const setUser = (player, userData) => {
  store.dispatch({
    type: 'setUser',
    payload: { player, userData },
  });
};

/////////////////////////
// SERVER INTERACTIONS //
/////////////////////////

export const getGame = gameId => {
  axios.get(`${url}/games/${gameId}`)
    .then(response => {
      console.log(response);
      const { board, chats } = response.data;
      setBoard(board);
      chats.forEach(chat => {
        const { player, text } = chat;
        setChat(player, text);
      });
      const p1Pieces = Object.keys(board.p1).filter(tile => !!board.p1[tile].hasBread);
      store.dispatch({
        type: 'updatePieces',
        payload: { player: 'p1', pieces: p1Pieces.length },
      });
      const p2Pieces = Object.keys(board.p2).filter(tile => !!board.p2[tile].hasBread);
      store.dispatch({
        type: 'updatePieces',
        payload: { player: 'p2', pieces: p2Pieces.length },
      });
      store.dispatch({
        type: 'setInfo',
        payload: { id: gameId },
      });
    });
};

export const updateGame = gameId => {
  const gameState = store.getState();
  axios.post(`${url}/games/${gameId}`, gameState.board)
    .then(getGame(gameId));
  // .then(response => console.log('AAAH', response));
};

export const getUser = username => {
  axios.get(`${url}/users/${username}`)
    .then(response => console.log(response));
};

export const login = (username, password) => {
  axios.post(`${url}/login`, { username, password })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        setUser('p1', response.data[0]);
        if (response.data[0].games.length) {
          getGame(response.data[0].games[0]);
        }
      }
    });
};

export const newUser = (username, password) => {
  axios.post('/users', { username, password })
    .then(response => {
      if (response.status !== 404) {
        login(username, password);
      }
    });
};

export const newGame = () => {
  const { username } = store.getState().user.p1;
  if (username === 'anonymous') {
    createBoard();
    setRandomPieces('p1');
    setRandomPieces('p2');
    const { p1Pieces, p2Pieces } = store.getState().board;
    updatePieces('p1', p1Pieces);
    updatePieces('p2', p2Pieces);
  } else {
    axios.post(`${url}/games`)
      .then(response => {
        store.dispatch({
          type: 'setInfo',
          payload: { id: response },
        });
        createBoard();
        setRandomPieces('p1');
        setRandomPieces('p2');
        setUser('p1', {games: [response]});
        setUser('p2', {games: [response]});
        const board = store.getState().board;
        setBoard(board);
        const { p1Pieces, p2Pieces } = board;
        updatePieces('p1', p1Pieces);
        updatePieces('p2', p2Pieces);
      });
  }
};