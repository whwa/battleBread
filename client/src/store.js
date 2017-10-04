import { applyMiddleware, createStore } from 'redux';
import { range } from 'lodash';
import { createLogger } from 'redux-logger';
import reducers from './reducers/index.js';

const middleware = applyMiddleware(createLogger());
const store = createStore(reducers, middleware);

export default store;
// console.log(store.getState())