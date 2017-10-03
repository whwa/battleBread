import { applyMiddleware, createStore } from 'redux';
import { range } from 'lodash';
import { createLogger } from 'redux-logger';
import randomInt from 'random-int';

const boardReducer = (state = { p1: {}, p2: {}, turn: 0 }, action) => {
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
    const { turn } = state;
    const { player, id } = action.payload;
    const tile = { ...state[player][id] };
    tile.guessed = 'true';
    if (tile.hasBread) {
      tile.color = 'green';
    } else {
      tile.color = 'red';
    }
    const newState = { ...state, turn: (turn + 1) };
    newState[player][id] = tile;
    return newState;
  } else if (action.type === 'randomPieces') {
    const newState = { ...state };
    range(14).forEach(() => {
      const [row1, row2, col1, col2] = range(4).map(() => randomInt(4));
      const tile1 = { ...newState.p1[`${row1},${col1}`] };
      const tile2 = { ...newState.p2[`${row2},${col2}`] };

      newState.p1[`${row1},${col1}`] = {
        ...tile1,
        hasBread: true,
      };
      newState.p2[`${row2},${col2}`] = {
        ...tile2,
        hasBread: true,
      };
    });
    return newState;
  }
};

const middleware = applyMiddleware(createLogger());
const store = createStore(boardReducer, middleware);

export default store;
// store.dispatch({type: 'createBoard'});
