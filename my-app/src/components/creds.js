import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Overlay, Tooltip } from 'react-bootstrap';
import Popup from 'react-popup';

function RememberMe(props) {

   return (
    <div className="form-group">
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={props.callback}/>
            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
        </div>
    </div>
    );
}

function PasswordCheck(props) {
    return (
        <div className="form-group">
            <label className="form-group-text">Password Confirmation</label>
            <input type="password" className="form-control" placeholder="Re-enter password" onChange={props.onchange}/>
        </div>
    );
}

function Signup(props) {
    return (
        <p className="forgot-password text-right">
            Need an account?  <NavLink to="/signup_1">Signup!</NavLink>
        </p>
    );
}

function Login(props) {
    return (
      <div className="login-return">
        <p className="forgot-password text-right">
            Already registered <NavLink to="/login">Sign in?</NavLink>
        </p>
      </div>
    );
}

class Creds extends React.Component {
    constructor(props) {
      super(props);

      var netid = (localStorage.getItem('rememberMe') != null) ? localStorage.getItem('rememberMe') : "";
      this.state = { hasError:false,
                     netid: netid,
                     password: "",
                     passwordConfirm: "",
                     rememberMe: false
      };

      this.mySubimtHandler = this.mySubmitHandler.bind(this);
      this.onChangeUser = this.onChangeUser.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
      this.saveSessionUsername = this.saveSessionUsername.bind(this);
    }

    mySubmitHandler = (event) => {
      event.preventDefault();
      if(this.props.login) {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({"netid": this.state.netid,
                                  "password": this.state.password
            })
          };
          fetch('http://3.211.82.27:8800/login', requestOptions)
          .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    alert("You have entered an incorrect username or password.");
                    return Promise.reject(error);
                }

                sessionStorage.setItem('netid', this.state.netid);
                this.props.history.push(this.props.path);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        } else if(this.props.create) {
            if(this.state.netid == "") {
                alert("Please Enter Your NetID.");
                return;
            }
		
            if(this.state.password == this.state.passwordConfirm) {
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify({"netid": this.state.netid,
                                          "password": this.state.password
                   })
                  };
                  fetch('http://3.211.82.27:8800/students', requestOptions)
                  .then(async response => {
                        const data = await response.json();

                        // check for error response
                        if (!response.ok) {
                            // get error message from body or default to response status
                            const error = (data && data.message) || response.status;
                            alert("There was an error creating your account. Please try again.");
                            return Promise.reject(error);
                        }
                    
                        sessionStorage.setItem('netid', this.state.netid); 
                        this.props.history.push(this.props.path);
                    }) 
                    .catch(error => {
                        console.error('There was an error!', error);
                        alert("There was an error creating your account. Please try again.");
                    });
            } else {
                alert("Your passwords do not match. Please try again.");
            }
        }
    }

    onChangeUser(event){
        this.setState({"netid": event.target.value});
        if(this.state.rememberMe) {
            localStorage.setItem('rememberMe', event.target.value); 
        }
    }

    onChangePassword(event) {
        this.setState({"password": event.target.value});
    }

    onChangePasswordConfirm(event) {
        this.setState({"passwordConfirm": event.target.value});
    }

    saveSessionUsername(e) {
        this.setState({"rememberMe": e.target.checked});
    }

    render() {
        let extra1;
        let extra2;
        if(this.props.login) {
            extra1 = <RememberMe callback={this.saveSessionUsername}/>
            extra2 = <Signup />
        }

        if(this.props.create) {
            extra1 = <PasswordCheck onchange={this.onChangePasswordConfirm}/>
            extra2 = <Login />
        }

    return (
        <form onSubmit={this.mySubmitHandler}>
                <h3>{this.props.header}</h3>

                <div className="form-group">
                    <label className="form-group-text">NetID</label>
                    <input required type="text" className="form-control" value={this.state.netid} placeholder="Enter NetID" onChange={this.onChangeUser}/>
                </div>

                <div className="form-group">
                    <label className="form-group-text">Password</label>
                    <input required type="password" className="form-control" placeholder="Enter Password" onChange={this.onChangePassword}/>
                </div>
                
                {extra1}

                <button type="submit" className="btn btn-primary submit-button-signup">Submit</button>
                {extra2}
        </form>
    );}
}

export default withRouter(Creds);
