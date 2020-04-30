import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './../css/messageSideOption.css';
import Lep from './../img/lep.png';

class MessageSideOption extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id      : this.props.id,
            target  : this.props.target,
            name    : this.props.name,
            active  : this.props.active
        }
        this.update = this.update.bind(this);
        this.getActiveStyle = this.getActiveStyle.bind(this);
        this.buildImagePath = this.buildImagePath.bind(this);
    }

    // Update when messages change
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.id !== this.props.id) {
        this.setState({id : this.props.id});
      }
      if (prevProps.target !== this.props.target){
        this.setState({target : this.props.target});
      }
      if (prevProps.name !== this.props.name){
        this.setState({name : this.props.name});
      }
      if (prevProps.active !== this.props.active){
        this.setState({active : this.props.active});
      }
    }

    // Callback to update messages
    update() {
        this.props.callback(this.state.id, this.state.target, this.state.name);
    }

    buildImagePath(image) {
      if (image == undefined) {
        return Lep;
      }
      return "http://3.211.82.27:8800/images/" + image;
    }

    getActiveStyle() {
      if (this.state.active) {
        return " activeConversation"
      }
      return ""
    }

    render(){
        var message = this.props.message.substring(0, Math.min(this.props.message.length, 25));
        return(
           <div onClick={this.update} className={"messageSideButton" + this.getActiveStyle()}>
                <Container className="messageSideButton-container">
                  <Row>
                    <Col sm={3} className="sideImage-container">
                        <img src={this.buildImagePath(this.props.image)} className="sideImage"/>
                    </Col>
                    <Col sm={8} className="sideText-container">
                      <Row>
                        <p className="sideName">{this.state.name}</p>
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
