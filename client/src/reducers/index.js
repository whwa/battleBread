import { combineReducers } from 'redux';
import boardReducer from './boardReducer.js';
import chatReducer from './chatReducer.js';
import gameInfoReducer from './gameInfoReducer.js';

/**
 * Combines boardReducer and chatReducer into reducers for exporting
 */
const reducers = combineReducers({
  chats: chatReducer,
  board: boardReducer,
  gameInfo: gameInfoReducer,
});

export default reducers;