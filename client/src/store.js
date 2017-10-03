import { applyMiddleware, createStore } from 'redux';
import {range} from 'lodash';
// import logger from 'redux-logger';

const initialTileState = {
  id: null,
  row: null,
  col: null,
  size: '48px',
  color: 'blue',
};

const boardReducer = (state={}, action) => {
  if (action.type === 'createBoard') {
    let newState = {};
    range(8).map(row => {
      range(8).map(col => {
        newState[`${row},${col}`] = {
          id: `${row},${col}`,
          row: row,
          col: col,
          size:'48px',
          color:'blue',
        }
      })
    });
    return newState;
  }
}

const tileReducer = (state=initialTileState, action) => {
  if (action.type === 'createTile') {
    let {id, row, col} = action.payload;
    state = {...state, id: id, row: row, col: col};
    console.log(state);
  }
  return state;
}

const store = createStore(boardReducer);

store.subscribe(() => {
  console.log('change ', store.getState());
});

store.dispatch({type: 'createBoard'});
