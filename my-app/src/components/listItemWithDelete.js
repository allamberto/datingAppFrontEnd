import React from 'react';
import './../css/listItemWithDelete.css';
import X from './../img/x.png';

class ListItemWithDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }

        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem() {
        this.props.callback(this.state.name);
    }

    render() {
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

export default ListItemWithDelete;
