import React from 'react';
import { Accordion, Card, Container, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import {NavLink } from 'react-router-dom';
import SideBar from './../components/sidebar';
import Textbox from './../components/textbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import AnimatedTabs from './../components/animatedTabs';
import './../css/settings.css';
import './../css/textbox.css';
import Alert from './../components/alertError';

const popoverGood = (
    <Popover id="popover-basic">
            <Popover.Title as="h3">Success!</Popover.Title>
            <Popover.Content>
              Your password has been changed.
            </Popover.Content>
          </Popover>
);

const renderNothing = ( <div />);

class Settings extends React.Component {
  constructor(props) {
    super(props);

    if(sessionStorage.getItem("netid") == null){
        this.props.history.push("/login");
    }

    this.state = {
      index: 0,
      netid: sessionStorage.getItem("netid"),
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      show: false,
      toAlert: false,
      alertMessage: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.setOld = this.setOld.bind(this);
    this.setNew = this.setNew.bind(this);
    this.setConfirm = this.setConfirm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit() {

  const requestOptions = {
    method: 'POST',
    body:  JSON.stringify({ "netid": this.state.netid, "password": this.state.oldPassword})
  };
  fetch('http://3.211.82.27:8800/login', requestOptions)
  .then(async response => {
        const data = await response;

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            this.sendAlert("There was an error validating your old password. Please try again.");
            this.setState({show: false});
            return Promise.reject(error);
        }

       if(this.state.newPassword != this.state.newPasswordConfirm) {
            this.setState({show: false});
            this.sendAlert("Your provided passwords don't match.");
       } else {
            const requestOptions = {
                method: 'PUT',
                body:  JSON.stringify({ "netid": this.state.netid, "oldPassword": this.state.oldPassword, "newPassword": this.state.newPassword})
            };
            fetch('http://3.211.82.27:8800/login', requestOptions)
              .then(async response => {
                    const data = await response;

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        console.log("Error creating request");
                        return Promise.reject(error);
                    }
                    this.setState({show: true});
                    setTimeout( () => {this.setState({show: false}); }, 6000);
               })
            .catch(error => {
                this.setState({show: false});
                this.sendAlert("Your password could not be updated at this time. Please try again.");
            });
        }

  })
  .catch(error => {
        this.setState({show: false});
        this.sendAlert("Your old password is incorrect. Please try again.");
  });
}

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  setOld(e) {
    this.setState({oldPassword: e.target.value});
  }

  setNew(e) {
    this.setState({newPassword: e.target.value});
  }

  setConfirm(e) {
    this.setState({newPasswordConfirm: e.target.value});
  }

  render() {

    const { index } = this.state;
    sessionStorage.setItem("settingsNav", "true");

    return(
        <div id="Page">
            <Alert message={this.state.alertMessage} toAlert={this.state.toAlert} closeCallback={this.closeAlert}/>
            <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} />
            <div id="page-wrap" className="settings">
              <div className="wrapperSettings">
                <Tabs value={index} onChange={this.handleChange} className="tabs" >
                  <Tab label="Update Personal Information" />
                  <Tab label="Change Password" />
                </Tabs>
                <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    <div className="slide1Settings">
                      <Container className="changeOptions">
                          <Row>
                            <Col>
                                <h2 className="changeTitle">Change Basic Information</h2>
                                <div className="bulletOptions">
                                    <ul>
                                      <li>Name</li>
                                      <li>Dorm</li>
                                      <li>Sexual Preference</li>
                                      <li>Hometown</li>
                                    </ul>
                                </div>
                                <NavLink to="/signup_2" className="changeButton">Here</NavLink>
                            </Col>
                            <div className="vl"></div>
                            <Col>
                                <h2 className="changeTitle">Change Personal Preferences</h2>
                                <div className="bulletOptions">
                                    <ul>
                                      <li>Qualities in a Partner</li>
                                      <li>Friday Night Plans</li>
                                      <li>Religous Views</li>
                                      <li>First Date Ideas</li>
                                    </ul>
                                </div>
                                 <NavLink to="/signup_3" className="changeButton">Here</NavLink>
                            </Col>
                            <div className="vl"></div>
                            <Col>
                                <h2 className="changeTitle">Change Profile Content</h2>
                                <div className="bulletOptions">
                                    <ul>
                                      <li>Photos</li>
                                      <li>Fun Facts</li>
                                      <li>Calendar</li>
                                      <li>Prompt Question</li>
                                    </ul>
                                </div>
                                <NavLink to="/signup_4" className="changeButton">Here</NavLink>
                            </Col>
                          </Row>
                        </Container>
                    </div>
                    <div className="slide2Settings">
			<div className="changeTextBoxContainer">
                            <div className="form-group">
                                <label>Confirm Old Password</label>
                                <input type="password" className="form-control change-password"  placeholder="Enter Old Password" onChange={this.setOld}/>
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" className="form-control change-password"  placeholder="Enter New Password" onChange={this.setNew}/>
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" className="form-control"  placeholder="Re-enter New Password" onChange={this.setConfirm}/>
                            </div>
                            <OverlayTrigger trigger="click" placement="right" overlay={ this.state.show ? popoverGood : renderNothing} >
                                <button onClick={this.onSubmit} className="changePasswordButton">Submit</button>
                             </OverlayTrigger>
                      </div>
                    </div>
                </SwipeableViews>
           </div>
          </div>
        </div>
    );
  }
}

export default Settings;
