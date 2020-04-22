import React, { Component } from "react";
import { NavLink, withRouter} from "react-router-dom";
import Textbox from './../components/textbox';
import "./../css/signup.css";
import {DropdownButton, Dropdown} from "react-bootstrap";
import StepProgressBar from "./../components/progressbar";
import DynamicButton from "./../components/dynamicButton";

class Signup4 extends React.Component {

constructor(props) {
      super(props);

      this.changePage = this.changePage.bind(this);
    }

    changePage  = (event) => {
      event.preventDefault();
      this.props.history.push("/signup_5");
    } 

render() {
        return (
            <div className="signup">
              <div className="backdrop">
                <StepProgressBar level="75"/>
                <div className="content-container">
                  <h3>Tell Us About Who You Are Looking For</h3>
                  <button type="submit" className="btn btn-primary btn-block" onClick={this.changePage}>Submit</button>
               </div>
              </div>
            </div>
        );
    }
}

export default withRouter(Signup4);
