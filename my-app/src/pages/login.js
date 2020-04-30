import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import Creds from './../components/creds';
import "./../css/login.css";
import Rec from './../img/recommend.png';

export default class Login extends React.Component {

render() {
        return (
          <div className="login">  
            <img src={Rec} className="logo-top" />
               <div className="auth-wrapper">
                <div className="auth-inner">
                    <Creds login={true} create={false} header="Sign In" path="/players" />
                </div>
            </div>
          </div>
        );
    }
}
