import { applyMiddleware, createStore } from 'redux';
import { range } from 'lodash';
import { createLogger } from 'redux-logger';

const boardReducer = (state = { p1: {}, p2: {} }, action) => {
  if (action.type === 'createBoard') {
    const newState = { ...state };
    range(8).map((row) => {
      range(8).map((col) => {
        newState.p1[`${row},${col}`] = {
          row,
          col,
          id: `${row},${col}`,
          size: '48px',
          guessed: false,
          hit: null,
          color: 'blue',
        };
        newState.p2[`${row},${col}`] = {
          row,
          col,
          id: `${row},${col}`,
          size: '48px',
          guessed: false,
          hit: null,
          color: 'blue',
        };
      });
    });
    return newState;
  }
};

const middleware = applyMiddleware(createLogger());
const store = createStore(boardReducer, middleware);

export default store;
// store.dispatch({type: 'createBoard'});
