import React, { Component } from "react";
import { NavLink, withRouter} from "react-router-dom";
import "./../css/signup.css";
import StepProgressBar from "./../components/progressbar";
import ImageUpload from './../components/image';
import Textbox from './../components/textbox';
import DynamicButton from './../components/dynamicButton';

class Signup4 extends React.Component {

constructor(props) {
      super(props);

      if(sessionStorage.getItem("netid") == null){
          this.props.history.push("/login");
      }

      var pathOp;
      if(sessionStorage.getItem("settingsNav") == "true") {
        pathOp = "/settings";
      } else {
        pathOp = "/players";
      }

      sessionStorage.setItem("settingsNav", "false");

      this.state = {
	netid: sessionStorage.getItem("netid"),
	profile: "",
        path: pathOp
      }

      this.changePage = this.changePage.bind(this);
      this.setProfile = this.setProfile.bind(this);
    }

    changePage  = (event) => {
      event.preventDefault();
      console.log(this.state.selected);
      const requestOptions = {
            method: 'POST',
	    'Content-Type': 'image/jpeg',
            body: JSON.stringify({
		"image" : this.state.profile
            })
          };
          fetch('http://3.211.82.27:8800/students/'+this.state.netid, requestOptions)
          .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                this.props.history.push(this.state.path);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    } 

    setProfile(target) {
	this.setState({profile: target.dataURL});
    } 

render() {
    var step = (this.state.path != "/settings") ? <StepProgressBar level="75"/> : <div />;
        return (
            <div className="signup">
              <div className="backdrop">
                {step}
                <div className="content-container">
                  <h3>Create Your Profile</h3>
		
		  <h2 className="section-header">Upload Profile Picture</h2>
		  <ImageUpload callback={this.setProfile}/>
		  <hr className="divider" />

		  <h2 className="section-header">Choose a Prompt Question</h2>
		  <Textbox placeholder="Enter prompt Question" header="Your personal question will be answered by each of your matches." className="form-control"/>

		  <hr className="divider" />

		  <h2 className="section-header">Upload Fun Facts</h2>

		  <DynamicButton callback={this.setProfile} />
 
		  <hr className="divider" />

		  <h2 className="section-header">Upload Your Calendar</h2>
		  <input type="file" name="file" />	
	
                  <button type="submit" className="btn btn-primary btn-block" onClick={this.changePage}>Submit</button>

               </div>
              </div>
            </div>
        );
    }
}

export default withRouter(Signup4);
