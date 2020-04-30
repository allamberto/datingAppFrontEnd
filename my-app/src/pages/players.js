import React from 'react';
import './../css/players.css';
import ListPlayers from './../components/listings';
import { NavLink } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

class Players extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        netid: sessionStorage.getItem("netid"),
        recommendees: [],
        num: 0
    };

    if(sessionStorage.getItem("netid") == null){
        this.props.history.push("/login");
    }
    
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
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

    fetch('http://3.211.82.27:8800/requests?netid=' + this.state.netid)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                console.log("Error pulling recommendees");
                return Promise.reject(error);
            }
            console.log(data.requestsReceived.length);
            this.setState({num: data.requestsReceived.length});
            sessionStorage.setItem("manageBadge", data.requestsReceived.length);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

    this.manageButton = this.manageButton.bind(this);
  }

  manageButton(badge, num){
    if(badge) {
      return (
        <NavLink to="/managePlayers">
          <div className="manageButton">
            <p className="manageText">Manage Players</p>
            <Badge pill variant="danger" className="badge">{num}</Badge>{' '}
          </div>
        </NavLink>
      );
    } else {
      return (
        <NavLink to="/managePlayers">
          <div className="manageButton">
            <p className="manageText">Manage Players</p>
          </div>
        </NavLink>
      );
    }
  }

  loadPeople() {
    var people = [];
    people.push(<ListPlayers playingAs={this.state.netid} message="Play as Me" />);
    
    for(var r of this.state.recommendees) {
        var name = r.firstName + " " + r.lastName;
        people.push(<ListPlayers playingAs={r.netid} playingAsName={r.firstName} message={name} />);
    }

    return people; 
  }

  render() {
    return(
        <div className="players">
            <div className="backdrop">
                <div className="playersList">
                    {this.loadPeople()}
                </div>
                {this.manageButton(this.state.num != 0, this.state.num)}
            </div>
        </div>     
    );
  }
}

export default Players;
