import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { chats } from '../reducers/chatReducer.js';
import Board from './components/Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    store.dispatch({ type: 'createBoard' });
  }
  componentDidMount() {
    store.dispatch({ type: 'randomPieces' });
    store.dispatch({ type: 'setChat', payload: { player:'p1', text: 'hi' }});
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
