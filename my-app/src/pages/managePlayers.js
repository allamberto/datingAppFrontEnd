import React from 'react';
import { Accordion, Card, Container, Row, Col, Popover, OverlayTrigger, Dropdown, DropdownButton } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SideBar from './../components/sidebar';
import Textbox from './../components/textbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import './../css/managePlayers.css';
import backArrow from './../img/upArrow.png';
import Add from './../img/add.png';
import ListItemWithDelete from './../components/listItemWithDelete';
import Modal from './../components/customModal';

class RenderPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: this.props.people
        }
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(name) {
        var { people } = this.state;
        for(var i = 0; i < people.length; i++) {
            if(people[i]['netid'] == name) {
                people.splice(i, 1);
                break;
            }
        }

        this.setState({ people });
        this.props.callback(people, name);
    }

    render() {
            var peeps = [];
            for(var p of this.props.people) {
                var netid = p[this.props.netid];
                if(this.props.pending) {   
		    console.log(p);             
                    peeps.push(<ListItemWithDelete pending={true} netid={netid} name={p['firstName'] + " " + p['lastName']} callback={this.deleteItem} accept={this.props.accept} decline={this.props.decline}/>);
                } else {
                    peeps.push(<ListItemWithDelete netid={netid} name={p['firstName'] + " " + p['lastName']} callback={this.deleteItem} accept={this.props.accept} decline={this.props.decline}/>);
                }
            }

            return peeps;
    }
}

class ManagePlayers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      recommendees: [],
      recommenders: [],
      requestsSent: [],
      requestsReceived: [],
      netid: sessionStorage.getItem("netid"),
      addedRec: ""
    };

    if(sessionStorage.getItem("netid") == null){
        this.props.history.push("/login");
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.setRecommendees = this.setRecommendees.bind(this);
    this.setRecommenders = this.setRecommenders.bind(this);
    this.setRequestsReceived = this.setRequestsReceived.bind(this);
    this.setRequestsSent = this.setRequestsSent.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.declineRequest = this.declineRequest.bind(this);
    this.addRecommendee = this.addRecommendee.bind(this);
    this.setAddedRec = this.setAddedRec.bind(this);
    this.addImage = this.addImage.bind(this);
    this.recommend = this.recommend.bind(this);
    this.getRecs = this.getRecs.bind(this);
    this.getReqs = this.getReqs.bind(this);
    
    this.getRecs();
    this.getReqs();
}

getRecs() {
    fetch('http://3.211.82.27:8800/recommenders?netid=' + this.state.netid)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                console.log("Error pulling recommendees");
                return Promise.reject(error);
            }
            console.log(data);
            this.setState({recommendees: data.recommendees});
            this.setState({recommenders: data.recommenders});
        })
        .catch(error => {
            console.error('There was an error!', error);
    });
}

