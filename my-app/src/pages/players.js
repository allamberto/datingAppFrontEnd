import React from 'react';
import './../css/players.css';
import ListPlayers from './../components/listings';
import { NavLink } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.manageButton = this.manageButton.bind(this);
  }

  manageButton(badge, num){
    if(badge == "true") {
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

  render() {
    return(
        <div className="players">
            <div className="backdrop">
                <div className="playersList">
                  <ListPlayers message="Play as Me" />
                  <ListPlayers message="Sophie Johnson" />
                  <ListPlayers message="Sabalalbala DingDongMickMomDad" />
                  <ListPlayers message="Ana Luisa Lamberto" />
                </div>
                {this.manageButton("true", "1")}
            </div>
        </div>     
    );
  }
}

export default Players;
