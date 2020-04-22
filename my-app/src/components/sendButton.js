import React from 'react';
import { Button } from 'react-bootstrap';
import Arrow from './../img/upArrow.png';
import './../css/sendButton.css';

class SendButton extends React.Component {
  render() {
    return (
      <Button className='sendButton'>
        <img src={Arrow} className='sendButtonImg'></img>
      </Button>
    );
  }
}

export default SendButton;
