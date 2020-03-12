import React from "react";
import "./demo.css";
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
        <button className="btn btn-lg" id="visualizePathButton">
          <NavLink activeClassName="active" to="/">
            Visaulize Paths !
          </NavLink>
        </button>
        <div className="container">
          <h1>
            How to use this tool ?
            <small class="text-muted">..and what the heck is A* ??</small>
          </h1>
          <blockquote class="blockquote">
            <p class="mb-0">
              Shortest Distance between two points is a straight line.
            </p>
            <footer class="blockquote-footer">
              <cite title="Source Title">Archimedes</cite>
            </footer>
          </blockquote>
          {/* <h1>How to use visualization tool</h1> */}
          {/* <div id="emptyNodeImage"></div>
          <div>
            <div id="wallNodeImage"></div>
            <p>Wall Node</p>
          </div> */}
          <ul className="list-group">
            <li className="list-group-item">
              <h6>
                {" "}
                <strong>
                  {" "}
                  1. Click and drag on the grid to draw walls, so that algorithm
                  doesn't go through the walls and find shortest path to finish
                  node around it .
                </strong>
              </h6>
              <div id="drawingWallsImage"></div>
            </li>
            <li className="list-group-item">
              <h6>
                <strong>2. Select an algorithm to visualize !</strong>
              </h6>
              <div id="selectAlgorithmImage"></div>
            </li>
            <li className="list-group-item">
              <h6>
                <strong>
                  3. After this the algorithm finds the shortest path to the
                  finish node according to the selected algorithm.
                </strong>
              </h6>
              <div id="path1SampleImage"></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Demo;
