import React from 'react';
import FlipCard from "./flipcard";
import Lep from "./../img/logo.png";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.Front = this.Front.bind(this);
        this.Back = this.Back.bind(this);
    }

    Front() {
        return (
            <div className="profile-front">
              <div className="info">
                <h1>{this.props.person.name}</h1>
                <p>{this.props.person.year}</p>
                <p>{this.props.person.major} Major & {this.props.person.minor} Minor</p>
                <p>{this.props.person.city}, {this.props.person.state}</p>
                <p>{this.props.person.dorm} Hall</p>
              </div>
            </div>
      ); 
    }
    
    Back() {
        return (
            <div className="profile-back">
             <img src={Lep} className="profile-image"></img>
            </div>
      );
    }

    render() {
        return (
            <FlipCard person={this.props.person} front={this.Front} back={this.Back}/>
        );
    }
}


export default Profile;
