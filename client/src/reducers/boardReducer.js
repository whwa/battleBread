import update from 'immutability-helper';
import randomInt from 'random-int';
import { range } from 'lodash';

const boardReducer = (state = { 
  p1: {}, 
  p2: {}, 
  turn: 0, 
  p1Pieces: 0,
  p2Pieces: 0,
}, action) => {
  if (action.type === 'createBoard') {
    const newState = { ...state };
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
    return newState;
  } else if (action.type === 'guess') {
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
    return state;
  }
};

export default boardReducer;