import { combineReducers } from 'redux';
import boardReducer from './boardReducer.js';
import chatReducer from './chatReducer.js';

/**
 * Takes in all reducers and exports them as one
 */
const reducers = combineReducers({
  chats: chatReducer,
  board: boardReducer,
});

export default reducers;