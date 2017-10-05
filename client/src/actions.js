import store from './store.js';
import randomInt from 'random-int';
import { range } from 'lodash';

export const createBoard = () => store.dispatch({ type: 'createBoard' });

export const guess = (player, id) => store.dispatch({
  type: 'guess', 
  payload: { player, id },
});

export const setPiece = (player, piece) => store.dispatch({
  type: 'setPiece',
  payload: { player, piece },
});

export const setRandomPieces = (player) => {
  const pieces = range(2, 6)
    .map((len) => {
      const rotate = randomInt(0, 1);
      const scalar = randomInt(0, 7);
      return range(0, len).map((el, j) => (rotate) ? [scalar, j] : [j, scalar]);
    })
    .forEach(piece => setPiece(player, piece));
};

export const randomPieces = () => store.dispatch({ type: 'randomPieces' });

export const setChat = (player, text) => store.dispatch({
  type: 'setChat',
  payload: { player, text },
});

export const getChats = () => store.dispatch({ type: 'getChats' });
