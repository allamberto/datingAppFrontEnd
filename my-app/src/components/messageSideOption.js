import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './../css/messageSideOption.css';
import Lep from './../img/lep.png';

class MessageSideOption extends React.Component {
    constructor(props){
        super(props);
        this.update = this.update.bind(this);

        this.state = {
            user: this.props.user,
            sender: this.props.sender
        }
    }

    update() {
        this.props.callback(this.state.sender);
    }

    render(){
        var message = this.props.message.substring(0, Math.min(this.props.message.length, 25));
        return(
           <div onClick={this.update} className="messageSideButton">
                <Container className="messageSideButton-container">
                  <Row>
                    <Col sm={3} className="sideImage-container">
                        <img src={Lep} className="sideImage"/>
                    </Col>
                    <Col sm={8} className="sideText-container">
                      <Row>
                        <p className="sideName">{this.props.p}</p>
                      </Row>
                      <Row>
                        <p className="sideLastMessage">{message} ...</p>
                      </Row>
                    </Col>
                  </Row>
                </Container>
            </div> 
        );
    }
}

export default MessageSideOption
