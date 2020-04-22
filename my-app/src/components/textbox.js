import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import "./../css/textbox.css";

class Textbox extends React.Component {

    render() {
         return (
            <div className="form-group">
                <label>{this.props.header}</label>
                <input type="text" className="form-control"  placeholder={this.props.placeholder}/>
            </div>
        );
    }
}

export default withRouter(Textbox);
