import { combineReducers } from 'redux';
import boardReducer from './boardReducer.js';
import chatReducer from './chatReducer.js';

/**
 * Combines boardReducer and chatReducer into reducers for exporting
 */
const reducers = combineReducers({
  chats: chatReducer,
  board: boardReducer,
});

export default reducers;