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
        console.log(this.props.person);
        if( this.props.person == undefined || this.props.person[4] == undefined ) return;
        var majors = "";//( this.props.person[4].length > 1 ) ?  this.props.person[4].join(" ") +" Majors" :  this.props.person[4].join(" ") + " Major";
        var minors = "";//( this.props.person[5].length > 0 ) ?  (this.props.person[5].length > 1 ? this.props.person[5].join(" ") + " Minors" :  this.props.person[5].join(" ") +" Minor") : "";
       
        var dorm = (this.props.person[8] == "Sorin" ? " College" : ((this.props.person[8] == "Zahm") ? "House" : " Hall"));
        return (
            <div className="profile-front">
              <div className="info">
                <h1>{this.props.person[1]} {this.props.person[2]}</h1>
                <p>Class of {this.props.person[3]}</p>
                <p>{majors}</p>
                <p>{minors}</p>
                <p>{this.props.person[6]}, {this.props.person[7]}</p>
                <p>{this.props.person[8]} {dorm}</p>
              </div>
            </div>
      ); 
    }
    
    Back() {
        if(this.props.person == undefined || this.props.person == undefined) return;
        return (
            <div className="profile-back">
             <img src={this.props.person[10]} className="profile-image"></img>
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
