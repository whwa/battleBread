import React from 'react';
import {range} from 'lodash';

const Board = (props) => {
  let x = range(8);
  return (
    <div className="container">
    {range(8)
        .map(row =>
          <div className="row">
          {range(8).map(col => (
              <div
                className="card bg-light"
                style={{width:'48px',height:'48px'}}>
                <div className="card-text">
                  {`${row}, ${col}`}
                </div>
              </div>
            )
          )}
          </div>
        )}
    </div>
  )
};

export default Board;

/*
<svg width="16" height="16">
  <rect x={(row+1)*16} y={(col+1)*16} width="16" height="16" fill="blue" />
</svg>
*/
