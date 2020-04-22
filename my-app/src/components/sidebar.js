import React from 'react';
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import Logo from '../img/logo.png';
import Browse from '../img/browse.png';
import Chat from '../img/chat.png';
import Settings from '../img/settings.png';
import Logout from '../img/logout.png';
import Rec from '../img/rec.png';
import SidebarOpt from './sOption';
import './../css/sidebar.css';

export default props => {
  return (
    <Menu {...props}>
      <img className="logo" src={Logo} alt="Sidebar Logo"></img>
      <SidebarOpt nav="/browse" message="Browse" badge={false} img={Browse} alt="Sidebar Browse"/>
      <SidebarOpt nav="/chat" message="Message" badge={true} num="4" img={Chat} alt="Sidebar Chat"/>
      <SidebarOpt nav="/players" message="Player Setup" badge={true} num="1" img={Rec} alt="Sidebar Recs"/>
      <SidebarOpt nav="/settings" message="Settings" badge={false} img={Settings} alt="Sidebar Settings"/>
      <SidebarOpt nav="/" message="Logout" badge={false}  img={Logout} alt="Sidebar Logout"/>
    </Menu>
  );
};
