import React from 'react';
import { setChat } from '../actions.js';


class ChatWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    
  }

  render() {
    return(
        <button type="button" className="chatWord" onClick={()=>{this.props.updateMessage(this.props.item)}}>{this.props.item}</button>
    )
  }
}
  

export default ChatWords;