import React from 'react';
import SideBar from "./../components/sidebar";
import { Navbar, Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import "./../css/browse.css";
import FunFact from "./../components/funfact";
import Profile from "./../components/profile";
import Prompt from "./../components/prompt";
import Modal from "./../components/modal";
import Arrow from './../img/upArrow.png';
import Filter from './../img/filter.png';
import rightArrow from './../img/rightArrow.png';
import collapseNav from './../components/collapseNav';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import CustomDropdown from './../components/customDropdown';

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
	dateFilter: false
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
                return Promise.reject(error);
            }

            console.log(data);

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
            console.error('There was an error!', error);
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

	    console.log(data);
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
                return Promise.reject(error);
            }

            if(this.isEmpty(data)) {
                this.setState({show: false});
		this.setState({showMessage: "You have no new recommendations right now. Ask your friends to recommend more people for you!"});
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

  updateRecommendationInterest(interest) {
    console.log(this.state.netid, this.state.lookingAt, this.state.message);
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
                return Promise.reject(error);
            }

          this.getRecommendation();

        })
        .catch(error => {
            console.error('There was an error!', error);
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
            const data = await response;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            this.getRecommendation();

        })
        .catch(error => {
            console.error('There was an error!', error);
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
    console.log(this.state.playingAs + this.state.lookingAt + this.state.netid);
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
                return Promise.reject(error);
            }

	    this.getProfile();

        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }

  handleClick() {
    // toggles the menu opened state
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

  render() {
    if(this.state.show && this.state.playingAs == this.state.netid){
        return(
          <div id="Page">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} />

           <div id="page-wrap">
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
                 <Navbar bg="dark" variant="dark" className="headerContainer">
		               <Container fluid >
                    <Row className="navbar-dropdown-container">
                      <Col md={2}><CustomDropdown filter={true} className="overall" ops="states" placeholder="Filter by State" value={this.state.stateFilter} callback={this.setStateFilter}/></Col>
                      <Col md={2}><CustomDropdown filter={true} className="overall" ops="years" placeholder="Filter by Year" value={this.state.yearFilter} callback={this.setYearFilter}/></Col>
                      <Col md={2}><CustomDropdown filter={true} className="overall" ops="dorms" placeholder="Filter by Dorm" value={this.state.dormFilter} callback={this.setDormFilter}/></Col>
                      <Col md={2}><CustomDropdown filter={true} className="overall" ops="majors" placeholder="Filter by Major" value={this.state.majorFilter} callback={this.setMajorFilter}/></Col>
                      <Col md={2}><CustomDropdown filter={true} ops="minors" className="overall" placeholder="Filter by Minor" value={this.state.minorFilter} callback={this.setMinorFilter}/></Col>
                    <Col md={2}>
                        <div className="filter-div"  onClick={this.reloadWithFilters}>
                            <p className="submit-filter-text">Update</p>
                            <img className="submit-filter-button" src={Filter} />
                        </div>
                    </Col>
                   </Row>
                 </Container>
		             </Navbar>
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
		<Navbar bg="dark" variant="dark" className="headerContainer">
		  <Container fluid >
        <Row className="navbar-dropdown-container">
        <Col md={2}><CustomDropdown filter={true} className="overall" ops="states" placeholder="State" value={this.state.stateFilter} callback={this.setStateFilter}/></Col>
        <Col md={2}><CustomDropdown filter={true} className="overall" ops="years" placeholder="Grad Year" value={this.state.yearFilter} callback={this.setYearFilter}/></Col>
        <Col md={2}><CustomDropdown filter={true} className="overall" ops="dorms" placeholder="Dorm" value={this.state.dormFilter} callback={this.setDormFilter}/></Col>
        <Col md={2}><CustomDropdown filter={true} className="overall" ops="majors" placeholder="Major" value={this.state.majorFilter} callback={this.setMajorFilter}/></Col>
        <Col md={2}><CustomDropdown filter={true} ops="minors" className="overall" placeholder="Minor" value={this.state.minorFilter} callback={this.setMinorFilter}/></Col>
		    <Col md={2}>
  			<div className="filter-div"  onClick={this.reloadWithFilters}>
  			    <p className="submit-filter-text">Filter</p>
  			    <img className="submit-filter-button" src={Filter} />
  			</div>
		    </Col>
         </Row>
       </Container>
		</Navbar>

              <div className="profile-wrapper">
                <Container fluid>
                <Row className="fill">
                  <Col md={4}>
                    <Profile person={this.state.person}/>
                    <Row className="buttons">
                        <Col md={6} className="button1Col">
                             <button onClick={this.updateProfileInterest} className="recommendButtonHigher">Recommend To {"\n"}{this.state.playingAsName}</button>
                        </Col>
                        <Col md={6} className="button1Col">
                            <button onClick={this.updateProfilePass} className="passButton passButtonNotMe">
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
