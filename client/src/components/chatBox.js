import React from 'react';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: data,
    }
    this.getAllChats = this.getAllChats.bind(this);
  }

  componentDidMount() {
    this.getAllChats()
  }

  getAllChats() {
    $.ajax({
      url: '//TBD',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(res) {
        // TBD 
      }.bind(this),
      error: function(error){
      }
    });
  }

  sendChat() {
    $.ajax({
        url: '//TBD',
        type: 'POST',
        data: message,
        success: function (data) {
          // TBD
        },
        error: function (error) {
          console.error('ERROR: Failed to send message', error);
        }
      });
  }

  clearAllMessages() {
    // TBD
    // app.$chats.html('');    
  }

  render() {
    return(
        <div className="chat-box">
            <div>
            </div>
            <form action="#" id="send" method="post">
                <input type="text" name="chat" id="chat"/>
                <button type="button" name="submit">SEND</button>
            </form> 
        </div>)
  } 
}
  

export default ChatBox;