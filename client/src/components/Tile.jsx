import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { range } from 'lodash';
import randomInt from 'random-int';
import { guess } from '../actions.js';

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

//TODO: update this
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
