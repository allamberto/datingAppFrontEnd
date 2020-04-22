import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Overlay, Tooltip } from 'react-bootstrap';

function RememberMe(props) {
    return (
    <div className="form-group">
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
        </div>
    </div>
    );
}

function PasswordCheck(props) {
    return (
        <div className="form-group">
            <label>Password Confirmation</label>
            <input type="password" className="form-control" placeholder="Re-enter password"/>
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
        <p className="forgot-password text-right">
            Already registered <NavLink to="/login">Sign in?</NavLink>
        </p>
    );
}


class Creds extends React.Component {
    constructor(props) {
      super(props);
      this.state = {hasError:false};

      this.mySubimtHandler = this.mySubmitHandler.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    mySubmitHandler = (event) => {
      event.preventDefault();
      this.props.history.push(this.props.path);
    }

    onChange(event){
        if(event.target.value.includes('nd.edu')){
            this.setState({hasError:true});
        } else{
            this.setState({hasError:false});
        }
    }

    render() {
        let extra1;
        let extra2;
        if(this.props.login) {
            extra1 = <RememberMe />
            extra2 = <Signup />
        }

        if(this.props.create) {
            extra1 = <PasswordCheck />
            extra2 = <Login />
        }


    return (
        <form onSubmit={this.mySubmitHandler}>
                <h3>{this.props.header}</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                
                {extra1}

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                {extra2}
        </form>
    );}
}

export default withRouter(Creds);
