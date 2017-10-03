import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { range } from 'lodash';
import randomInt from 'random-int';

const Tile = (props) => {
  const { id, size, color } = props.options;
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
        if (props.player === 'p2') {
          props.dispatch({ type: 'guess', payload: { id, player } });

          const [row, col] = range(2).map(() => randomInt(8));
          props.dispatch({ type: 'guess',
            payload: {
              id: `${row},${col}`,
              player: 'p1',
            },
          });
        }
      }}
    >
      <div className="card-text">
        {id}
      </div>
    </div>
  );
};

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
