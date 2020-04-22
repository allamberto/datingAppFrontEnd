import React from 'react';
import SideBar from "./../components/sidebar";
import { Navbar, Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import "./../css/browse.css";
import FunFact from "./../components/funfact";
import Profile from "./../components/profile";
import Prompt from "./../components/prompt";
import Modal from "./../components/modal";

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.Pass = this.Pass.bind(this);
  }

  Pass = (event) => {
      event.preventDefault();
      this.props.history.push("/browse");
  } 

  render() {
    let me = {
        name: "Ana Luisa Lamberto",
        major: "Computer Science",
        minor: "FTT",
        year: "Senior",
        city: "Collingswood",
        state: "NJ",
        dorm: "Lewis"
    };
    return(
      <div id="Page">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} />

       <div id="page-wrap">
            <Navbar bg="dark" variant="dark" className="headerContainer"></Navbar>
            <div className="profile-wrapper">
            <Container fluid>
            <Row className="fill">
              <Col md={4}> 
                <Profile person={me}/> 
                <Prompt question="What's your favorite color?" placeholder="Go Weasels"/>
              </Col>
             <Col md={8}> <CardContainer me={me}/> </Col>
            </Row>
            <Row className="buttons">
                <Col md={6}>
                    <Modal buttonClass="recommendButton" message="Recommend To A Friend" content={recommenderContent}/>
                </Col>
                <Col md={6}>
                    <button onClick={this.Pass} className="passButton"> Not For Me </button>
                </Col>
            </Row>
            </Container>
        </div>
       </div>
      </div>
    );
  }
}

function Recommend() {
    return(
        <div>
        <h4>Who would you like to recommend this domer too?</h4>
        <DropdownButton id="dropdown-item-button" title="Dropdown button">
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else</Dropdown.Item>
        </DropdownButton> 
        </div>
    );
}

let recommenderContent = {
    header: "Send Recommendation",
    content: Recommend(),
    exit: "Send"
};

const CardContainer = (props) => {
  return (
    <div>
      <Container className="cards">
        <Row>
          <Col lg={11}>
            <Row>
              <Col md={6}> <FunFact person={props.me}/> </Col>
              <Col md={6}> <FunFact person={props.me}/> </Col>
              <Col md={6}> <FunFact person={props.me}/> </Col>
              <Col md={6}> <FunFact person={props.me}/> </Col>
              <Col md={6}> <FunFact person={props.me}/> </Col>
              <Col md={6}> <FunFact person={props.me}/> </Col>
              <Col md={6}> <FunFact person={props.me}/> </Col>
              <Col md={6}> <FunFact person={props.me}/> </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Browse;                      
