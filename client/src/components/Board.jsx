import React from 'react';
import {range} from 'lodash';
import Tile from './Tile.jsx';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    range(8).map(row => {
      range(8).map(col => (
        this.state[`${row},${col}`] = {
          id: `${row},${col}`,
          row: row,
          col: col,
          style: {
            width:'48px',
            height:'48px',
            color:'blue'
          },
        })
      );
    });
  }
  componentDidMount() {
    console.log("STATE", this.state);
  }
  toggleColor(idNo) {
    let {id, row, col, style} = this.state[idNo];
    let newState = {id, row, col};
    let newStyle = {width:'48px', height:'48px'};

    if (style.color === 'blue') {
      newStyle.color = 'red';
    } else {
      newStyle.color = 'blue';
    }

    newState.style = newStyle;
    this.setState({[idNo]: newState});
    console.log(this.state[idNo]);
  }
  render() {
    return (
      <div className="container">
      {range(8).map(row => (
          <div className="row">
          {range(8).map(col => (
              <Tile
                options={this.state[`${row},${col}`]}
                toggleColor={this.toggleColor.bind(this)} />
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
