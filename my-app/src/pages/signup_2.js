import React, { Component } from "react";
import { NavLink, withRouter} from "react-router-dom";
import Textbox from './../components/textbox';
import "./../css/signup.css";
import {DropdownButton, Dropdown} from "react-bootstrap";
import StepProgressBar from "./../components/progressbar";
import DynamicButton from "./../components/dynamicButton";

class Signup2 extends React.Component {

   constructor(props) {
      super(props);

      var pathOp;
      if(sessionStorage.getItem("settingsNav") == "true") {
        pathOp = "/settings";
      } else {
        pathOp = "/signup_3";
      }

      sessionStorage.setItem("settingsNav", "false");

      this.state = {
        path: pathOp
      }

      this.mySubmitHandler = this.mySubmitHandler.bind(this);
      this.changePage = this.changePage.bind(this);
    }

  componentDidMount() {
    if(sessionStorage.getItem("netid") == null){
        this.props.history.push("/login");
    }
  }

mySubmitHandler = (event) => {
      event.preventDefault();
      //this.props.history.push("/signup_3");
    }

changePage  = (event) => {
      event.preventDefault();
      this.props.history.push(this.state.path);
    } 

render() {
    var step = (this.state.path != "/settings") ? <StepProgressBar level="35"/> : <div />;
        return (
            <div className="signup">
                 <div className="backdrop">
                {step}
                <div className="content-container">
                <form onSubmit={this.mySubmitHandler}>
                <h3>Basic Information</h3>

                <Textbox header="First Name" placeholder="Enter First Name" style="form-control"/>               
                <Textbox header="Last Name" placeholder="Enter Last Name" style="form-control"/>               
                <Textbox header="Home City" placeholder="Enter Home City" style="form-control"/>               
                <Textbox header="Home State" placeholder="ex. NJ" style="form-control"/>      

                <DropdownButton id="dropdown-item-button" title="On-Campus Hall">
                  <Dropdown.Item as="button">Action</Dropdown.Item>
                  <Dropdown.Item as="button">Another action</Dropdown.Item>
                  <Dropdown.Item as="button">Something else</Dropdown.Item>
                </DropdownButton>

                <DropdownButton id="dropdown-item-button" title="Class">
                  <Dropdown.Item as="button">2020</Dropdown.Item>
                  <Dropdown.Item as="button">2021</Dropdown.Item>
                  <Dropdown.Item as="button">2022</Dropdown.Item>
                  <Dropdown.Item as="button">2023</Dropdown.Item>
                </DropdownButton>

                <label>Majors</label>
                <DynamicButton placeholder="Enter Major"/>
                <label>Minors</label>
                <DynamicButton placeholder="Enter  Minor"/>

                <DropdownButton id="dropdown-item-button" title="Gender Identity">
                  <Dropdown.Item as="button">Action</Dropdown.Item>
                  <Dropdown.Item as="button">Another action</Dropdown.Item>
                  <Dropdown.Item as="button">Something else</Dropdown.Item>
                </DropdownButton>

                <DropdownButton id="dropdown-item-button" title="Sexual Orientation">
                  <Dropdown.Item as="button">Action</Dropdown.Item>
                  <Dropdown.Item as="button">Another action</Dropdown.Item>
                  <Dropdown.Item as="button">Something else</Dropdown.Item>
                </DropdownButton>
                
                <button type="submit" className="btn btn-primary btn-block" onClick={this.changePage}>Submit</button>
            </form> 
            </div>
          </div>
        </div>
        );
    }
}

export default withRouter(Signup2);