getReqs() {
    fetch('http://3.211.82.27:8800/requests?netid=' + this.state.netid)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                console.log("Error pulling requests");
                return Promise.reject(error);
            }
            console.log(data);
            this.setState({requestsReceived: data.requestsReceived});
            this.setState({requestsSent: data.requestsSent});
        })
        .catch(error => {
            console.error('There was an error!', error);
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

  setRecommendees(newPeeps, netid) {
    this.setState({recommendees: newPeeps});

    const requestOptions = {
        method: 'DELETE',
        body:  JSON.stringify({ "recommender": this.state.netid, "recommendee": netid })
      };
      fetch('http://3.211.82.27:8800/recommenders', requestOptions)
      .then(async response => {
            const data = await response;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                console.log("Error creating request");
                return Promise.reject(error);
            }
           
            this.getRecs(); 
    })
        .catch(error => {
            console.error('There was an error!', error);
            alert("\t\t\t\tThat student can't be deleted. \t\t\t\t\t\t\tPlease try again.");
    });
  }

  setRecommenders(newPeeps, netid) {

    const requestOptions = {
        method: 'DELETE',
        body:  JSON.stringify({ "recommender": netid, "recommendee": this.state.netid })
      };
      fetch('http://3.211.82.27:8800/recommenders', requestOptions)
      .then(async response => {
            const data = await response;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                console.log("Error creating request");
                return Promise.reject(error);
            }
            this.getRecs();
    })  
        .catch(error => {
            console.error('There was an error!', error);
            alert("\t\t\t\tThat student can't be deleted. \t\t\t\t\t\t\tPlease try again.");
    });
  }

  setRequestsSent(newPeeps, netid) {
    this.setState({requestsSent: newPeeps});
  }

  setRequestsReceived(newPeeps, netid) {
    this.setState({requestsReceived: newPeeps});
  }

  setAddedRec(rec) {
    this.setState({addedRec: rec.target.value});
  }

  acceptRequest(netid) {
   const requestOptions = {
    method: 'PUT',
    body:  JSON.stringify({ "sender": netid, "receiver": this.state.netid, "status" : "accept" })
   };
  fetch('http://3.211.82.27:8800/requests', requestOptions)
  .then(async response => {
        const data = await response;

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            console.log("Error creating request");
            return Promise.reject(error);
        }

        this.getRecs();
        this.getReqs();
    })
    .catch(error => {
        console.error('There was an error!', error);
        alert("\t\t\t\t\tAcceptance Failed. \t\t\t\t\t\t\tPlease try again.");
    });
  }

  declineRequest(netid) {
    const requestOptions = {
    method: 'PUT',
    body:  JSON.stringify({ "sender": netid, "receiver": this.state.netid, "status" : "reject" })
  };
  fetch('http://3.211.82.27:8800/requests', requestOptions)
  .then(async response => {
        const data = await response;

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            console.log("Error creating request");
            return Promise.reject(error);
        }
        
        this.getRecs();
        this.getReqs();
  })
    .catch(error => {
        console.error('There was an error!', error);
    });
  }

  addRecommendee(e) {
   var netid = this.state.addedRec;
   if(netid.length < 5 || netid.length > 8) return;
   const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:  JSON.stringify({ "sender": this.state.netid, "receiver": netid })
  };
  fetch('http://3.211.82.27:8800/requests', requestOptions)
  .then(async response => {
        const data = await response;

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            console.log("Error creating request");
            return Promise.reject(error);
        }
        this.getReqs();
    })
    .catch(error => {
        console.error('There was an error!', error);
        alert("That student does not exist. Please try again.");
    }); 
  }

  addImage() {
    return (<img src={Add} />);
  }

  recommend() {
    return(
        <div className="modal-content-container">
        <h4 className="modal-title">Who would you like to send a request to?</h4>
        <input className="modal-input" type="text" placeholder="Enter NetID" onChange={this.setAddedRec} />
        </div>
    );
  }

  render() {

    const { index } = this.state;

    return(
        <div id="Page">
            <div id="page-wrap" className="managePlayers">
              <NavLink to="/players"> 
                <img src={backArrow} className="backButton" />
              </NavLink>
              <div className="wrapper">
                <Tabs value={index} fullWidth onChange={this.handleChange} className="tabs" >
                  <Tab label="People Who Can Play As Me" />
                  <Tab label="Who I Can Play As" />
                </Tabs>
                <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    <div className="slide1">
		      <Container fluid>
			<Row md={1} className="plus-button-container">
                          <Col md={11} className="plus-text-col">
                            <p className="add-player-text"> Add a Player </p>
                          </Col>
                          <Col md={1} className="plus-button-container-col">
                            <Modal buttonClass="plus" image={this.addImage} onHide={this.addRecommendee} content={{header: "Choose Player", content: this.recommend(), exit: "Send Request"}}/>
                          </Col>
                        </Row>
			<Row md={11}>
			  <Col md={12}>
                            <div className="stretchPeople">
                               <RenderPeople people={this.state.recommenders} callback={this.setRecommenders} netid="netid" />
                               <RenderPeople people={this.state.requestsSent} callback={this.setRequestsSent} netid="sender" pending={true}/>
                            </div>
			  </Col>
			</Row>
		      </Container>
                    </div>
                    <div className="slide2">
                      <RenderPeople people={this.state.recommendees} callback={this.setRecommendees} netid="netid"/>
                      <RenderPeople people={this.state.requestsReceived} callback={this.setRequestsReceived} decline={this.declineRequest} accept={this.acceptRequest} netid="sender"/>
                    </div>
                </SwipeableViews>
           </div>
          </div>
        </div>
    );
  }
}

export default ManagePlayers;
