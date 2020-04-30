import React, { Component } from "react";
import { NavLink, withRouter} from "react-router-dom";
import "./../css/signup.css";
import "./../css/signup_4.css";
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
	promptQ: "",
	funfacts: [],
	funfactImages: [],
	calendar: "",
	oldFunfacts: [],
        path: pathOp
      }

      this.changePage = this.changePage.bind(this);
      this.setProfile = this.setProfile.bind(this);
      this.setPrompt = this.setPrompt.bind(this);
      this.setFunfacts = this.setFunfacts.bind(this);
      this.setFileFunfacts = this.setFileFunfacts.bind(this);
      this.setCalendar = this.setCalendar.bind(this);
      this.setDeleteFunfact = this.setDeleteFunfact.bind(this);
}

componentDidMount() {
	fetch('http://3.211.82.27:8800/students/'+this.state.netid)
          .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

		this.setState({promptQ: data.question});
            })
            .catch(error => {
                console.error('There was an error with profile pic!', error);
            });

	fetch('http://3.211.82.27:8800/funfacts/'+this.state.netid)
          .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log(data);
                this.setState({oldFunfacts: data});
            })
            .catch(error => {
                console.error('There was an error with fun facts!', error);
            });
}

    changePage  = (event) => {

      console.log(this.state.netid);
      console.log(this.state.funfacts);
      console.log(this.state.funfactImages);
      console.log(this.state.profile);
      console.log(this.state.promptQ);
      console.log(this.state.calendar);
      event.preventDefault();

      if(this.state.profile != "") {
          const requestOptionsProfilePic = {
            method: 'POST',
	    headers: { 'Content-Type': 'image/jpeg' },
            body: this.state.profile
          };
          fetch('http://3.211.82.27:8800/students/'+this.state.netid, requestOptionsProfilePic)
          .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
	    })
            .catch(error => {
                console.error('There was an error with profile pic!', error);
            });
	}

	for(var idx = 0; idx < this.state.funfacts.length; idx++) {
     if(this.state.funfacts[idx] != "") {
         const requestOptionsFunfacts = {
            method: 'POST',
            headers: { 'Content-Type': 'image/jpeg' },
            body: this.state.funfactImages[idx]

          };
          fetch('http://3.211.82.27:8800/funfacts/'+this.state.netid+"?caption="+this.state.funfacts[idx], requestOptionsFunfacts)
          .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            })
            .catch(error => {
                console.error('There was an error with funfacts!', error);
            });
      }
	}

	const requestOptionsPrompts = {
	    method: 'PUT',
	    body: JSON.stringify({"question" : this.state.promptQ})
	  };
	  fetch('http://3.211.82.27:8800/students/'+this.state.netid, requestOptionsPrompts)
	  .then(async response => {
		const data = await response.json();

		// check for error response
		if (!response.ok) {
		    // get error message from body or default to response status
		    const error = (data && data.message) || response.status;
		    return Promise.reject(error);
		}

	     })
	    .catch(error => {
		console.error('There was an error !', error);
	    });

	if(this.state.calendar != "") {
	  const requestOptionsCalendar = {
	    method: 'POST',
	    body: this.state.calendar

	  };
	  fetch('http://3.211.82.27:8800/schedules/'+this.state.netid, requestOptionsCalendar)
	  .then(async response => {
		const data = await response.json();

		// check for error response
		if (!response.ok) {
		    // get error message from body or default to response status
		    const error = (data && data.message) || response.status;
		    return Promise.reject(error);
		}

	    })
	    .catch(error => {
		console.error('There was an error!', error);
	    });
	}

    this.props.history.push(this.state.path);
  }

    setProfile = (event) => {
	console.log(event.target.files[0]);
	this.setState({profile: event.target.files[0]});
    }

   setPrompt(e) {
	this.setState({promptQ: e.target.value});
   }

   setFunfacts(target, num) {
   	const { funfacts } = this.state;
	funfacts[num - 1] = target;
	this.setState({ funfacts });
   }

   setFileFunfacts(target, num) {
	const { funfactImages } = this.state;
        funfactImages[num - 1] = target.files[0];
        this.setState({ funfactImages });
   }

   setCalendar(e) {
	this.setState({calendar: e.target.files[0]});
   }

   setDeleteFunfact(id) {
	   var { oldFunfacts } =  this.state;
        for(var i = 0; i < oldFunfacts.length; i++) {
            if(oldFunfacts[i]['id'] == id) {
                oldFunfacts.splice(i, 1);
                break;
            }
        }

      const requestOptions = {
        method: 'DELETE'
      }
      fetch('http://3.211.82.27:8800/funfacts/'+this.state.netid+'/'+id, requestOptions)
      .then(async response => {
           const data = await response;

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

            this.setState({ oldFunfacts });
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
   }

render() {
    var step = (this.state.path != "/settings") ? <StepProgressBar level="75"/> : <div />;
        return (
            <div className="signup">
              <div className="backdrop">
                {step}
                <div className="content-container">
                  <h3>Create Your Profile</h3>

		  <h2 className="section-header">Step 1: Upload Profile Picture</h2>
		  <input type="file" className="file-input" onChange={this.setProfile}/>
		  <hr className="divider" />

		  <h2 className="section-header">Step 2: Choose a Prompt Question</h2>
		  <p className="section-subfont">Each of your matches will answer your question in order to chat with you.</p>
		  <input placeholder="Enter Prompt Question" defaultValue={this.state.promptQ} className="form-control prompt-control" onChange={this.setPrompt}/>

		  <hr className="divider" />

		  <h2 className="section-header">Step 3: Choose Your Fun Facts</h2>
		  <p className="section-subfont">Your facts tell your matches more about you: hobbies, travels, memories. Each fun fact is accompanied by a photo. We recommend supplying four.</p>
		  <DynamicButton oldFunfacts={this.state.oldFunfacts} callback={this.setFunfacts} fileCallback={this.setFileFunfacts} deleteCallback={this.setDeleteFunfact}/>

		  <hr className="divider" />

		  <h2 className="section-header">Step 4: Upload Your Calendar</h2>
		  <p className="section-subfont">Upload your calendar's .iso file so we can setup dates for you and your matches.</p>
		  <input type="file" name="file" className="file-input" onChange={this.setCalendar}/>

                  <button type="submit" className="btn btn-primary submit-button-signup-long" onClick={this.changePage}>Submit</button>

               </div>
              </div>
            </div>
        );
    }
}

export default withRouter(Signup4);
