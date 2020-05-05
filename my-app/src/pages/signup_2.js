import React, { Component } from "react";
import { NavLink, withRouter} from "react-router-dom";
import Textbox from './../components/textbox';
import "./../css/signup.css";
import {DropdownButton, Dropdown, Container, Col, Row} from "react-bootstrap";
import StepProgressBar from "./../components/progressbar";
import DynamicButton from "./../components/dynamicButton";
import CustomDropdown from "./../components/customDropdown";
import Alert from './../components/alertError';

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
        orientation: [],
        toAlert: false,
        alertMessage: ""
      }

      this.autoPopulate();

      this.changePage     = this.changePage.bind(this);
      this.setFirstName   = this.setFirstName.bind(this);
      this.setLastName    = this.setLastName.bind(this);
      this.setCity        = this.setCity.bind(this);
      this.setYear        = this.setYear.bind(this);
      this.setIdentity    = this.setIdentity.bind(this);
      this.setOrientation = this.setOrientation.bind(this);
      this.setStateVal    = this.setStateVal.bind(this);
      this.setMajors      = this.setMajors.bind(this);
      this.setMinors      = this.setMinors.bind(this);
      this.setDorm        = this.setDorm.bind(this);
      this.setHoroscope   = this.setHoroscope.bind(this);
      this.setDate        = this.setDate.bind(this);
      this.sendAlert = this.sendAlert.bind(this);
      this.closeAlert = this.closeAlert.bind(this);
  }

  sendAlert(message) {
      this.setState({toAlert: true});
      this.setState({alertMessage: message});
  }

  closeAlert() {
     this.setState({toAlert: false});
  }

  autoPopulate() {
    fetch('http://3.211.82.27:8800/students/' + this.state.netid)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                this.sendAlert("Unable to load existing student information. Please try again.");
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            this.setState({
              ...this.state,
              firstName       : data.firstName,
              lastName        : data.lastName,
              city            : data.city,
              state           : data.state,
              dorm            : data.dorm,
              year            : data.gradYear,
              majors          : data.majors,
              minors          : data.minors,
              identity        : data.genderIdentity,
              orientation     : data.browseGenderIdentity,
	            horoscope       : data.zodiacSign,
              date            : data.danceInvite
            });
        })
        .catch(error => {
            console.error('There was an error!', error);
    });
  }

  changePage  = (event) => {
      event.preventDefault();
      const requestOptions = {
            method: 'PUT',
            body: JSON.stringify({
          		"firstName"             : this.state.firstName,
          		"lastName"              : this.state.lastName,
          		"gradYear"              : this.state.year,
          		"city"                  : this.state.city,
          		"state"                 : this.state.state,
          		"dorm"                  : this.state.dorm,
          		"majors"                : this.state.majors,
          		"minors"                : this.state.minors,
          		"browseGenderIdentity"  : this.state.orientation,
          		"genderIdentity"        : this.state.identity,
			        "zodiacSign"            : this.state.horoscope,
              "danceInvite"           : this.state.date
            })
          };
          fetch('http://3.211.82.27:8800/students/'+this.state.netid, requestOptions)
          .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    this.sendAlert("Unable to update student information. Please try again.");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                  this.props.history.push(this.state.path);
                }
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

  setHoroscope(e) {
    this.setState({horoscope: e.value});
  }

  setDate(e) {
    this.setState({date: e.value});
  }

  setOrientation(e) {
    var ors = [];
    if (e) {
      for(var o of e) {
        ors.push(o.value);
      }
    }
    this.setState({orientation: ors});
  }

  setStateVal(e) {
    this.setState({state: e.value});
  }

  setMajors(e) {
    var ms = [];
    if (e) {
      for(var major of e) {
  	     ms.push(major.value);
      }
    }
    this.setState({majors: ms});
  }

  setMinors(e) {
    var minors = [];
    if (e) {
      for(var minor of e) {
        minors.push(minor.value);
      }
      this.setState({minors: minors});
    }
  }

  setDorm(e) {
    this.setState({dorm: e.value});
  }

  render() {
    var step = (this.state.path != "/settings") ? <StepProgressBar level="35"/> : <div />;
	return (
            <div className="signup">
              <Alert message={this.state.alertMessage} toAlert={this.state.toAlert} closeCallback={this.closeAlert}/>
                 <div className="backdrop">
                {step}
                <div className="content-container">
                <form onSubmit={this.mySubmitHandler}>
                <h3>Basic Information</h3>

		<Container>
		  <Row md={12}>
                    <Col md={6} className="align">
		      <label className="title-text-textbox move-to-dropheader">First Name</label>
                      <input required type="text" className="form-control resize-to-dropdown"  value={this.state.firstName} placeholder="Enter First Name" onChange={this.setFirstName}/>
		    </Col>
                    <Col md={6} className="align">
			<label className="title-text-textbox move-to-dropheader">Last Name</label>
                        <input required type="text" className="form-control resize-to-dropdown"  value={this.state.lastName} placeholder="Enter Last Name" onChange={this.setLastName}/>
                    </Col>
                  </Row>
		  <Row md={12}>
                    <Col md={6} className="align">
			<label className="title-text-textbox move-to-dropheader">Hometown</label>
                        <input required type="text" className="form-control resize-to-dropdown"  value={this.state.city} placeholder="Enter First Name" onChange={this.setCity}/>
		    </Col>
                    <Col md={6} className="align">
                        <CustomDropdown ops="states"  multi={false} placeholder="Select State.." className="container-drop" header="Home State" value={this.state.state} callback={this.setStateVal}/>
		    </Col>
                  </Row>
		  <Row md={12}>
		    <Col md={6} className="align">
			<CustomDropdown ops="dorms"  multi={false} placeholder="Select Dorm.." className="container-drop" header="Dorm" value={this.state.dorm} callback={this.setDorm}/>
		    </Col>
		    <Col md={6} className="align">
			<CustomDropdown ops="years"  multi={false}  placeholder="Select Class.." className="container-drop" header="Class Year" value={this.state.year} callback={this.setYear}/>
		    </Col>
		  </Row>
		  <Row md={12}>
		    <Col md={6} className="align">
               		<CustomDropdown ops="majors"  multi={true}  placeholder="Select Majors.." className="container-drop" header="Majors" value={this.state.majors} callback={this.setMajors}/>
		    </Col>
   		    <Col md={6} className="align">
			<CustomDropdown ops="minors"  multi={true}  placeholder="Select Minors.." className="container-drop" header="Minors" value={this.state.minors} callback={this.setMinors}/>
		    </Col>
		  </Row>

		  <Row md={12}>
                     <Col md={6} className="align">
			<CustomDropdown ops="identity"  multi={false}  placeholder="Select Identity .." className="container-drop" header="How Do You Identify" value={this.state.identity} callback={this.setIdentity}/>
                    </Col>
                    <Col md={6} className="align">
			<CustomDropdown ops="orientation"  multi={true}  placeholder="Select Partner Identities.." className="container-drop" header="Who Do You Want To See"  value={this.state.orientation} callback={this.setOrientation}/>
		    </Col>
		  </Row>

		  <Row md={12}>
                     <Col md={6} className="align">
                        <CustomDropdown ops="horoscope"  multi={false}  placeholder="Select Horoscope .." className="container-drop" header="Horoscope" value={this.state.horoscope} callback={this.setHoroscope}/>
                    </Col>
                    <Col md={6} className="align">
                        <CustomDropdown ops="date"  multi={false}  placeholder="Select Dance Preference.." className="container-drop" header="Looking For Dance Date"  value={this.state.date} callback={this.setDate}/>
                    </Col>
                  </Row>
                </Container>
		<div className="align-submit">
                  <button type="submit" className="btn btn-primary submit-button-signup" onClick={this.changePage}>Submit</button>
		</div>
            </form>
            </div>
          </div>
        </div>
        );
    }
}

export default withRouter(Signup2);
