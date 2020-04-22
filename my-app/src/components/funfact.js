import React from 'react';
import FlipCard from "./flipcard";
import Lep from "./../img/logo.png";

class FunFact extends React.Component {
    constructor(props) {
        super(props);
        this.Front = this.Front.bind(this);
        this.Back = this.Back.bind(this);
    }

    Front() {
      return (
        <div className="funfact-front">
          <div className="info">
            <h1>I like eggs.</h1> 
          </div>          
        </div>        
      ); 
    }

    Back() {
        return (
            <div className="funfact-back">
             <img src={Lep} className="funfact-image"></img>
            </div>
      );
    }

    render() {
        return (
            <FlipCard front={this.Front} person={this.props.person} back={this.Back}/>
        );
    }
}

export default FunFact;
