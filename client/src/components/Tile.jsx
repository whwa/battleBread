import React from 'react';
import PropTypes from 'prop-types';
import randomInt from 'random-int';
import { connect } from 'react-redux';
import { range } from 'lodash';
import { guess } from '../actions.js';

/**
 * The tile is indexed by id in the board state. 
 * When clicked, dispatches a guess action for the player guess, and one for the AI response
 * @param { object } props
 * @property { string } size ex: '48px'
 * @property { boolean } guessed 
 * @property { boolean } hasBread
 * @property { string } color 'blue' || 'green' || 'red'
 * @property { string } id ex: '1,2' or '6,3'
 * }
 */
const Tile = (props) => {
  const { id, size, color, guessed } = props.options;
  const player = props.player;
  return (
    <div
      className="card bg-light"
      id={id}
      style={{
        width: size,
        height: size,
        color,
      }}
      /**
       * Invoke a guess action, iff this tile is on the opponent's board. Then, have the AI guess randomly.
       */
      onClick={() => {
        if (props.player === 'p2' && !guessed) {
          guess(player, id);
          const [row, col] = range(2).map(() => randomInt(7));
          const tile = `${row},${col}`;
          guess('p1', tile);
        }
      }}
    >
      <div className="card-text">
        {id}
      </div>
    </div>
  );
};

/**
 * @todo: update this based on above shape
 */
Tile.propTypes = {
  options: PropTypes.shape({
    id: PropTypes.string,
    row: PropTypes.number,
    col: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
};

export default connect()(Tile);
