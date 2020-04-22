import React from 'react';
import ReactCardFlip from 'react-card-flip';
import Lep from "./../img/logo.png";
import "./../css/flipcard.css";

function Front(props) {
  return (
    <div className="front-container" onClick={props.flip}>
        {props.content()}    
    </div>
  );
}      

function Back(props) {
    return (
        <div className="back-container" onClick={props.flip}>
            {props.content()}
        </div>
    );
}

export default class FlipCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    if(this.props.badge) {
      return (
        <h1>Badge</h1>
      );
    } else {
      return (
       <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <Front content={this.props.front} flip={this.handleClick}/>
 
        <Back content={this.props.back} flip={this.handleClick} />
      </ReactCardFlip>
      );
    }
  }
}
