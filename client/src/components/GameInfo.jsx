import React from 'react';

class GameInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        status: 'active or inactive',
        turn: 'player or opponent',
        playerPieces: '#',
        opponentPieces: '#',
        timeRemaining: 'HH:MM:SS',
    }
  }

  render() {
    return(
        <div className='gameInfo'>
          <div>
            <h5>Game Stats:</h5>
            <div>Show Status: Your Turn || Opponents Turn</div>
            <div className='infoColOne'>
              <div>Import # of hits</div>
              <div>Import # of misses</div>
            </div>
            <div className='infoColTwo'>
              <div>Import # of hits</div>
              <div>Import # of misses</div>
            </div>
          </div>
        </div>)
  } 
}
  

export default GameInfo;