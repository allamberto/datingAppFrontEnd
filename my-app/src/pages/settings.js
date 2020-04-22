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

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Success!</Popover.Title>
    <Popover.Content>
      Your password has been changed.
    </Popover.Content>
  </Popover>
);


class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);

    this.state = {
      index: 0,
    };
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

  render() {

    const { index } = this.state;

    return(
        <div id="Page">
            <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} />
            <div id="page-wrap" className="settings">
              <div className="wrapper">
                <Tabs value={index} fullWidth onChange={this.handleChange} className="tabs" >
                  <Tab label="Change Password" />
                  <Tab label="Update Personal Information" />
                </Tabs>
                <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    <div className="slide1">
                        <div className="changeTextBoxContainer">
                            <div className="form-group">
                                <label>Confirm Old Password</label>
                                <input type="password" className="form-control"  placeholder="Enter Old Password"/>
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" className="form-control"  placeholder="Enter New Password"/>
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" className="form-control"  placeholder="Re-enter New Password"/>
                            </div>
                            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                <button onClick={this.onSubmit} className="changePasswordButton">Submit</button>
                            </OverlayTrigger>
                        </div>
                    </div>
                    <div className="slide2">
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
