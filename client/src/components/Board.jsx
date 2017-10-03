import React from 'react';
import { connect } from 'react-redux';
import { range } from 'lodash';
import Tile from './Tile.jsx';

const Board = props => (
  <div className="container">
    <div className="row">
      <div className="col-6">
        <h4>You:</h4>
        {range(8).map(row => (
          <div className="row">
            {range(8).map(col => (
              <Tile options={props.p1[`${row},${col}`]} />
            ))}
          </div>
        ))}
      </div>
      <div className="col-6">
        <h4>Opponent:</h4>
        {range(8).map(row => (
          <div className="row">
            {range(8).map(col => (
              <Tile options={props.p2[`${row},${col}`]} />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Board);

/*
<svg width="16" height="16">
  <rect x={(row+1)*16} y={(col+1)*16} width="16" height="16" fill="blue" />
</svg>
*/
