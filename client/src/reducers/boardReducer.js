import update from 'immutability-helper';
import randomInt from 'random-int';
import { range } from 'lodash';

/**
 * This function handles changes to the board state resulting from a state.dispatch(action)
 * @param { object } stateBoard state is an object representing each players' board. Example:
 * board: {
 *   turn: 0,
 *   p1Pieces: 0,
 *   p2Pieces: 0,
 *   p1: {
 *     '0,0': {
 *       id: '0,0',
 *       row: 0,
 *       col: 0,
 *       hasBread: false,
 *       guessed: false,
 *       color: 'blue'
 *     },
 *     '0,1': { ... },
 *     ...etc, for all coords in board
 *   },
 *   p2: { same shape as p1} ,
 * }
 * @param { object } action an action dispatched via an action creator from ../actions.js
 * @property { string } type 'guess' || 'randomPieces' || 'setPiece
 * @property { object } payload varies in shape for each action
 */
const boardReducer = (state = {}, action) => {
  if (action.type === 'createBoard') {
    /**
     * We start a new board from scratch. 
     * 1. Generate an 8x8 array for each player
     * 2. Map a tile object to each index by extending the defaults object with row and col info.
     */
    const newState = { 
      p1: {}, 
      p2: {}, 
      turn: 0, 
      p1Pieces: 0,
      p2Pieces: 0,
    };
    range(8).map((row) => {
      range(8).map((col) => {
        const defaults = {
          size: '48px',
          guessed: false,
          hasBread: false,
          color: 'blue',
        };
        newState.p1[`${row},${col}`] = {
          ...defaults,
          row,
          col,
          id: `${row},${col}`,
        };
        newState.p2[`${row},${col}`] = {
          ...defaults,
          row,
          col,
          id: `${row},${col}`,
        };
      });
    });
    return update(state, {$merge: newState});
  } else if (action.type === 'guess') {
    /**
     * @param action.payload shape: { 
     *  player: {'p1' or 'p2'},
     *  id: { string (ex:'1,1' or '3,4') }
     * }
     * We update the state for one tile on a particular player's board
     * 1. Increment the turn count
     * 2. Set the guessed property for that tile to true
     * 3. Change the color property to green if it was a hit, or red if it was a miss
     * 4. If it was a hit, we decrement that player's piece count
     * 
     */
    const { player, id } = action.payload;
    const { turn } = state;
    const { hasBread } = state[player][id];
    const numPieces = state[`${player}Pieces`];

    const newState = update(state, {
      turn: {$set: (turn + 1)},
      [player]: {
        [id]: {
          guessed: {$set: true},
          color: {$apply: () => (hasBread) ? 'green' : 'red'}
        }
      },
      [`${player}Pieces`]: {$apply: () => (hasBread) ? numPieces - 1 : numPieces },
    });
    // newState[player][id] = tile;
    return newState;
  } else if (action.type === 'randomPieces') {
    /**
     * This is mostly just for testing. Updates 14 random tiles to contain bread.
     */
    const player1 = {};
    const player2 = {};

    range(14).forEach(() => {
      const [row1, row2, col1, col2] = range(4).map(() => randomInt(7));
      
      player1[`${row1},${col1}`] = update(state.p1[`${row1},${col1}`], {
        hasBread: {$set: true}
      });
      player2[`${row2},${col2}`] = update(state.p2[`${row2},${col2}`], {
        hasBread: {$set: true}
      });

    });
    return update(state, {
      turn: { $set: 0 },
      p1: { $merge: player1 },
      p2: { $merge: player2 },
    });
  } else if (action.type === 'setPiece') {
    /**
     * @param action.payload
     *  @property { string } player 'p1' || 'p2'
     *  @property { array } piece array of tile id strings (ex: ['1,1', '2,4'])
     * Place a piece by setting hasBread for each tile to true
     */
      const { player, piece } = action.payload;
      const thePiece = {};
      const numPieces = state[`${player}Pieces`] + piece.length;

      piece.forEach(idString => {
        thePiece[idString] = update(
          state[player][idString],
          { hasBread: { $set: true }}
        );
      });

      return update(state, {
        [player]: { $merge: thePiece },
        [`${player}Pieces`]: { $set: numPieces },
      });
  } else {
    /**
     * Fallback case
     */
    return state;
  }
};

export default boardReducer;