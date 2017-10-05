import React from 'react';
import { connect } from 'react-redux';
import { range } from 'lodash';
import Tile from './Tile.jsx';
import GameInfo from './GameInfo.jsx';
import Chat from './Chat.jsx';

/**
 * Uses bootstrap cards to render 2 8x8 grids of Tile components which receive props from the board state
 * Uses Chat and GameInfo components
 * 
 * @param { object } props the state
 * @see reducers/boardReducer.js for shape of + more info on the board state
 * @see reducers/chatReducer.js for shape of + more info on the chat state
 */
const Board = props => (
  <div className="container">
    <div className="row">
      <div className="col-6">
        <h4>You:</h4>
        {range(8).map(row => (
          <div className="row">
            {range(8).map(col => (
              <Tile
                options={props.p1[`${row},${col}`]}
                player="p1"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="col-6">
        <h4>Opponent:</h4>
        {range(8).map(row => (
          <div className="row">
            {range(8).map(col => (
              <Tile
                options={props.p2[`${row},${col}`]}
                player="p2"
              />
            ))}
          </div>
        ))}
      </div>
      <GameInfo />
      <Chat />
    </div>
  </div>
);

/**
 * mapStateToProps takes a state and defines the data which gets passed into props from the store.
 * @param { object } board Here, we destructure the the board property out of the state and set it to props
 */
const mapStateToProps = ({ board }) => ({ ...board });

export default connect(mapStateToProps)(Board);
