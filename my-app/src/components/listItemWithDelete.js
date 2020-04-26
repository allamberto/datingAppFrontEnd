import React from 'react';
import './../css/listItemWithDelete.css';
import X from './../img/x.png';
import Pending from './../img/tilde.png';
import Check from './../img/check.png';

class ListItemWithDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            netid: this.props.netid
        }

        this.deleteItem = this.deleteItem.bind(this);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
    }

    deleteItem() {
        this.props.callback(this.state.netid);
    }

    accept() { 
        this.props.accept(this.state.netid);
        this.props.callback(this.state.netid);
    }

    decline() { 
        this.props.decline(this.state.netid);
        this.props.callback(this.state.netid);
    }

    render() {
        if(this.props.pending){
        return (
          <div>
            <div className="button-wrapper">
                <h2 className="person-name">{this.props.name}</h2>
                <img src={Pending} className="xes pending" />
            </div>
            <hr className="list-line"/>
          </div>
        );
        } else if (this.props.accept) {
            return(
            <div>
            <div className="button-wrapper">
                <h2 className="person-name">{this.props.name}</h2>
                <img src={X} className="xes" onClick={this.decline}/>
                <img src={Check} className="xes check" onClick={this.accept}/>
            </div>
            <hr className="list-line"/>
          </div>
          );
        } else{
            return (
              <div>
                <div className="button-wrapper">
                    <h2 className="person-name">{this.props.name}</h2>
                    <img src={X} className="xes" onClick={this.deleteItem}/>
                </div>
                <hr className="list-line"/>
              </div>
            );
        }
    }
}

export default ListItemWithDelete;
