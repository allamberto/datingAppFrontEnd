
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import React from "react";
import ReactDOM from "react-dom";
import Public from "./pages/public";
import Login from "./pages/login";
import Browse from "./pages/browse";
import Settings from "./pages/settings";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
  withRouter
} from "react-router-dom";

import EnsuredLogin from "./components/ensuredLogin";

function NotFound(){
  return (
    <Redirect to="/login" />
  );
}

function Temp() {
    return (
        <div><h1>Login</h1></div>
    );
}

class App extends React.Component {
  render(){
  return (
      <div>
        <Router>
            <h1>hello</h1>
            <Switch>
              <Route exact path="" component={withRouter(NotFound)}/>
              <Route path="/public" component={Public}/>
              <Route path="/login" render={() => (
                <Login />
              )}/>
              <Route component={EnsuredLogin}>
                <Route path="/browse" component={Browse}/>
                <Route path="/settings" component={Settings}/>
              </Route>
            </Switch>     
        </Router>
      </div>
  );}
}

export default App;
