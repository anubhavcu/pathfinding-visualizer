import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  NavLink,
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Demo from "./animations/Demo";
import NotFound from "./animations/NotFound";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// ReactDOM.render(<Router />, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById("root"));

const routing = (
  <Router>
    <div>
      {/* <ul>
        <li>
          <NavLink exact activeClassName="active" to="/">
            app
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/demo">
            Demo
          </NavLink>
        </li>
      </ul> */}
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/demo" component={Demo} />
        <Route component={NotFound} />
      </Switch>
      {/* <hr /> */}
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
//Switch component only render the components when path matches otherwise it fallsback to the component "NotFound"
//Refer to the link to understand the routing part in case of doubt
//https://codeburst.io/getting-started-with-react-router-5c978f70df91

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
