import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
class Demo extends React.Component {
  render() {
    return (
      <div>
        <h1>
          How to use this tool ?
          <small class="text-muted">What the h... is A* ??</small>
        </h1>
        {/* <h1>How to use visualization tool</h1> */}
        <button class="btn btn-light btn-lg">
          <NavLink activeClassName="active" to="/">
            Visaulize Paths !
          </NavLink>
        </button>
      </div>
    );
  }
}
export default Demo;
