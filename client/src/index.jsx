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
  newUser,
  getUser,
  getGame,
  updateGame,
  login
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
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  
  componentWillMount() {
    createBoard();
    getUser('abc123');
    getGame('1');
  }

  componentDidMount() {
    // setRandomPieces('p2');
    // setRandomPieces('p1');
    // updateGame('1');
    setChat('p1', 'glhf');
    setChat('p2', 'you\'re toast!');
  }

  handleUsername(e) {
    this.setState({
      username : e.target.value
    })
    console.log('username')
  }

  handlePassword(e) {
    this.setState({
      password : e.target.value
    })
    console.log('password')
  }

  render() {
    return (
      <div className="container">

        <div className="header">
          <div className="login">
            <form action="/login" method="post">
              <div>
                <input id="username" type="text" name="username" placeholder="Username" onChange={this.handleUsername}></input>
              </div>
              <div>
                <input id="password" type="password" name="password" placeholder="Password" onChange={this.handlePassword}></input>
              </div>
              <div>
                <button type="button" value="Login" onClick={()=>{login(this.state.username, this.state.password)}}>Login</button>
                <button type="button" value="Register" onClick={newUser}>Register</button>
              </div>
            </form>
          </div>
          <div className="logo">
            <img src="../client/images/BattleBreadLogo.png" height="125px"></img>
          </div>
        </div>

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
