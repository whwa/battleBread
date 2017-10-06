import React from 'react';
import ChatHist from './ChatHist.jsx';
import ChatWords from './ChatWords.jsx';
import { setUser } from '../actions.js';


class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        player: 'p1',
        level: '',
        newMessage: '',
        list: ['you\'re', 'bread', 'toast']
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    
  }

  componentDidMount() {
    // var userInfo = setUser();
    this.setState({
      // player: userInfo.username,
      // level: userInfo.level,
      // list: userInfo.chats,
    })
  }

  handleSubmit(player, text) {
    this.setChat(player, text);
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
            <form className="chatInput">
                  <input readOnly="readonly" type="text" placeholder="Create your message" id="newMessage" onChange={this.updateMessage} value={this.state.message}/>
                  <button type="button" className="submit" onClick={() => {this.handleSubmit(this.state.player, this.state.message)}}>SEND</button>
            </form>
            <div className="chatWords">
              { this.state.list.map((item, index) => <ChatWords item={item} key={index}/>)}
            </div>
        </div>)
  } 
}
  

export default ChatInput;