import update from 'immutability-helper';

/**
 * This function handles changes to the chats state resulting from a state.dispatch(action)
 * @param {array} state chat state is an array of chat objects. Default: []
 * @param {object} action an action obj with shape { type: { string }, payload: { obj }}
 */
const chatReducer = (state = [], action) => {
  const {type, payload} = action;
  if (type === 'setChat') {
    /**
     * @param payload shape: { player: { 'p1' || 'p2' }, text{ string } }
     * @returns a new state array with the chat obj passed in appended to the end
     */
    return update(state, { $push: [payload] });
  } else if (type === 'getChats') {
    /**
     * @returns the entire state array
     */
    return state;
  } else {
    /**
     * fallback case
     */
    return state;
  }
};

export default chatReducer;
