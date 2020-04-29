import React from 'react';
import {Row, Col} from 'react-bootstrap';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id       : this.props.id,
                       messages : this.props.messages}
        this.myMessage = this.myMessage.bind(this);
        this.theirMessage = this.theirMessage.bind(this);
    }

    // Update when messages change
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.messages.length !== this.props.messages.length) {
        this.setState({messages : this.props.messages});
      }
    }

    myMessage(content){
        return (
          <Row >
            <Col className="float-right" >
              <div className='message-right-triangle' >
                <div className='myMessage-container'> {content} </div>
                <div className='triangle-right'></div>
              </div>
            </Col>
            <hr className="messageDivider" />
          </Row>
        );
    }

    theirMessage(content){
        return (
          <Row>
            <Col className="float-left" >
              <div className='message-left-triangle' >
                <div className='triangle-left'></div>
                <div className='theirMessage-container'> {content} </div>
              </div>
            </Col>
            <hr className="messageDivider" />
          </Row>
        );
    }

    render() {
        var messageList = [];
        for(var message of this.state.messages) {
            var content = message['content'];

            if(message['sender'] == this.props.user) {
                messageList.push(this.myMessage(content));
            }
            else {
                messageList.push(this.theirMessage(content));
            }
        }
        return(messageList);
    }
}

export default MessageList;
