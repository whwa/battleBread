import update from 'immutability-helper';

/**
 * Reducer function for the gameInfo portion of the redux state
 * @param { object } state
 * @property { string } state.status 'active' || 'inactive'
 * @property { string } state.turn 'p1' || 'p2'
 * @property { number } state.p1Pieces number of pieces remaining for p1
 * @property { number } state.p2Pieces number of pieces remaining for p2
 * @returns a new state, based on the type of action it receives
 */
const gameInfoReducer = (state = {}, { type, payload } = action) => {
  if (type === 'infoInit') {
    return ({
      status: 'inactive',
      turn: 'p1',
      p1Pieces: 0,
      p2Pieces: 0,
    });
  } else if (type === 'toggleStatus') {
    const { status } = payload;
    return update(state, {
      status: {
        $apply: () => (status === 'active') ? 'inactive' : 'active' 
      }
    });
  } else if (type === 'toggleTurn') {
    const { turn } = payload;
    return update(state, {
      turn: {
        $apply: () => (turn === 'p1') ? 'p2' : 'p1' 
      }
    });
  } else if (type === 'updatePieces') {
    const { player, pieces } = payload;
    return update(state, {
      [`${player}Pieces`]: { $set: pieces },
    });
  } else if (type === 'getInfo') {
    return state;
  } else {
    return state;
  }
};

export default gameInfoReducer;