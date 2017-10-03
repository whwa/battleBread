import { applyMiddleware, createStore } from 'redux';
import { range } from 'lodash';
import { createLogger } from 'redux-logger';

const boardReducer = (state = { p1: {}, p2: {} }, action) => {
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
    const newState = { ...state };
    const { player, id } = action.payload;
    newState[player][id].guessed = 'true';
    if (newState[player][id].hasBread) {
      newState[player][id].color = 'green';
    } else {
      newState[player][id].color = 'red';
    }
    return newState;
  }
};

const middleware = applyMiddleware(createLogger());
const store = createStore(boardReducer, middleware);

export default store;
// store.dispatch({type: 'createBoard'});
