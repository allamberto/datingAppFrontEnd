import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import backArrow from './../img/upArrow.png'
import './../css/managePlayers.css';

class managePlayers extends React.Component {
    render() {
        return(
        <div className="managePlayers">
        <Container className="manageContainer" fluid={true}>
          <Row>
            <Col md={2}>
              <NavLink to="/players"> 
                <img src={backArrow} className="backButton" />
              </NavLink>
            </Col>
            <Col className="iPlayColumn" md={5}>
              <h2 className="iPlayText"> Domers Who Can Play As You </h2>
            </Col>
            <Col className="theyPlayColumn" md={5}>
              <h2 className="theyPlayText"> Domers You Can Play As </h2>
            </Col>
          </Row>
          <Row className="fillHeight">
            <Col md={5} className="iPlayColumnDown">
                
            </Col>
            <Col md={5} className="theyPlayColumnDown">
                
            </Col>
          </Row>
        </Container>
        </div>
        );
    }
}

export default managePlayers;
