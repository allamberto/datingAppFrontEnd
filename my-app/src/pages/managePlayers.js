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
import Modal from './../components/modal';

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
            if(people[i]['name'] == name) {
                people.splice(i, 1);
                break;
            }
        }

        this.setState({ people });
    }

    render() {
            var peeps = [];
            for(var p of this.props.people) {
                peeps.push(<ListItemWithDelete name={p['name']} callback={this.deleteItem}/>);
            }

            return peeps;
    }
}

class ManagePlayers extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.loadPeople = this.loadPeople.bind(this);
    this.renderPeople = this.renderPeople.bind(this);
    this.addImage = this.addImage.bind(this);
    this.recommend = this.recommend.bind(this);

    this.state = {
      index: 0,
      people: []
    };
  }

  componentDidMount() {
    this.loadPeople();
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

  loadPeople() {
    const { people } = this.state;
    people.push({name: "Ana Luisa Lamberto"});
    people.push({name: "Sophie Johnson"});
    people.push({name: "Mark Beach"});
    people.push({name: "Taylor Mealey"});
    people.push({name: "Michael Erdenberger"});
    people.push({name: "Henry Ridder"});
    people.push({name: "Darrell Adams"});
    people.push({name: "Katie Garvey"});
    this.setState({ people });
    console.log(people);
  }

  renderPeople() {
    var peeps = [];     
    for(var p of this.state.people) {
        peeps.push(<ListItemWithDelete name={p['name']} callback={this.deleteItem}/>);
    }

    console.log(peeps);
    return peeps;
  }

  deleteItem(name) {
    const { people } = this.state;
    for(var p of people) {
        if(p['name'] == name) {
            people.splice(people.indexOf(p), 1);
        }
    }

    this.setState({ people });
  }

  addImage() {
    return (<img src={Add} />);
  }

  recommend() {
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
                      <div className="stretchPeople">
                       <RenderPeople people={this.state.people} />
                      </div>
                      <p className="add-player-text"> Add a Player </p>
                      <Modal buttonClass="plus" image={this.addImage} content={{header: "Choose Player", content: this.recommend, exit: "Send Request"}}/>
                    </div>
                    <div className="slide2">
                    </div>
                </SwipeableViews>
           </div>
          </div>
        </div>
    );
  }
}

export default ManagePlayers;
