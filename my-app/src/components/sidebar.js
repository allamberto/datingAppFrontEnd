import React from 'react';
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import Logo from '../img/logo-2.png';
import Browse from '../img/browse.png';
import Chat from '../img/chat.png';
import Settings from '../img/settings.png';
import Logout from '../img/logout.png';
import Rec from '../img/rec.png';
import SidebarOpt from './sOption';
import './../css/sidebar.css';

class Sidebar extends React.Component {
 
  render() {
	  var playersBadge = sessionStorage.getItem("manageBadge") != 0;
	  var numPlayers = sessionStorage.getItem("manageBadge");
	  if(!this.props.limited) {
	      return (
		<Menu {...this.props}>
		  <img className="logo" src={Logo} alt="Sidebar Logo"></img>
		  <SidebarOpt nav="/browse" message="Browse" badge={false} img={Browse} alt="Sidebar Browse"/>
		  <SidebarOpt nav="/players" message="Player Setup" badge={playersBadge} num={numPlayers} img={Rec} alt="Sidebar Recs"/>
		  <SidebarOpt nav="/chat" message="Message" badge={false} num="4" img={Chat} alt="Sidebar Chat"/>
		  <SidebarOpt nav="/settings" message="Settings" badge={false} img={Settings} alt="Sidebar Settings"/>
		  <SidebarOpt nav="/" message="Logout" badge={false}  img={Logout} alt="Sidebar Logout" logout={true}/>
		  <div className="bottom-sidebar" />
		</Menu>
	      );
	  } else {
	    return (
		<Menu {...this.props}>
		  <img className="logo" src={Logo} alt="Sidebar Logo"></img>
		  <SidebarOpt nav="/browse" message="Browse" badge={false} img={Browse} alt="Sidebar Browse"/>
		  <SidebarOpt nav="/players" message="Player Setup" img={Rec} alt="Sidebar Recs"/>
		  <SidebarOpt nav="/" message="Logout" badge={false}  img={Logout} alt="Sidebar Logout" logout={true}/>
		</Menu>
	    );
	  }
	};
}

export default Sidebar;
