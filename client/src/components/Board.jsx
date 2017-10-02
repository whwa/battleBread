import React from 'react';
import {range} from 'lodash';
import Tile from './Tile.jsx';

class Board extends React.Component {
  render() {
    return (
      <div className="container">
      {range(8).map(row => (
          <div className="row">
          {range(8).map(col => (
              <Tile
                row={row}
                col={col}
                color={'blue'} />
            )
          )}
          </div>)
        )}
      </div>
    );
  }
};

export default Board;

/*
<svg width="16" height="16">
  <rect x={(row+1)*16} y={(col+1)*16} width="16" height="16" fill="blue" />
</svg>
*/
