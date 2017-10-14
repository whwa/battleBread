import path from 'path';
import update from 'immutability-helper';
import randomInt from 'random-int';
import { range } from 'lodash';

const newState = {
  p1: {},
  p2: {},
  turn: 0,
  p1Pieces:  0,
  p2Pieces: 0,
  p1Ships: {
    2 : null,
    3 : null,
    4 : null,
    5 : null    
  },
  p2Ships: {
    2 : 2,
    3 : 3,
    4 : 4,
    5 : 5    
  },
  selectedBread: null,
  clickCount: 0
};

/**
 * This function handles changes to the board state resulting from a state.dispatch(action)
 * @param { object } state state is an object representing each players' board. Example:
 * @property { object } state
 * @property { number } state.turn Turn counter
 * @property { number } state.p1Pieces Number of remaining pieces for player 1
 * @property { number } state.p2Pieces Number of remaining pieces for player 2
 * @property { object } state.p1 Tile states for player 1
 * @property { object } state.p1[tileId] Tile object, indexed by id string
 * @property { object } state.p1[tileId].id Id string (ex: '1,1' or '6,5')
 * @property { number } state.p1[tileId].row
 * @property { number } state.p1[tileId].col
 * @property { boolean } state.p1[tileId].hasBread
 * @property { boolean } state.p1[tileId].guessed
 * @property { string } state.p1[tileId].color 'red' || 'green' || 'blue'
 * @property { object } state.p2 Tile states for player 2
 * @property { object } state.p2[tileId] Tile object, indexed by id string
 * @property { object } state.p2[tileId].id Id string (ex: '1,1' or '6,5')
 * @property { number } state.p2[tileId].row
 * @property { number } state.p2[tileId].col
 * @property { boolean } state.p2[tileId].hasBread
 * @property { boolean } state.p2[tileId].guessed
 * @property { string } state.p2[tileId].color 'red' || 'green' || 'blue'
 *
 *
 * @param { object } action an action dispatched via an action creator from ../actions.js
 * @property { string } type 'guess' || 'randomPieces' || 'setPiece
 * @property { object } payload varies in shape for each action
 * @returns a new state, based on the type of action it receives
 */
