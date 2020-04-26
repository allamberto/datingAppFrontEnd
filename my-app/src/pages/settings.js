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

class CustomPopover extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "pop": this.props.state
        }

        this.popoverSuccess = this.popoverSuccess.bind(this);
        this.popoverFail = this.popoverFail.bind(this);
    }

    popoverSuccess(){
        return(
          <Popover id="popover-basic">
            <Popover.Title as="h3">Success!</Popover.Title>
            <Popover.Content>
              Your password has been changed.
            </Popover.Content>
          </Popover>
        );
      }

      popoverFail() {
        return (
          <Popover id="popover-basic">
            <Popover.Title as="h3">Failure!</Popover.Title>
            <Popover.Content>
              Your password failed to be changed. Please try again.
            </Popover.Content>
          </Popover>
        );
      }

    render() {
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
                    console.log("Error creating request");
                    return Promise.reject(error);
                }

               if(this.state.newPassword != this.state.newPasswordConfirm) {
                    alert('\t\t\t\tYour passwords do not match. \t\t\t\t\t\tPlease try again.');
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

                            return(this.popoverSuccess());
                       })
                    .catch(error => {
                        return(this.popoverFail());
                    });
                }

          })
          .catch(error => {
                return(this.popoverFail());
          });

        return(this.popoverFail());
    }
}

const popoverGood = (
    <Popover id="popover-basic">
            <Popover.Title as="h3">Success!</Popover.Title>
            <Popover.Content>
              Your password has been changed.
            </Popover.Content>
          </Popover>
);

const popoverBad = (
    <Popover id="popover-basic">
            <Popover.Title as="h3">Failure!</Popover.Title>
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
      pop: false,
      show: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.setOld = this.setOld.bind(this);
    this.setNew = this.setNew.bind(this);
    this.setConfirm = this.setConfirm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setPopover = this.setPopover.bind(this);
    this.popoverGood = this.popoverGood.bind(this);
    this.popoverBad = this.popoverBad.bind(this);
    this.renderNothing = this.renderNothing.bind(this);
  }

  onSubmit() {
    this.setState({show: true });

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
            console.log("Error creating request");
            return Promise.reject(error);
        }
        
       if(this.state.newPassword != this.state.newPasswordConfirm) {
            alert('\t\t\t\tYour passwords do not match. \t\t\t\t\t\tPlease try again.');
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

                    this.setState({pop: true });;
                    setTimeout( () => {this.setState({show: false}); }, 4000); 
               })
            .catch(error => {
                this.setPopover(false);
                setTimeout( () => {this.setState({show: false}); }, 4000);
            });
        }
         
  })
  .catch(error => {
        this.setPopover(false);
        console.error('\t\t\t\tYour old password was incorrect. \t\t\t\t\t\tPlease try again.', error);
        setTimeout( () => {this.setState({show: false}); }, 4000);
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

  setPopover(e) {
    this.setState({pop: e});
  } 

  popoverGood() {
    return (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Success!</Popover.Title>
            <Popover.Content>
              Your password has been changed.
            </Popover.Content>
          </Popover>
    );
  }

  popoverBad() {
    return (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Failure!</Popover.Title>
            <Popover.Content>
              Your password has been changed.
            </Popover.Content>
          </Popover>
    );
  }

  renderNothing() {
    return(<div />);
  }
 
  render() {

    const { index } = this.state;
    sessionStorage.setItem("settingsNav", "true");

    return(
        <div id="Page">
            <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} />
            <div id="page-wrap" className="settings">
              <div className="wrapperSettings">
                <Tabs value={index} fullWidth onChange={this.handleChange} className="tabs" >
                  <Tab label="Change Password" />
                  <Tab label="Update Personal Information" />
                </Tabs>
                <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    <div className="slide1Settings">
                        <div className="changeTextBoxContainer">
                            <div className="form-group">
                                <label>Confirm Old Password</label>
                                <input type="password" className="form-control"  placeholder="Enter Old Password" onChange={this.setOld}/>
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" className="form-control"  placeholder="Enter New Password" onChange={this.setNew}/>
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" className="form-control"  placeholder="Re-enter New Password" onChange={this.setConfirm}/>
                            </div>
                            <OverlayTrigger trigger="click" placement="right" overlay={ this.state.show ? (this.state.pop ? popoverGood : popoverBad) : renderNothing} >
                                <button onClick={this.onSubmit} className="changePasswordButton">Submit</button>
                             </OverlayTrigger> 
                      </div>
                    </div>
                    <div className="slide2Settings">
                        <Container className="changeOptions">
                          <Row>
                            <Col>
                                <h2 className="changeTitle">Change Basic Information</h2>
                                <div className="bulletOptions">
                                    <ul>
                                      <li>Name</li>
                                      <li>Dorm</li>
                                      <li>Sexual Preference</li>
                                      <li>Calendar</li>
                                    </ul>
                                </div>
                                <NavLink to="/signup_2" className="changeButton">Here</NavLink>
                            </Col>
                            <div class="vl"></div>
                            <Col>
                                <h2 className="changeTitle">Change Personal Preferences</h2>
                                <div className="bulletOptions">
                                    <ul>
                                      <li>Astrological Sign</li>
                                      <li>Friday Night Plans</li>
                                      <li>Favorite Foods</li>
                                      <li>Hobbies</li>
                                    </ul>
                                </div>
                                 <NavLink to="/signup_3" className="changeButton">Here</NavLink>
                            </Col>
                            <div class="vl"></div>
                            <Col>
                                <h2 className="changeTitle">Change Partner Preferences</h2>
                                <div className="bulletOptions">
                                    <ul>
                                      <li>Ew</li>
                                      <li>Ew</li>
                                      <li>Ew</li>
                                      <li>Ew</li>
                                    </ul>
                                </div>
                                <NavLink to="/signup_4" className="changeButton">Here</NavLink>
                            </Col>
                            <div class="vl"></div>
                            <Col>
                                <h2 className="changeTitle">Change Profile Content</h2>
                                <div className="bulletOptions">
                                    <ul>
                                      <li>Photos</li>
                                      <li>Fun Facts</li>
                                      <li>Ugh</li>
                                      <li>Um</li>
                                    </ul>
                                </div>
                                <NavLink to="/signup_5" className="changeButton">Here</NavLink>
                            </Col>
                          </Row>
                        </Container>
                    </div>
                </SwipeableViews>
           </div>
          </div>
        </div>
    );
  }
}

export default Settings;
