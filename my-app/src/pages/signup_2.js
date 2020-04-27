import React, { Component } from "react";
import { NavLink, withRouter} from "react-router-dom";
import Textbox from './../components/textbox';
import "./../css/signup.css";
import {DropdownButton, Dropdown, Container, Col, Row} from "react-bootstrap";
import StepProgressBar from "./../components/progressbar";
import DynamicButton from "./../components/dynamicButton";
import CustomDropdown from "./../components/customDropdown";

class Signup2 extends React.Component {

   constructor(props) {
      super(props);

      if(sessionStorage.getItem("netid") == null){
        this.props.history.push("/login");
      }

      var pathOp;
      if(sessionStorage.getItem("settingsNav") == "true") {
        pathOp = "/settings";
      } else {
        pathOp = "/signup_3";
      }

      sessionStorage.setItem("settingsNav", "false");

      this.state = {
	netid: sessionStorage.getItem('netid'),
        path: pathOp,
	firstName: "",
	lastName: "",
	city: "",
	state: "",
	dorm: "",
	year: "",
	majors: [],
	minors: [],
	identity: "",
	orientation: []
      }

      this.changePage = this.changePage.bind(this);
      this.setFirstName = this.setFirstName.bind(this);
      this.setLastName = this.setLastName.bind(this);
      this.setCity = this.setCity.bind(this);
      this.setYear = this.setYear.bind(this);
      this.setIdentity = this.setIdentity.bind(this);
      this.setOrientation = this.setOrientation.bind(this);
      this.setStateVal = this.setStateVal.bind(this);
      this.setMajors = this.setMajors.bind(this);
      this.setMinors = this.setMinors.bind(this);
      this.setDorm = this.setDorm.bind(this);
    }

  changePage  = (event) => {
      event.preventDefault();
      const requestOptions = {
            method: 'PUT',
            body: JSON.stringify({
		"firstName": this.state.firstName,
		"lastName": this.state.lastName,
		"gradYear": this.state.year,
		"city": this.state.city,
		"state": this.state.state,
		"dorm": this.state.dorm,
		"majors": this.state.majors,
		"minors": this.state.minors,
		"sexualOrientation": "heterosexual",
		"genderIdentity": this.state.identity
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
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
  }

  setFirstName(e) {
    this.setState({firstName: e.target.value});
  }

  setLastName(e) {
    this.setState({lastName: e.target.value});
  }

  setCity(e) {
    this.setState({city: e.target.value});
  }

  setYear(e) {
    this.setState({year: e.value});
  }

  setIdentity(e) {
    this.setState({identity: e.value});
  }

  setOrientation(e) {
    var ors = [];
    for(var o of e) {
        ors.push(o.value);
    }
    console.log(ors);
    this.setState({orientation: ors});
  }

  setStateVal(e) {
    this.setState({state: e.value});
  }

  setMajors(e) {
    var ms = [];
    for(var major of e) {
	ms.push(major.value);
    }
    this.setState({majors: ms});
  }

  setMinors(e) {
    var minors = [];
    for(var minor of e) {
        minors.push(minor.value);
    }
    this.setState({minors: minors});
  }

  setDorm(e) {
    this.setState({dorm: e.value});
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

		<Container>
		  <Row md={12}>
                    <Col md={6} className="align">
                    	<Textbox header="First Name" placeholder="Enter First Name" style="form-control" callback={this.setFirstName}/>
		    </Col>
                    <Col md={6} className="align">
			<Textbox header="Last Name" placeholder="Enter Last Name" style="form-control" callback={this.setLastName}/>
                    </Col>
                  </Row>
		  <Row md={12}>
                    <Col md={6} className="align">
                    	<Textbox header="Hometown" placeholder="Enter Hometown" style="form-control-help" callback={this.setCity}/>
		    </Col>
                    <Col md={6} className="align">
                        <CustomDropdown ops="states"  multi={false} placeholder="Select State.." className="container-drop" header="Home State" callback={this.setStateVal}/>
		    </Col>
                  </Row>
		  <Row md={12}>
		    <Col md={6} className="align">
			<CustomDropdown ops="dorms"  multi={false} placeholder="Select Dorm.." className="container-drop" header="Dorm" callback={this.setDorm}/>  
		    </Col>
		    <Col md={6} className="align">
			<CustomDropdown ops="years"  multi={false}  placeholder="Select Class.." className="container-drop" header="Class Year" callback={this.setYear}/> 
		    </Col>
		  </Row>
		  <Row md={12}>
		    <Col md={6} className="align">
               		<CustomDropdown ops="majors"  multi={true}  placeholder="Select Majors.." className="container-drop" header="Majors" callback={this.setMajors}/> 
		    </Col>
   		    <Col md={6} className="align">
			<CustomDropdown ops="minors"  multi={true}  placeholder="Select Minors.." className="container-drop" header="Minors" callback={this.setMinors}/>
		    </Col>
		  </Row>

		  <Row md={12}>
                     <Col md={6} className="align">
			<CustomDropdown ops="identity"  multi={false}  placeholder="Select How You Identify.." className="container-drop" header="How Do You Identify" callback={this.setIdentity}/> 
                    </Col>
                    <Col md={6} className="align">
			<CustomDropdown ops="orientation"  multi={true}  placeholder="Select Who You Are Looking For.." className="container-drop" header="Who Are You Looking For" callback={this.setOrientation}/>  
		    </Col>
		  </Row>
                </Container>            
                <button type="submit" className="btn btn-primary btn-block signup-submit" onClick={this.changePage}>Submit</button>
            </form> 
            </div>
          </div>
        </div>
        );
    }
}

export default withRouter(Signup2);
