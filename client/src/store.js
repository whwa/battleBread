import { applyMiddleware, createStore, combineReducers } from 'redux';
import { range } from 'lodash';
import { createLogger } from 'redux-logger';
import randomInt from 'random-int';
import update from 'immutability-helper';
import { chatReducer } from '../reducers/chatReducer.js';

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
    // const tile = {
    //   ...state[player][id], 
    //   guessed: true,
    //   color: (tile.hasBread) ? 'green' : 'red',
    // };
    // const board = {
    //   ...state[player], 
    //   [id]: tile,
    // };
    // const newState = { 
    //   ...state,
    //   turn: (turn + 1),
    //   [player]: board,
    // };
    const newState = update(state, {
      turn: {$set: (turn + 1)},
      [player]: {
        [id]: {
          guessed: {$set: true},
          color: {$apply: () => (state[player][id].hasBread) ? 'green' : 'red'}
        }
      }
    });
    // newState[player][id] = tile;
    return newState;
  } else if (action.type === 'randomPieces') {
    const newState = { ...state, turn: 0 };
    range(14).forEach(() => {
      const [row1, row2, col1, col2] = range(4).map(() => randomInt(7));
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
  } else {
    return state;
  }
};

const reducers = combineReducers({
  chats: chatReducer,
  board: boardReducer,
});

const middleware = applyMiddleware(createLogger());
const store = createStore(reducers, middleware);

export default store;
// console.log(store.getState())