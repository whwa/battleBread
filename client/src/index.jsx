import React from 'react';
import store from './store.js';
import Board from './components/Board.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { 
  createBoard, 
  setPiece, 
  setChat, 
  setRandomPieces,
  getUser,
  getGame,
  updateGame,
} from './actions.js';

/**
 * Entry point into the app, and renders the app to the DOM
 * Redux store is passed in via the Provider higher-order container
 * Initializes with an empty state, then creates+populates 2 boards with random piece placements
 * Sends 2 test chat messages
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    getUser('abc');
    createBoard();
    getGame('1');
    
  }
  componentDidMount() {
    // setRandomPieces('p2');
    // setRandomPieces('p1');
    // updateGame('1');
    setChat('p1', 'glhf');
    setChat('p2', 'you\'re toast!');
  }
  render() {
    return (
      <div className="container">
        <h3>BattleBread boards</h3>
        <div className="container-fluid">
          <Provider store={store}>
            <Board />
          </Provider>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
