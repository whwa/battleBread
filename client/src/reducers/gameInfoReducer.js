import update from 'immutability-helper';

const defaultGameInfo = {
  id: null,
  status: 'inactive',
  turn: 'p1',
  p1Pieces: 0,
  p2Pieces: 0,
};

/**
 * Reducer function for the gameInfo portion of the redux state
 * @param { object } state
 * @property { string } state.status 'active' || 'inactive'
 * @property { string } state.turn 'p1' || 'p2'
 * @property { number } state.p1Pieces number of pieces remaining for p1
 * @property { number } state.p2Pieces number of pieces remaining for p2
 * @returns a new state, based on the type of action it receives
 */


const gameInfoReducer = (state = { ...defaultGameInfo }, { type, payload } = action) => {
  if (type === 'toggleStatus') {
    //this can allow us to prevent actions while the user is placing on their board
    //write board placement code on condition of inactive
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
    //this is where we will change state for the ships remaining object
    /**
     * Updates a player's piece count
     * @param { string } payload.player 'p1' || 'p2'
     * @param { number } payload.pieces The updated piece count
     */
    const { player, pieces } = payload;
    // console.log('>>>>>>>pieces', pieces)

    return update(state, {
      //set ships
      // [`${player}Ships`]: {$set: },
      [`${player}Pieces`]: { $set: pieces },
    });
    // debugger;
  } else if (type === 'getInfo') {
    return state;
  } else if (type === 'setInfo') {
    // const { newInfo } = payload;
    return update(state, { $merge: payload });
  } else if(type === 'updateGameReady') {
    return update(state, {
      status: {$set: 'active'}
    })
  } else {
    return state;
  }
};

export default gameInfoReducer;