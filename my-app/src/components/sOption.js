import Badge from 'react-bootstrap/Badge'
import React from 'react';
import { NavLink } from "react-router-dom";
import "./../css/sidebar.css";

export default class SidebarOption extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    if(this.props.badge) {
      return (
        <NavLink to={this.props.nav}>
          <div className="container">
            <p className="menu-text" activeClassName="active">{this.props.message}</p>
            <Badge pill variant="danger" className="badge">{this.props.num}</Badge>{' '}
          </div>
        <img className="sub-logo" src={this.props.img} alt={this.props.alt}></img></NavLink>
      );
    } else {
      return (
        <NavLink to={this.props.nav}>
          <div className="container">
            <p className="menu-text" activeClassName="active">{this.props.message}</p>
          </div>
        <img className="sub-logo" src={this.props.img} alt={this.props.alt}></img></NavLink>
      );
    }
  }
}
