import React from 'react';
import { getInfo, updatePieces } from '../actions.js';
import { connect } from 'react-redux';

// class GameInfo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       turn: 'p1',
//       p1Pieces: 4,
//       p2Pieces: 4,
//     }
//     this.updateGameInfo = this.updateGameInfo.bind(this);
//   }

//   componentDidMount() {
//     this.updateGameInfo();
//   }

//   updateGameInfo() {
//     var data = getInfo();
//     // console.log("DONE")
//     // console.log(data)
//     this.setState({
//       turn: data.turn,
//       p1Pieces: data.p1Pieces,
//       p2Pieces: data.p2Pieces,
//     });
//   }

//   render() {
//     return(
//       <div className='gameInfo'>
//         <div>
//           <h5>Game Stats:</h5>
//           <div>Next Move: {this.state.turn}</div>
//           <div className='infoColOne'>
//             <div>Your pieces left: {this.state.p1Pieces}</div>
//           </div>
//           <div className='infoColTwo'>
//             <div>Opponent pieces left: {this.state.p2Pieces}</div>
//           </div>
//         </div>
//       </div>);
//   } 
// }

const GameInfo = props => { 
  console.log(props);
return (
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
}

const mapStateToProps = ({ gameInfo }) => ({ ...gameInfo });

export default connect(mapStateToProps)(GameInfo);