const boardReducer = (state = { ...newState }, { type, payload = {} } = action) => {
  if (type === 'createBoard') {
    /**
     * We start a new board from scratch.
     * 1. Generate an 8x8 array for each player
     * 2. Map a tile object to each index by extending the defaults object with row and col info.
     */

    //all state on individual tiles goes here
    range(8).map((row) => {
      range(8).map((col) => {
        const defaults = {
          size: '48px',
          guessed: false,
          hasBread: false,
          // color: 'blue',
          image: './images/burned-out-what-to-do-burnt-toast.jpg',
          dispImage: false
        };
        newState.p1[`${row},${col}`] = {
          ...defaults,
          row,
          col,
          id: `${row},${col}`,
        };
        newState.p2[`${row},${col}`] = {
          ...defaults,
          row,
          col,
          id: `${row},${col}`,
        };
      });
    });
    return update(state, {$merge: newState});
  } else if (type === 'setBoard') {
    const { board } = payload;
    return update(state, { $merge: board });
  } else if (type === 'guess') {
    /**
     * @param { object } payload
     * @property { string } player 'p1' || 'p2'
     * @property { string } id ex: '1,1' or '3,4'
     *
     * shape: {
     *  player: {'p1' or 'p2'},
     *  id: { string (ex:'1,1' or '3,4') }
     * }
     * We update the state for one tile on a particular player's board
     * 1. Increment the turn count
     * 2. Set the guessed property for that tile to true
     * 3. Change the color property to green if it was a hit, or red if it was a miss -- display image from false to true
     * 4. If it was a hit, we decrement that player's piece count
     *
     */

     //update state of color/displayimage property to display toast
     //decrement the count in ships object with key of value of ship hit

    const { player, id, callback } = payload;
    console.log('payload',payload);

    const { turn } = state;
    const { hasBread } = state[player][id];
    const numPieces = state[`${player}Pieces`];
    const ships = state[`${player}Ships`]
    const cb = payload.callback;
    console.log('hasbread', hasBread)
    console.log('player ships state', state[`${player}Ships`])

    if (hasBread !== false){
      console.log('ships count', ships[hasBread] )
      ships[hasBread] = ships[hasBread] - 1;
      console.log('post decrement', ships[hasBread] )
      //if ships[hasbread] === 0 cb(hasBread)
    }
    console.log('cb', cb)
    if (cb) {
      if (hasBread !== false) {
        if (ships[hasBread] === 0) {
          cb('sunk');
        } else {
          cb('hit');
        }
      } else {
        cb('miss');
      }
    }


    const newState = update(state, {
      turn: {$set: (turn + 1)},
      [player]: {
        [id]: {
          guessed: {$set: true},
          //if guessed is true and hasbread is false
          dispImage: {$apply: () => (hasBread) ? true : false}
        }
      },
      [`${player}Pieces`]: {$apply: () => (hasBread) ? numPieces - 1 : numPieces },
      [`${player}Ships`]: {$set: ships}
    });

    // newState[player][id] = tile;
    return newState;
  } else if (type === 'randomPieces') {
    /**
     * This is mostly just for testing. Updates 14 random tiles to contain bread.
     */
    const player1 = {};
    const player2 = {};

    range(14).forEach(() => {
      const [row1, row2, col1, col2] = range(4).map(() => randomInt(7));

      player1[`${row1},${col1}`] = update(state.p1[`${row1},${col1}`], {
        hasBread: {$set: true}
      });
      player2[`${row2},${col2}`] = update(state.p2[`${row2},${col2}`], {
        hasBread: {$set: true}
      });

    });
    return update(state, {
      turn: { $set: 0 },
      p1: { $merge: player1 },
      p2: { $merge: player2 },
    });
  } else if (type === 'setPiece') {
    /**
     * @param payload
     *  @property { string } player 'p1' || 'p2'
     *  @property { array } piece array of tile id strings (ex: ['1,1', '2,4'])
     * Place a piece by setting hasBread for each tile to true
     */
      const { player, piece, shipVal } = payload;
      const thePiece = {};
      const numPieces = state[`${player}Pieces`]; //whole obj
      console.log('>>>>>>>>>>...', numPieces[shipVal])
      
      piece.forEach(idString => {
        thePiece[idString] = update(
          state[player][idString],
          { hasBread: { $set: shipVal }}
        );
      });

      return update(state, {
        [player]: { $merge: thePiece },
        [`${player}Pieces`]: { $set: numPieces },
      });
  } else if (type === 'updateShipCount') {
    let shipNum = payload.value;
    var newShips = state['p1Ships'];
    newShips[shipNum] = shipNum;
    return update(state, {
      // p1Ships: {$set: ({2 : 2, 3 : 3, 4 : 4, 5 : 5})}
      p1Ships: {$set: newShips}
    })
  } else if(type === 'updateSelectedBread') {
    return update(state, {
      selectedBread: {$set: (payload.selectedBread)}
    })
  } else if(type === 'updateClickCount') {
    //if payload === 'reset', set breadcount to 0
    //CALL THIS WHEN NEW BREAD IS CLICKED
    if(payload.val === 'reset') {
      count = 0;
    } else {
      //if payload is null, do this stuff
      var count = state['clickCount'];
      count++
      if (count > 4){
        count = 0;
      }
    }
    console.log('clickcounted>>>>>>>>>>>>', count);
    return update(state, {
      ['clickCount']: {$set: count}
    });
  }else if(type === 'removeBread') {
    // debugger;
    //get player1 board
    let newBoard = state['p1'];
    let selectedBread = state['selectedBread']
    const thePiece = {};
    // console.log('board', board)
    for ( var tile in newBoard ) {

      
      // console.log('tile', board[tile])
      if (newBoard[tile].hasBread === selectedBread){
          console.log('got it>>>>>>>>>>>>>>', newBoard)
          // update(state, {[newBoard] : {[tile] : { hasBread : {$apply: false}}}
          thePiece[tile] = update(state['p1'][tile],
          { hasBread: { $set: false }})
      }
    }
      return update(state, {
        ['p1']: { $merge: thePiece }
      });
  } else {
    /**
     * Fallback case
     */
    return state;
  }
};

export default boardReducer;