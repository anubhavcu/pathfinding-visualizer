import React from "react";
import "./demo.css";
import {
  Route,
  NavLink,
  // BrowserRouter as Router,
  HashRouter as Router,
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
          <div id="header">
            <h1 style={{ backgroundColor: "lightblue" }}>
              How to use this tool ?
              <small className="text-muted">..and what the heck is A* ??</small>
            </h1>
            <blockquote
              className="blockquote text-center font-italic font-weight-bold"
              style={{ backgroundColor: "ghostwhite" }}
            >
              <p className="mb-0">
                Shortest Distance between two points is a straight line.
              </p>
              <footer className="blockquote-footer">
                <cite title="Source Title">Archimedes</cite>
              </footer>
            </blockquote>
            <h5 className="font-weight-bold">
              {" "}
              <NavLink activeClassName="active" to="/article">
                Click Here
              </NavLink>{" "}
              if you want to learn more about path finding algorithms ..
            </h5>
          </div>
          <div id="parentInfoDiv">
            <div id="alignHelperDiv">
              <div id="wallNodeImage"> </div> Wall Node
            </div>
            <div id="alignHelperDiv">
              <div id="emptyNodeImage"> </div> Unvisited Node
            </div>
            <div id="alignHelperDiv">
              <div id="visitedNodeImage1"> </div>
            </div>
            <div id="alignHelperDiv">
              <div id="visitedNodeImage2"> </div> Visited Nodes
            </div>
            <div id="alignHelperDiv">
              <div id="startNodeImage"> </div> Start Node
            </div>
            <div id="alignHelperDiv">
              <div id="finishNodeImage"> </div> Finish Node
            </div>
            <div id="alignHelperDiv">
              <div id="bombNodeImage"> </div> Bomb Node
            </div>
            <div id="alignHelperDiv">
              <div id="shortestPathImage"> </div>Shortest Path Node
            </div>
          </div>
          <div id="listItems">
            <ul className="list-group">
              <li className="list-group-item">
                <h6>
                  {" "}
                  <strong>
                    {" "}
                    1. Click and drag on the grid to draw walls, so that
                    algorithm doesn't go through the walls and find shortest
                    path to finish node around it .
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
              <li className="list-group-item">
                <h6>
                  <strong>
                    4. Click on Add Bomb to add a bomb Node on the grid.
                  </strong>
                </h6>
                <div id="clickOnBombNodeImage"></div>
              </li>
              <li className="list-group-item">
                <h6>
                  <strong>
                    5. When Bomb Node is active the algorithm finds the path
                    first to bombNode to deactivate it and then to the finish
                    node.
                  </strong>
                </h6>
                <div id="travelThroughBombNode"></div>
              </li>
              <li className="list-group-item">
                <h6>
                  <strong>
                    6. You can also select from one of some built-in mazes to
                    draw walls on the grid.
                  </strong>
                </h6>
                <div id="selectMazes"></div>
              </li>
              <li className="list-group-item">
                <h6>
                  <strong>Here are few sample snippets ...</strong>
                </h6>
                <div id="sample01"></div>
              </li>
              <li className="list-group-item">
                <h6></h6>
                <div id="sample02"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Demo;
