import React from 'react';

class GameInfoBox extends React.Component {
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
        <div className="game-info-box">

        </div>)
  } 
}
  

export default GameInfoBox;