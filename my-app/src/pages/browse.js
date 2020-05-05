import React from 'react';
import TJ from "./../img/TJ.png";
import SideBar from "./../components/sidebar";
import { Container, Row, Col, Form, OverlayTrigger, Tooltip} from 'react-bootstrap';
import "./../css/browse.css";
import "./../css/prompt.css";
import FunFact from "./../components/funfact";
import Profile from "./../components/profile";
import Arrow from './../img/upArrow.png';
import Filter from './../img/filter.png';
import LunchIcon from './../img/lunch.png';
import BookIcon from './../img/book.png';
import ChurchIcon from './../img/church.png';
import DanceIcon from './../img/dance.png';
import CustomDropdown from './../components/customDropdown';
import Alert from './../components/alertError';

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
            facts.push(
              <Col md={6}>
              <FunFact f={fact} />
              </Col>
            );
        }

        return facts;
    }

    render(){
    if(this.props.funFacts == undefined) {
              return null;
          }
    return (
        <div><Container className="cards"><Row><Col lg={12}><Row>
            {this.facts()}
        </Row> </Col></Row></Container></div>
    );}
}

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
        lookingAt: "",
        show: true,
      	showMessage: "",
      	isMenuOpened: true,
      	stateFilter: "",
      	yearFilter: "",
      	majorFilter: "",
      	minorFilter: "",
      	dormFilter: "",
        dateFilter: false,
        filtersOpen: false,
        recommendedBy: "",
        toAlert: false,
        alertMessage: "",
        lunches: 0,
        courses: 0,
        mass: false,
        danceInvite: false
    }

    this.getRecommendation = this.getRecommendation.bind(this);
    this.updateRecommendationInterest = this.updateRecommendationInterest.bind(this);
    this.updateRecommendationPass = this.updateRecommendationPass.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updateProfileInterest = this.updateProfileInterest.bind(this);
    this.updateProfilePass = this.updateProfilePass.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.setStateFilter = this.setStateFilter.bind(this);
    this.setYearFilter = this.setYearFilter.bind(this);
    this.setMajorFilter = this.setMajorFilter.bind(this);
    this.setMinorFilter = this.setMinorFilter.bind(this);
    this.setDormFilter = this.setDormFilter.bind(this);
    this.reloadWithFilters = this.reloadWithFilters.bind(this);
    this.expandFilters = this.expandFilters.bind(this);
    this.sendAlert = this.sendAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);

    if(sessionStorage.getItem("netid") == sessionStorage.getItem("playingAs")) {
        this.getRecommendation();
    } else {
        this.getProfile();
    }
 }

  componentWillMount() {
    // sets the initial state
    this.setState({
      isMenuOpened: false
    });
  }

  setStateFilter(e) {
      this.setState({stateFilter: e.value});
  }

  setYearFilter(e) {
      this.setState({yearFilter: e.value});
  }

  setMajorFilter(e) {
      this.setState({majorFilter: e.value});
  }

  setMinorFilter(e) {
      this.setState({minorFilter: e.value});
  }

  setDormFilter(e) {
      this.setState({dormFilter: e.value});
  }

  sendAlert(message) {
      this.setState({toAlert: true});
      this.setState({alertMessage: message});
  }

  closeAlert() {
     this.setState({toAlert: false});
  }

  reloadWithFilters(e) {
    var whatToFetch = 'http://3.211.82.27:8800/browse?viewFor='+this.state.playingAs+'&viewBy='+this.state.netid;
    if (this.state.yearFilter != "") whatToFetch += '&gradyear=' + this.state.yearFilter;
    if (this.state.majorFilter != "") whatToFetch += '&major=' + this.state.majorFilter;
    if (this.state.minorFilter != "") whatToFetch += '&minor=' + this.state.minorFilter;
    if (this.state.dormFilter != "") whatToFetch += '&dorm=' + this.state.dormFilter;
    if (this.state.stateFilter != "") whatToFetch += '&state=' + this.state.stateFilter;

    fetch(whatToFetch)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                this.sendAlert("The page couldn't be reloaded. Please try again.");
	        return Promise.reject(error);
            }

	    if(this.isEmpty(data)) {
                this.setState({show: false});
		this.setState({showMessage: "There is no one that fits that description. Try different filter settings!"});
		return;
            } else {
                this.setState({show: true});
            }

            this.setState({person: Object.values(data)});
            this.setState({lookingAt: data.netid});
        })
        .catch(error => {
            console.error('Filter couldnt reload page!', error);
            this.sendAlert("The page couldn't be reloaded. Please try again.");
	});
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
                return Promise.reject(error);
            }

	   if(this.isEmpty(data)) {
                this.setState({show: false});
		this.setState({showMessage: "There are no people left to browse."});
		return;
            } else {
                this.setState({show: true});
            }

            this.setState({person: Object.values(data)});
            this.setState({lookingAt: data.netid});
        })
        .catch(error => {
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
		            console.log("Getting Next Person Failed");
                return Promise.reject(error);
            }

            if(this.isEmpty(data)) {
                this.setState({show: false});
                this.setState({ lunches       : 0,
                                courses       : 0,
                                mass          : false,
                                danceInvite   : false});
		this.setState({showMessage: "You have no new recommendations right now. Ask your friends to recommend more people for you!"});
		return;
            } else {
                this.setState({show: true});
            }

            this.setState({ person        : Object.values(data),
                            lookingAt     : data.netid,
                            recommendedBy : data.recommendedBy,
                            lunches       : data.lunches,
                            courses       : data.courses,
                            mass          : data.mass,
                            danceInvite   : data.danceInvite});
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }

  updateRecommendationInterest(e) {
    e.preventDefault();

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
            const data = await response;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
		              console.log("Error getting next match");
                return Promise.reject(error);
            }

          this.getRecommendation();

        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }

  updateRecommendationPass(e) {
    e.preventDefault();

    const requestOptions = {
        method: "PUT",
        body: JSON.stringify({"viewer": this.state.netid,
                              "viewee": this.state.lookingAt,
                              "status" : "pass"
        })
    };
    fetch('http://3.211.82.27:8800/recommendation', requestOptions)
      .then(async response => {
            const data = await response;
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
		            console.log("Error getting next match");
                this.sendAlert("There was an error recording your response. Please try again.");
                return Promise.reject(error);
            }

            this.getRecommendation();

        })
        .catch(error => {
            console.error('There was an error!', error);
            this.sendAlert("There was an error recording your response. Please try again.");
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
    fetch('http://3.211.82.27:8800/browse', requestOptions)
      .then(async response => {
            const data = await response;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            this.getProfile();

        })
        .catch(error => {
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
    fetch('http://3.211.82.27:8800/browse', requestOptions)
      .then(async response => {
            const data = await response;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                this.sendAlert("There was an error recording your response. Please try again.");
                return Promise.reject(error);
            }

	           this.getProfile();

        })
        .catch(error => {
            this.sendAlert("There was an error recording your response. Please try again.");
            console.error('There was an error!', error);
        });
  }

  handleClick() {
    // toggles the menu opened state
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

  expandFilters() {
    this.setState({ filtersOpen: !this.state.filtersOpen });
  }

  render() {
    if(this.state.show && this.state.playingAs == this.state.netid){
        return(
          <div id="Page">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} />

           <div id="page-wrap">
           <Alert message={this.state.alertMessage} toAlert={this.state.toAlert} closeCallback={this.closeAlert}/>
           <div className="headerContainer recommended-by">
            <h4 className="recommendby-header">
            {
              this.state.danceInvite > 0 &&
              <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip>Looking for a dance date!</Tooltip>}>
              <img className="header-icon" src={DanceIcon} alt=""/>
              </OverlayTrigger>
            }
            {
              this.state.lunches > 0 &&
              <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip><strong>{this.state.lunches}</strong> lunch{this.state.lunches > 1 && 'es'} together!</Tooltip>}>
              <img className="header-icon" src={LunchIcon} alt=""/>
              </OverlayTrigger>
            }
            {
              this.state.courses > 0 &&
              <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip><strong>{this.state.courses}</strong> course{this.state.courses > 1 && 's'} together!</Tooltip>}>
              <img className="header-icon" src={BookIcon} alt=""/>
              </OverlayTrigger>
            }
            {
              this.state.mass &&
              <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip>Also attends mass regularly!</Tooltip>}>
              <img className="header-icon" src={ChurchIcon} alt=""/>
              </OverlayTrigger>
            }
            Recommended by {this.state.recommendedBy}
            </h4>
            </div>

              <div className="profile-wrapper">
                <Container fluid>
                <Row className="fill">
                  <Col md={4}>
                    <Profile person={this.state.person}/>
                    <Form onSubmit={this.updateRecommendationInterest}>
                    <div className="prompt-container">
                      <Form.Group controlId="prompt.Textarea">
                        <Form.Control as="textarea" rows="2" placeholder={this.state.person[9]} className="question-response" onChange={this.setMessage}/>
                      </Form.Group>
                      <Row>
                      <Col md={6}>
                      <button className="promptButton" onClick={this.updateRecommendationInterest}>
                        <p className="buttonMessage">Send Message</p>
                        <img src={TJ} className="tjImage" alt=""/>
                      </button>
                      </Col>
                      <Col md={6}>
                      <button onClick={this.updateRecommendationPass} className="passButton">
                          Not For Me
                          <img src={Arrow} className="notMeButtonArrow" alt=""/>
                      </button>
                      </Col>
                      </Row>
                    </div>
                    </Form>

                  </Col>
                 <Col md={8}> <CardContainer funFacts={this.state.person[11]}/> </Col>
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
                 <div className="headerContainer">
		               <Container fluid >
                    <Row className="navbar-dropdown-container">
                      <Col md={2}>{this.state.filtersOpen && <CustomDropdown filter={true} className="overall header-dropdown" ops="states" placeholder="State" value={this.state.stateFilter} callback={this.setStateFilter}/>}</Col>
                      <Col md={2}>{this.state.filtersOpen && <CustomDropdown filter={true} className="overall header-dropdown" ops="years" placeholder="Grad Year" value={this.state.yearFilter} callback={this.setYearFilter}/>}</Col>
                      <Col md={2}>{this.state.filtersOpen && <CustomDropdown filter={true} className="overall header-dropdown" ops="dorms" placeholder="Dorm" value={this.state.dormFilter} callback={this.setDormFilter}/>}</Col>
                      <Col md={2}>{this.state.filtersOpen && <CustomDropdown filter={true} className="overall header-dropdown" ops="majors" placeholder="Major" value={this.state.majorFilter} callback={this.setMajorFilter}/>}</Col>
                      <Col md={2}>{this.state.filtersOpen && <CustomDropdown filter={true} ops="minors" className="overall header-dropdown" placeholder="Minor" value={this.state.minorFilter} callback={this.setMinorFilter}/>}</Col>
                    <Col md={2}>
                      {this.state.filtersOpen &&
                      <div className="filter-div"  onClick={this.reloadWithFilters}>
                			    <p className="submit-filter-text">Apply Filters</p>
                			</div>
                      }
                      <div className="filter-toggle float-right"  onClick={this.expandFilters}>
                          <img className="submit-filter-button" src={Filter} alt=""/>
                      </div>
                    </Col>
                   </Row>
                 </Container>
		             </div>
                 <div className="profile-wrapper">
                    <h1 className="nothing-message">{this.state.showMessage}</h1>
                </div>
            </div>
          </div>
        );
    } else {
        return(
          <div id="Page">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} limited={true}/>

           <div id="page-wrap">
		<div className="headerContainer">
		  <Container fluid >
        <Row className="navbar-dropdown-container">
        <Col md={2}>{this.state.filtersOpen && <CustomDropdown filter={true} className="overall header-dropdown" ops="states" placeholder="State" value={this.state.stateFilter} callback={this.setStateFilter}/>}</Col>
        <Col md={2}>{this.state.filtersOpen && <CustomDropdown filter={true} className="overall header-dropdown" ops="years" placeholder="Grad Year" value={this.state.yearFilter} callback={this.setYearFilter}/>}</Col>
        <Col md={2}>{this.state.filtersOpen && <CustomDropdown filter={true} className="overall header-dropdown" ops="dorms" placeholder="Dorm" value={this.state.dormFilter} callback={this.setDormFilter}/>}</Col>
        <Col md={2}>{this.state.filtersOpen && <CustomDropdown filter={true} className="overall header-dropdown" ops="majors" placeholder="Major" value={this.state.majorFilter} callback={this.setMajorFilter}/>}</Col>
        <Col md={2}>{this.state.filtersOpen && <CustomDropdown filter={true} ops="minors" className="overall" placeholder="Minor" value={this.state.minorFilter} callback={this.setMinorFilter}/>}</Col>
		    <Col md={2}>
        {this.state.filtersOpen &&
        <div className="filter-div"  onClick={this.reloadWithFilters}>
  			    <p className="submit-filter-text">Apply Filters</p>
  			</div>
        }
        <div className="filter-toggle float-right"  onClick={this.expandFilters}>
            <img className="submit-filter-button" src={Filter} alt=""/>
        </div>
		    </Col>
         </Row>
       </Container>
		</div>

              <div className="profile-wrapper">
                <Container fluid>
                <Row className="fill">
                  <Col md={4}>
                    <Profile person={this.state.person}/>
                    <Row className="buttons">
                        <Col md={6} className="button1Col">
                             <button onClick={this.updateProfileInterest} className="recommendButtonHigher">Recommend To {"\n"}{this.state.playingAsName}
                             </button>
                        </Col>
                        <Col md={6} className="button1Col">
                            <button  onClick={this.updateProfilePass} className="passButton passButtonNotMe">
                                Not For {"\n"}{this.state.playingAsName}
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
