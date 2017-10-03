import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import Board from './components/Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    store.dispatch({ type: 'createBoard' });
  }
  componentDidMount() {
    store.dispatch({ type: 'randomPieces' });
  }
  render() {
    return (
      <div>
        <h3>Hello World</h3>
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
