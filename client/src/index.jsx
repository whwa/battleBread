import React from 'react';
import {render} from 'react-dom';

import Board from './components/Board.jsx';

const tests = require('./store.js');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Hello World</h3>
        <div className="container-fluid">
          <Board />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
