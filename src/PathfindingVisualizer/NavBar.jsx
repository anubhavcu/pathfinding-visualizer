import React, { Component } from "react";
// import PropTypes from "prop-types";

class NavBar extends Component {
  // componentDidMount() {
  //   this.props.genRandomArray();
  // }
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark mb-3 mw-100">
          {/* <nav className="navbar navbar-light bg-light mb-3"> */}
          {/* icon not working */}
          {/* <a href="https://google.com" target="blank">
            <img src="../../public/logo192.png" width="30" height="30" alt="" />
          </a> */}
          {/* <div> */}
          <a href=".">
            <h3 className="text-white">PathFinding Visualizer </h3>
          </a>
          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div
              className="btn-group mr-2"
              role="group"
              aria-label="First group"
            >
              <button
                type="button"
                className="btn btn-secondary"
                // disabled
                title="Generate different mazes "
              >
                Mazes
              </button>
              <button
                type="button"
                className="btn btn-secondary "
                title="Recursive Division maze"
                onClick={() => this.props.visualizeRecursiveDivision()}
              >
                M1
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                title="Simple staircase maze"
                onClick={() => this.props.visualizeStaircase()}
              >
                M2
              </button>
              <button
                type="button"
                className="btn btn-secondary "
                title="Basic Random maze with bomb !"
                onClick={() => this.props.visualizeMazeThree()}
              >
                M3
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                title="Recursive division maze "
                onClick={() => this.props.visualizeMazeFour()}
              >
                M4
              </button>
              <button
                type="button"
                className="btn btn-secondary "
                title="Recursive division maze (Vertical)"
                onClick={() => {
                  this.props.genRandomWalls();
                }}
              >
                M5
              </button>
            </div>
          </div>
          <div>
            <button
              className="btn btn-outline-danger m-1 btn-sm"
              // className="btn btn-primary btn-sm m-2"
              title="Visualize dijkstra algoritm!"
              onClick={() => {
                // disabled = true;
                this.props.visualizeDijkstra();
              }}
              // disabled={true}
            >
              Visualize Dijkstra
            </button>
            <button
              className="btn btn-outline-danger m-1 btn-sm"
              // className="btn btn-primary btn-sm m-2"
              title="Visualize A* algorithm"
              onClick={() => {
                // disabled = true;
                this.props.visualizeAstar();
              }}
              // disabled={true}
            >
              Visualize Astar
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              title="Clear entire board"
              // className="btn btn-primary btn-sm m-2"
              onClick={() => this.props.clearBoard()}
            >
              Clear Board
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              title="Clear Shortest Path"
              // className="btn btn-primary btn-sm m-2"
              onClick={() => this.props.clearPath()}
            >
              Clear Path
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              // className="btn btn-primary btn-sm m-2"
              id="add-bomb-button"
              title="Add bomb Node!"
              onClick={() => this.props.addBomb()}
            >
              Add Bomb
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              // className="btn btn-primary btn-sm m-2"
              title="Remove Bomb Node"
              onClick={() => this.props.removeBomb()}
            >
              Remove Bomb
            </button>

            <button
              // disabled="true"
              className="btn btn-outline-primary m-1 btn-sm"
              // className="btn btn-primary btn-sm m-2"
              title="Generate Random walls"
              // onClick={() => this.props.genRandomArray(178, 1, false)}
              onClick={() => this.props.genRandomWalls()}
            >
              Generate Random walls
            </button>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
