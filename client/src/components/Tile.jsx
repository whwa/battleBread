import React from 'react';

const Tile = (props) => {
  let {id, row, col, size, color} = props.options;
  return (
    <div
      className="card bg-light"
      id={id}
      style={{
        width: size,
        height: size,
        color: color,
      }}
      onClick={() => {
        console.log(`clicked ${row}, ${col}`);
      }}>
      <div className="card-text">
        {id}
      </div>
    </div>
  )
}

export default Tile;
