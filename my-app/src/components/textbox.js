import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import "./../css/textbox.css";

class Textbox extends React.Component {

    render() {
         return (
            <div className="form-group">
                <label className="title-text-textbox">{this.props.header}</label>
                <input type="text" className="form-control"  value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.callback}/>
            </div>
        );
    }
}

export default withRouter(Textbox);
