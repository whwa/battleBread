import update from 'immutability-helper';

const defaultState = {
  p1: {
    username: 'anonymous',
    chats: ['hi', 'glhf'],
    level: 1,
    avatarUrl: 'http://oi40.tinypic.com/i5sy1u.jpg',
    wins: 0,
    losses: 0,
    games: [],
    phrases: {},
  },
  p2: {
    username: 'computer', 
    chats: ['hi', 'glhf'], 
    level: 1, 
    avatarUrl: 'http://oi40.tinypic.com/i5sy1u.jpg',
    wins: 0,
    losses: 0,
    games: [],
    phrases: {},
  }
};

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
  state = { ...defaultState }, 
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
     * @param { string } avatarUrl a link to the user's profile pic
     * @param { string } payload.username
     * @param { number } payload.level 
     * @param { object } payload.chats @todo figure out shape of this
     */
    const { player } = payload;
    const { 
      username, 
      chats, 
      level, 
      avatarUrl,
      wins,
      losses,
      phrases,
    } = payload.userData;
    return update(state, {
      [player]: {
        username: { $set: username },
        chats: { $set: chats },
        level: { $set: level },
        avatarUrl: {$set: avatarUrl },
        wins: { $set: wins },
        losses: { $set: losses },
        phrases: { $set: phrases },
      }
    });
  } else {
    return state;
  }
};

export default userReducer;