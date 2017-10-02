import React from 'react';
import {render} from 'react-dom';

import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Hello World</h3>
        <div>
          <Board />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
