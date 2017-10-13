import React from 'react';
import { connect } from 'react-redux';
import { updateBreadPlacementValue } from '../actions.js';

var BreadBasket = () => {

  var passBreadValue = (e) => {
    var breadNum = parseInt(e.target.id)
    updateBreadPlacementValue(breadNum)
  }

  return (
    <div>
      <div id="2" onClick={passBreadValue}>2</div>
      <div id="3" onClick={passBreadValue}>3</div>
      <div id="4" onClick={passBreadValue}>4</div>
      <div id="5" onClick={passBreadValue}>5</div>
    </div>
  );
}

export default BreadBasket;