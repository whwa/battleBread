import { combineReducers } from 'redux';
import boardReducer from './boardReducer.js';
import chatReducer from './chatReducer.js';
import gameInfoReducer from './gameInfoReducer.js';
import userReducer from './userReducer.js';

/**
 * Combines boardReducer, chatReducer, and gameInfoReducer into reducers for exporting
 */
const reducers = combineReducers({
  chats: chatReducer,
  board: boardReducer,
  gameInfo: gameInfoReducer,
  user: userReducer,
});

export default reducers;