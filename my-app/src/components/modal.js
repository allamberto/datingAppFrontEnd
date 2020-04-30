import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import Select from 'react-select';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class CustomModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show        : this.props.show,
      lunches     : this.props.lunches,
      lunchValue  : "",
      courses     : this.props.courses,
      courseValue : "",
      masses      : [],
      massValue   : "",
      attendsMass : false,
      index       : 0,
      target      : this.props.target
    };
    this.buildCourses = this.buildCourses.bind(this);
    this.buildLunches = this.buildLunches.bind(this);
    this.buildMasses = this.buildMasses.bind(this);
    this.loadMasses = this.loadMasses.bind(this);
    this.getMasses = this.getMasses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getTabContent = this.getTabContent.bind(this);
    this.massCallback = this.massCallback.bind(this);
    this.courseCallback = this.courseCallback.bind(this);
    this.lunchCallback = this.lunchCallback.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);

    this.loadMasses();
  }

  // Update when messages change
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show !== this.props.show) {
      this.setState({show : this.props.show});
    }
    if (prevProps.lunches !== this.props.lunches) {
      this.setState({lunches : this.props.lunches});
    }
    if (prevProps.courses !== this.props.courses) {
      this.setState({courses : this.props.courses});
    }
    if (prevProps.attendsMass !== this.props.attendsMass) {
      this.setState({attendsMass : this.props.attendsMass});
    }
    if (prevProps.target !== this.props.target) {
      this.setState({target : this.props.target,
                     massValue : "",
                     courseValue : "",
                     lunchValue: "",
                     index: 0});
    }
  }

  handleChange = (event, value) => {
    event.preventDefault();
    this.setState({ index: value });
  };

  massCallback(val) {
    this.setState({ massValue : val });
  }

  lunchCallback(val) {
    this.setState({ lunchValue : val });
  }

  courseCallback(val) {
    this.setState({ courseValue : val });
  }

  // Load all masses
  loadMasses() {
    fetch('http://3.211.82.27:8800/masses')
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        this.setState({masses : this.getMasses(data)});
    });
  }

  getMasses(masses) {
    var massOptions = [];
    if (masses != undefined) {
      for(var m of masses) {
          massOptions.push({
              label: m.day + " " + m.time + " (" + m.location + ")",
              value: m.massID
          });
      }
    }
    return massOptions
  }

  buildCourses(courses) {
    if (courses != undefined && courses.length > 0) {
      console.log(courses);
      return (
        <div>
          <p className="dropdown-desc">Choose from courses you share!</p>
          <Select options={courses} value={this.state.courseValue} placeholder='Select Course' onChange={this.courseCallback}/>
        </div>
      )
    }
  }

  buildLunches(lunches) {
    if (lunches != undefined && lunches.length > 0) {
      console.log(lunches);

      return (
        <div>
          <p className="dropdown-desc">You have time in your schedules to meet up!</p>
          <Select options={lunches} value={this.state.lunchValue} placeholder='Recommended Lunch Times!' onChange={this.lunchCallback}/>
        </div>
      )
    }
  }

  buildMasses(attendsMass) {
    console.log(this.state.masses);
    console.log(attendsMass);
    if (attendsMass != undefined && attendsMass && this.state.masses != undefined && this.state.masses.length > 0) {
      return (
        <div>
          <p className="dropdown-desc">You both attend mass regularly!</p>
          <Select options={this.state.masses} value={this.state.massValue} placeholder='Masses on Campus' onChange={this.massCallback}/>
        </div>
      )
    }
  }

  getTabContent(ind, courses, lunches, attendsMass) {
    if (ind === 0) {
      return this.buildCourses(courses)
    }
    else if (ind === 1) {
      return this.buildLunches(lunches)
    }
    else if (ind === 2) {
      return this.buildMasses(attendsMass)
    }
  }

  handleModalSubmit(event) {
    var msg = "";
    if (this.state.index == 0) {
      console.log(this.state.courseValue);
      if (this.state.courseValue != undefined && this.state.courseValue) {
        msg = "Want to study for " + this.state.courseValue.label + " sometime with me?";
      }
      else {
        msg = "Want to study together sometime?";
      }
    }
    else if (this.state.index == 1) {
      if (this.state.lunchValue != undefined && this.state.lunchValue) {
        msg = "Want to get lunch? How about " + this.state.lunchValue.label + "?";
      }
      else {
        msg = "Want to get lunch together sometime?";
      }
    }
    else if (this.state.index == 2) {
      if (this.state.massValue != undefined && this.state.massValue) {
        msg = "Want to go to mass together? I was thinking " + this.state.massValue.label;
      }
      else {
        msg = "Want to go to mass together sometime?";
      }
    }
    this.props.handleSubmit(msg)
  }

  render() {
    return(
      <Modal show={this.state.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <h4>Date Ideas</h4>
        </Modal.Header>
        <Modal.Body>
          <Tabs value={this.state.index} standard onChange={this.handleChange} className="tabs" >
            <Tab label="Study Buddy" />
            <Tab label="DH Date" />
            <Tab label="Mass" />
          </Tabs>
          {this.getTabContent(this.state.index,
                              this.state.courses,
                              this.state.lunches,
                              this.state.attendsMass )}
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleModalSubmit}>
            Create Invitation
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
