import React from 'react';
import './../css/listing.css';
import Arrow from './../img/rightArrow.png';
import { Button } from 'react-bootstrap';
import { withRouter} from 'react-router-dom';

class Listings extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
      e.preventDefault();
      sessionStorage.setItem("playingAs", this.props.playingAs);
      sessionStorage.setItem("playingAsName", this.props.playingAsName); 
      this.props.history.push("/browse");
    }

    render() {
         return (
            <div>
                <Button variant="link" className="list-container" onClick={this.handleClick}>
                  <h2 className="list">{this.props.message}</h2>
                  <img src={Arrow} className="button" activeClassName="active"></img>
                </Button>
                <hr className="line"></hr>
            </div>
        );
    }
}

export default withRouter(Listings);
