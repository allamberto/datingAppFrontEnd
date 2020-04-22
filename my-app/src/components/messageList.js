import React from 'react';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.myMessage = this.myMessage.bind(this);
        this.theirMessage = this.theirMessage.bind(this);
    }

    myMessage(content){
        return (
          <div>
            <div className='message-right-triangle'>
                <div className='myMessage-container'> {content} </div>
                <div className='triangle-right'></div>
            </div>
            <hr className="messageDivider" />
          </div>
        );
    }

    theirMessage(content){
        return (
          <div>
            <div className='message-left-triangle'>
                <div className='triangle-left'></div>
                <div className='theirMessage-container'> {content} </div>
            </div>
            <hr className="messageDivider" />
          </div>
        );
    }

    render() {
        var messageList = [];
        for(var message of this.props.messages) {
            var content = message['content'];

            if(message['receiver'] == this.props.user) {
                messageList.push(this.myMessage(content));
            } else {
                messageList.push(this.theirMessage(content));
            }
        }

        return(messageList);

    }
}

export default MessageList;
