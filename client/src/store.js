import { applyMiddleware, createStore } from 'redux';
import { range } from 'lodash';
import { createLogger } from 'redux-logger';

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
  }
};

const middleware = applyMiddleware(createLogger());
const store = createStore(boardReducer, middleware);

export default store;
// store.dispatch({type: 'createBoard'});
