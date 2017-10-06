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
    return update(state, {
      status: {$set: 'inactive'},
      turn: {$set: 'p1'},
      p1Pieces: {$set: 0},
      p2Pieces: {$set: 0},
    });
  } else if (type === 'toggleStatus') {
    /**
     * Toggles whether the game state is active or not
     * @param { string } payload.status 'active' || 'inactive'
     */
    const { status } = payload;
    return update(state, {
      status: {
        $apply: () => (status === 'active') ? 'inactive' : 'active' 
      }
    });
  } else if (type === 'toggleTurn') {
    /**
     * Toggles which player's turn it is
     * @param { string } payload.turn 'p1' || 'p2'
     */
    const { turn } = state;
    return update(state, {
      turn: {
        $apply: () => (turn === 'p1') ? 'p2' : 'p1' 
      }
    });
  } else if (type === 'updatePieces') {
    /**
     * Updates a player's piece count
     * @param { string } payload.player 'p1' || 'p2'
     * @param { number } payload.pieces The updated piece count
     */
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