import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';

const Tile = (props) => {
  const { id, row, col, size, color } = props.options;
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
        props.dispatch({ type: 'guess', payload: { id, player } });
      }}
    >
      <div className="card-text">
        {id}
      </div>
    </div>
  );
};

export default connect()(Tile);
