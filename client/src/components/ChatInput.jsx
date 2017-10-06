import React from 'react';
import ChatHist from './ChatHist.jsx';
import { setChat } from '../actions.js';


class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: 'data',
        player: 'p1',
        message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    
  }

  componentDidMount() {
  }

  handleSubmit(player, text) {
    setChat(player, text);
    console.log('message sent')
  }

  updateMessage(e) {
    this.setState({
      message: e.target.value
    })
  }

  render() {
    return(
        <div className='chatBox'>
          <ChatHist />
            <form className="container">
                  <input type="text" placeholder="Create your message" id="newMessage" onChange={this.updateMessage} value={this.state.message}/>
                  <button type="button" className="submit" onClick={() => {this.handleSubmit(this.state.player, this.state.message)}}>SEND</button>
            </form>
        </div>)
  } 
}
  

export default ChatInput;