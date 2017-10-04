import store from './store.js';

export const createBoard = () => store.dispatch({ type: 'createBoard' });

export const guess = (player, id) => store.dispatch({
  type: 'guess', 
  payload: { player, id },
});

export const setPiece = (player, piece) => store.dispatch({
  type: 'setPiece',
  payload: { player, piece },
});