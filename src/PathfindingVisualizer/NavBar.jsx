import React, { Component } from "react";
class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark mb-3 mw-100">
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
                title="Maze 3"
                onClick={() => this.props.visualizeMazeThree()}
              >
                M3
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                title="Recursive division staircase maze "
                onClick={() => this.props.visualizeMazeFour()}
              >
                M4
              </button>
              <button
                type="button"
                className="btn btn-secondary "
                title="Generate Random walls"
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
              title="Visualize dijkstra algoritm!"
              onClick={() => {
                this.props.visualizeDijkstra();
              }}
            >
              Visualize Dijkstra
            </button>
            <button
              className="btn btn-outline-danger m-1 btn-sm"
              title="Visualize A* algorithm"
              onClick={() => {
                this.props.visualizeAstar();
              }}
            >
              Visualize Astar
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              title="Clear entire board"
              onClick={() => this.props.clearBoard()}
            >
              Clear Board
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              title="Clear Shortest Path"
              onClick={() => this.props.clearPath()}
            >
              Clear Path
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              id="add-bomb-button"
              title="Add bomb Node!"
              onClick={() => this.props.addBomb()}
            >
              Add Bomb
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              title="Remove Bomb Node"
              onClick={() => this.props.removeBomb()}
            >
              Remove Bomb
            </button>

            <button
              className="btn btn-outline-primary m-1 btn-sm"
              title="Generate Random walls"
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
