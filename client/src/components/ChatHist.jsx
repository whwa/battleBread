import React from 'react';
import { getChats } from '../actions.js';

class ChatHist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        history: []
    }
  }

  componentDidMount() {
    this.loadChats();
  }

  loadChats() {
    var messages = getChats();
    this.setState({
      // history: messages
    })
  }

  render() {
    return(
      <div className='chatHist'>
        Display chat history here:
        { this.state.history.map((message, index) => 
          <div>
            <h3>{message.username}</h3>
            <p>{message.message}</p>
          </div>
        )}
     </div>)
  } 
}
  

export default ChatHist;