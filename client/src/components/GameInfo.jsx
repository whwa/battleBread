import React from 'react';
import { getInfo, updatePieces } from '../actions.js';
import { connect } from 'react-redux';

const GameInfo = props => (
  <div className='gameInfo'>
    <div>
      <h5>Game Stats:</h5>
      <div>{`Next Move: ${props.turn}`}</div>
      <div className='infoColOne'>
        <div>{`Your pieces left: ${props.p1Pieces}`}</div>
      </div>
      <div className='infoColTwo'>
        <div>{`Opponent pieces left: ${props.p2Pieces}`}</div>
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ gameInfo }) => ({ ...gameInfo });

export default connect(mapStateToProps)(GameInfo);