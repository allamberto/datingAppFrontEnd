import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Creds from './../components/creds';
import "./../css/signup.css";
import StepProgressBar from "./../components/progressbar";

export default class Signup1 extends React.Component {

render() {
        sessionStorage.setItem("settingsNav", "false");
        return (
            <div className="signup">
              <div className="backdrop">
                <StepProgressBar level="5"/>
                <div className="content-container">
                    <Creds login={false} create={true} header="Create An Account" path="/signup_2" />
                </div>
              </div>
            </div>
        );
    }
}
