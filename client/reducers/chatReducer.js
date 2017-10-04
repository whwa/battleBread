import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import update from 'immutability-helper';

export const chatReducer = (state=[], action) => {
  const {type, payload} = action;
  if (type==='setChat') {
    return update(state, { $push: [payload] });
  } else if (type==='getChats') {
    return state;
  } else {
    return state;
  }
}

const middleware = applyMiddleware(createLogger());
export const chats = createStore(chatReducer, middleware);

// export default chats;
