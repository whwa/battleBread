import React from 'react';

const Tile = (props) => {
  let {row, col, style, id} = props.options;
  return (
    <div
      className="card bg-light"
      id={id}
      style={style}
      onClick={() => {
        console.log(`clicked ${row}, ${col}`);
        props.toggleColor(id);
      }}>
      <div className="card-text">
        {id}
      </div>
    </div>
  )
}

export default Tile;
