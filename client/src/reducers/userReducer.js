import update from 'immutability-helper';

/**
 * 
 * @param { object } state
 * @property { object } state.p1
 * @property { string } state.p1.username
 * @property { number } state.p1.level
 * @property { object } state.p1.chats
 * @property { object } state.p2
 * @property { string } state.p2.username
 * @property { number } state.p2.level
 * @property { object } state.p2.chats
 * @param { object } action 
 * 
 */
const userReducer = (
  state = { 'p1': {}, 'p2': {} },
  { type, payload } = action
) => {
  if (type === 'getUsers') {
    /**
     * @param { string } payload.player 'p1' || 'p2'
     */
    const { player } = payload;
    return state;
  } else if (type === 'setUser') {
    /**
     * @param { string } payload.player 'p1' || 'p2'
     * @param { string } payload.username
     * @param { number } payload.level 
     * @param { object } payload.chats @todo figure out shape of this
     */
    const { player, username, chats, level } = payload;
    return update(state, {
      [player]: {
        username: { $set: username },
        chats: { $set: chats },
        level: { $set: level },
      }
    });
  } else {
    return state;
  }
};

export default userReducer;