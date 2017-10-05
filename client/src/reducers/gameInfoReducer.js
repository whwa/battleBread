import update from 'immutability-helper';

/**
 * @param { object } state
 * @param { string } state.status 'active' || 'inactive'
 * @param { string } state.turn 'p1' || 'p2'
 * @param { number } state.p1Pieces number of pieces remaining for p1
 * @param { number } state.p2Pieces number of pieces remaining for p2
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
  }else {
    return state;
  }
};

export default gameInfoReducer;