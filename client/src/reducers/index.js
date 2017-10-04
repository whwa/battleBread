import { combineReducers } from 'redux';
import boardReducer from './boardReducer.js';
import chatReducer from './chatReducer.js';

const reducers = combineReducers({
  chats: chatReducer,
  board: boardReducer,
});

export default reducers;