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
            <h1>{this.props.f.caption}</h1> 
          </div>          
        </div>        
      ); 
    }

    Back() {
      var img = (this.props.f.image != "") ? 'http://3.211.82.27:8800/images/' + this.props.f.image : Lep;
        return (
            <div className="funfact-back">
             <img src={img} className="funfact-image"></img>
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
