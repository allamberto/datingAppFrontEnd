import React from 'react';
import SideBar from "./../components/sidebar";
import { Navbar, Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import "./../css/browse.css";
import FunFact from "./../components/funfact";
import Profile from "./../components/profile";
import Prompt from "./../components/prompt";
import Modal from "./../components/modal";
import Arrow from './../img/upArrow.png';


class CardContainer extends React.Component{
    constructor(props) {
        super(props);
        
        if(this.props.funFacts == undefined) {
            return;
        }
        this.state = {
            funfacts: this.props.funFacts
        }
        this.facts = this.facts.bind(this);
    }

    facts() {
        var facts = [];
        for(var fact of this.props.funFacts){
            facts.push(<FunFact f={fact} />);
        }
                
        return facts;
    }

    render(){
    if(this.props.funFacts == undefined) {
              return null;
          }
    return (
        <div><Container className="cards"><Row><Col lg={11}><Row>
            {this.facts()}
        </Row> </Col></Row></Container></div>
    );}
}

let me = (
    "netid": "alamber2"
);

class Browse extends React.Component {
  constructor(props) {
    super(props);

    if(sessionStorage.getItem("netid") == null){
        this.props.history.push("/login");
    }

    this.state = {
        netid: sessionStorage.getItem("netid"),
        playingAs: sessionStorage.getItem("playingAs"),
        playingAsName: sessionStorage.getItem("playingAsName"),
        person: [],
        viewee: "",
        show: true
    } 

    this.getRecommendation = this.getRecommendation.bind(this);
    this.updateRecommendationInterest = this.updateRecommendationInterest.bind(this);
    this.updateRecommendationPass = this.updateRecommendationPass.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updateProfileInterest = this.updateProfileInterest.bind(this);
    this.updateProfilePass = this.updateProfilePass.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.isEmpty = this.isEmpty.bind(this);

    if(sessionStorage.getItem("netid") == sessionStorage.getItem("playingAs")) {
        this.getRecommendation();
    } else {
        this.getProfile();
    }
 }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
        return true;
  }

  setMessage(e) {
    this.setState({message: e.target.value});
  } 

  getProfile() {
    fetch('http://3.211.82.27:8800/browse?viewFor='+this.state.playingAs+'&viewBy='+this.state.netid)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                this.setState({person: me});
                return Promise.reject(error);
            }

            console.log(data);
            this.setState({person: Object.values(data)});
            this.setState({viewee: data.netid}); 
        })
        .catch(error => {
            this.setState({person: me});
            console.error('There was an error!', error);
        });
  }

  getRecommendation() {
    fetch('http://3.211.82.27:8800/recommendation?netid=' + this.state.netid)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                this.setState({person: me});
                return Promise.reject(error);
            }

            if(this.isEmpty(data)) {
                this.setState({show: false});
            } else {
                this.setState({show: true});
            }

            console.log(data);
            this.setState({person: Object.values(data)});
            this.setState({viewee: data.netid});
        })
        .catch(error => {
            console.error('There was an error!', error);
            this.setState({person: me});
        }); 
  }

  updateRecommendationInterest(interest) {
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify({"viewer": this.state.netid,
                              "viewee": this.state.lookingAt,
                              "status" : "interested",
                              "message": this.state.message 
        })
    };
    fetch('http://3.211.82.27:8800/recommendation', requestOptions)
      .then(async response => {
            const data = await response.json();
            
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                this.setState({person: me});
                return Promise.reject(error);
            } 
            
           this.getRecommendation();          
 
        }) 
        .catch(error => {
            console.error('There was an error!', error);
            this.setState({person: me});
        });
  } 

  updateRecommendationPass(interest) {
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify({"viewer": this.state.netid,
                              "viewee": this.state.lookingAt,
                              "status" : "pass",
                              "message": this.state.message
        })
    };
    fetch('http://3.211.82.27:8800/recommendation', requestOptions)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                this.setState({person: me});
                return Promise.reject(error);
            } 

            this.getRecommendation();
  
        })
        .catch(error => {
            console.error('There was an error!', error);
            this.setState({person: me});
        });
  }

  updateProfileInterest() {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify({"viewedFor": this.state.playingAs,
                              "netid": this.state.lookingAt,
                              "viewedBy" : this.state.netid,
                              "status": "recommend"
        })
    };
    fetch('http://3.211.82.27:8800/recommendation', requestOptions)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                this.setState({person: me});
                return Promise.reject(error);
            }

            this.getProfile();

        })
        .catch(error => {
            this.setState({person: me});
            console.error('There was an error!', error);
        });
  } 

  updateProfilePass() {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify({"viewedFor": this.state.playingAs,
                              "netid": this.state.lookingAt,
                              "viewedBy" : this.state.netid,
                              "status": "pass"
        })
    };
    fetch('http://3.211.82.27:8800/recommendation', requestOptions)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                this.setState({person: me});
                return Promise.reject(error);
            }

            this.getProfile();

        })
        .catch(error => {
            this.setState({person: me});
            console.error('There was an error!', error);
        });
  }

  render() {
    console.log(this.state.person);
    if(this.state.show && this.state.playingAs == this.state.netid){
        return(
          <div id="Page">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} />

           <div id="page-wrap">
                <Navbar bg="dark" variant="dark" className="headerContainer"></Navbar>
                <div className="profile-wrapper">
                <Container fluid>
                <Row className="fill">
                  <Col md={4}> 
                    <Profile person={this.state.person}/> 
                    <Prompt question={this.state.person[9]} placeholder="Reply!" callback={this.setMessage} buttonCallback={this.updateRecommendationInterest}/>
                  </Col>
                 <Col md={8}> <CardContainer funFacts={this.state.person[11]}/> </Col>
                </Row>
                <Row className="buttons">
                    <Col md={6}>
                    </Col>
                    <Col md={6}>
                        <button onClick={this.updateRecommendationPass} className="passButton">
                            <p className="notMeButtonText">Not For Me</p>
                            <img src={Arrow} className="notMeButtonArrow" />
                        </button>
                    </Col>
                </Row>
                </Container>
            </div>
           </div>
          </div>
        );
    } else if (!this.state.show){
        return (
          <div id="Page">
           <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} />
 
            <div id="page-wrap">
                 <Navbar bg="dark" variant="dark" className="headerContainer"></Navbar>
                 <div className="profile-wrapper">
            
                    <h1>You have no new recommendations right now. Ask your friends to recommend more people for you!</h1>
                </div>
            </div>
          </div>
        );
    } else {
        return(
          <div id="Page">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} limited={true}/>

           <div id="page-wrap">
                <Navbar bg="dark" variant="dark" className="headerContainer"></Navbar>
                <div className="profile-wrapper">
                <Container fluid>
                <Row className="fill">
                  <Col md={4}>
                    <Profile person={this.state.person}/>
                    <Row className="buttons">
                        <Col md={6} className="button1Col">
                             <button onClick={this.updatProfileInterest} className="recommendButtonHigher">Recommend To {"\n"}{this.state.playingAsName}</button>
                        </Col>
                        <Col md={6} className="button1Col">
                            <button onClick={this.updatProfilePass} className="passButton passButtonNotMe">
                                <p className="notMeButtonText">Not For {"\n"}{this.state.playingAsName}</p>
                             </button>
                        </Col>
                    </Row>
                  </Col>
                 <Col md={8}> <CardContainer funFacts={this.state.person[11]}/> </Col>
                </Row>
              </Container>
            </div>
           </div>
          </div>
        );
    }
  }
}


export default Browse;
