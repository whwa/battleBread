import React from 'react';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: 'data',
    }
  }

  componentDidMount() {
  }

  getAllChats() {
  }

  sendChat() {
  }


  render() {
    return(
        <div className='chatBox'>
            <div className='chatWindow'>
              Display chats here
            </div>
            <form action="#" id="send" method="post">
                <input type="text" name="chat" id="chat"/>
                <button type="button" name="submit">SEND</button>
            </form> 
        </div>)
  } 
}
  

export default Chat;