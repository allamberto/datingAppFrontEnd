import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from "./pages/login";
import Browse from "./pages/browse";
import Players from "./pages/players";
import Public from "./pages/public";
import Signup from "./pages/signup_1";
import Signup2 from "./pages/signup_2";
import Signup3 from "./pages/signup_3";
import Signup4 from "./pages/signup_4";
import Signup5 from "./pages/signup_5";
import Settings from "./pages/settings";
import Chat from "./pages/chat";
import Manage from "./pages/managePlayers";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (<Router>
    <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup_1" component={Signup} />
            <Route path="/signup_2" component={Signup2} />
            <Route path="/signup_3" component={Signup3} />
            <Route path="/signup_4" component={Signup4} />
            <Route path="/signup_5" component={Signup5} />
            <Route path="/browse" component={Browse} />
            <Route path="/players" component={Players} />
            <Route path="/settings" component={Settings} />
            <Route path="/chat" component={Chat} />
            <Route path="/managePlayers" component={Manage} />
          </Switch>
    </div></Router>
  );
}

export default App;
