import React from 'react';

const Tile = (props) => {
  let {row, col, color} = props;
  return (
    <div
      className="card bg-light"
      id={`${row},${col}`}
      style={{
        width:'48px',
        height:'48px',
        color:`${color}`,
      }}
      onClick={() => {
        console.log(`clicked ${row}, ${col}`);
      }}>
      <div className="card-text">
        {`${row}, ${col}`}
      </div>
    </div>
  )
}

export default Tile;
