import React from 'react';
import { connect } from 'react-redux';
import { range } from 'lodash';
import Tile from './Tile.jsx';
import GameInfo from './GameInfo.jsx';
import { getInfo, updatePieces, newGame, checkForReadyPlayer } from '../actions.js';
import ChatInput from './ChatInput.jsx';
import BreadBasket from './BreadBasket.jsx';

/**
 * Uses bootstrap cards to render 2 8x8 grids of Tile components which receive props from the board state
 * Uses Chat and GameInfo components
 * 
 * @param { object } props the state
 * @see reducers/boardReducer.js for shape of + more info on the board state
 * @see reducers/chatReducer.js for shape of + more info on the chat state
 */
const Board = props => {

  var clicker = () => {
    //should be p1ships!!!
    checkForReadyPlayer(props.board.p1Ships);
  }

  return (
  <div className="container">
    <div className="row">
      <div className="col-sm-5">
        <div className="p1">
          <img src={props.user.p1.avatarUrl} className="avatar"></img>
          {props.turn === 'p1' ? <div className="yourmove">Your Move {props.user.p1.username}</div> : <div className="yourmove">Please Wait {props.user.p1.username}</div>}
          {/* <h4 className="username">{props.user.p1.username}</h4> */}
          <div className="pieces">{`Pieces left: ${props.p1Pieces}`}</div>
        </div>
        {range(8).map(row => (
          <div className="row">
            {range(8).map(col => (
              <Tile
                options={props.board.p1[`${row},${col}`]}
                player="p1"
                selectedBread={props.board.selectedBread}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="col-sm-2">
        <img src="../client/images/BattleBreadLogo.png" height="75px" className="logo" align="middle"></img>
        <button className ="newGame pieces" onClick={ newGame }>New Game</button>
        <BreadBasket />
      </div>
      <div className="col-sm-5 leftMargin">
        <div>
          <img src={props.user.p2.avatarUrl} className="avatar"></img>
          {props.turn === 'p2' ? <div className="yourmove">Your Move {props.user.p2.username}</div> : <div className="yourmove">Please Wait <br/>{props.user.p2.username}</div>}
          {/* <h4 className="username">{props.user.p2.username}</h4> */}
          <div className="pieces">{`Pieces left: ${props.p2Pieces}`}</div>
        </div>
        {range(8).map(row => (
          <div className="row">
            {range(8).map(col => (
              <Tile
                options={props.board.p2[`${row},${col}`]}
                player="p2"
              />
            ))}
          </div>
        ))}
      </div>
      {/* <GameInfo /> */}
      {props.user.p2.username === 'computer' ? null : <ChatInput />}
    </div>
    {props.status === 'inactive' ? <button onClick={clicker}>play!</button> : ''}
  </div>
)
};

/** 
 * mapStateToProps takes a state and defines the data which gets passed into props from the store.
 * @param { object } board Here, we destructure the the board property out of the state and set it to props
 */

////////////////
//BOARD PROPS//
//////////////

const mapStateToProps = ({ board, user, gameInfo } = state) => ({ board, user, ...gameInfo});

export default connect(mapStateToProps)(Board, GameInfo, Tile);
