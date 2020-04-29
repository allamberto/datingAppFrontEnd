import React, { Component } from "react";
import { NavLink, withRouter} from "react-router-dom";
import "./../css/signup.css";
import {DropdownButton, Dropdown} from "react-bootstrap";
import StepProgressBar from "./../components/progressbar";
import MultipleChoice from './../components/multipleChoice2';

class Signup3 extends React.Component {

constructor(props) {
      super(props);

      var pathOp;
      if(sessionStorage.getItem("settingsNav") == "true") {
        pathOp = "/settings";
      } else {
        pathOp = "/signup_4";
      }

      sessionStorage.setItem("settingsNav", "false");

      this.state = {
	         netid: sessionStorage.getItem("netid"),
           path: pathOp,
	         selected: {},
           loaded: false
      }

      this.autoPopulate();

      this.changePage = this.changePage.bind(this);
      this.setSelected = this.setSelected.bind(this);
    }

    componentDidMount() {
        if(sessionStorage.getItem("netid") == null){
            this.props.history.push("/login");
        }
    }

    setSelected = (childData) => {
	     this.setState({selected: childData});
    }

    changePage  = (event) => {
      event.preventDefault();
      console.log(this.state.selected);
      const requestOptions = {
            method: 'PUT',
            body: JSON.stringify({
      		    "temperament": this.state.selected.temperament,
      		    "giveAffection": this.state.selected.giveAffection,
      		    "trait": this.state.selected.trait,
      		    "idealDate": this.state.selected.idealDate,
      		    "fridayNight": this.state.selected.fridayNight,
      		    "diningHall": this.state.selected.diningHall,
      		    "studySpot": this.state.selected.studySpot,
      		    "mass": this.state.selected.mass,
      		    "club": this.state.selected.club,
      		    "gameDay": this.state.selected.gameDay,
      		    "hour": this.state.selected.hour,
      		    "idealTemperament": this.state.selected.idealTemperament,
      		    "receiveAffection": this.state.selected.receiveAffection,
      		    "idealTrait": this.state.selected.idealTrait
            })
          };
          fetch('http://3.211.82.27:8800/students/'+this.state.netid, requestOptions)
          .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                this.props.history.push(this.state.path);
                this.setState({loaded : true});
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    autoPopulate() {
      fetch('http://3.211.82.27:8800/students/' + this.state.netid)
        .then(async response => {
              const data = await response.json();

              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  console.log("Error auto populating data");
                  return Promise.reject(error);
              }
              this.setState({
                ...this.state,
                selected : {
                  temperament       : data.temperament,
                  giveAffection     : data.giveAffection,
                  trait             : data.trait,
                  idealDate         : data.idealDate,
                  fridayNight       : data.fridayNight,
                  diningHall        : data.diningHall,
                  studySpot         : data.studySpot,
                  mass              : data.mass,
                  club              : data.club,
                  gameDay           : data.gameDay,
                  hour              : data.hour,
                  idealTemperament  : data.idealTemperament,
                  receiveAffection  : data.receiveAffection,
                  idealTrait        : data.idealTrait
                },
                loaded : true
              });
          })
          .catch(error => {
              console.error('There was an error!', error);
      });
    }


render() {
        var step = (this.state.path != "/settings") ? <StepProgressBar level="50"/> : <div />;

        return (
            <div className="signup">
              <div className="backdrop">
                {step}
                <div className="content-container">
                  <h3>Tell Us About You</h3>
                  { this.state && this.state.loaded &&
 		                 <MultipleChoice netid={this.state.netid} selected={this.state.selected} callback={this.setSelected}/>
                  }
                  <button type="submit" className="btn btn-primary btn-block" onClick={this.changePage}>Submit</button>
               </div>
              </div>
            </div>
        );
    }
}

export default withRouter(Signup3);
