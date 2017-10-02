import React from 'react';
import {range} from 'lodash';

const Board = (props) => {
  let x = range(8);
  return (
    <div>
    {range(8)
        .map(row => range(8)
          .map(col => (
              <div>
                <svg width={16*8} height= {16}>
                  <rect x={(row+1)*16} y={(col+1)*16} width="16" height="16" fill="blue" />
                </svg>
              </div>
            )))}
    </div>
  )
};

export default Board;

/*

*/
