import React from 'react';
import store from './store.js';
import Board from './components/Board.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBoard, setPiece, setChat, setRandomPieces } from './actions.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    createBoard();
  }
  componentDidMount() {
    // setPiece('p2', ['0,0', '0,1', '0,2']);
    setRandomPieces('p2');
    setRandomPieces('p1');
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
