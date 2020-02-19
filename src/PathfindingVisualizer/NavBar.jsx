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

          <div>
            <button
              className="btn btn-outline-danger m-1 btn-sm"
              // className="btn btn-primary btn-sm m-2"
              title="Generate a new random array"
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
              title="Generate a new random array"
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
              title="Time- O(nlog(n)) & Space-O(n)"
              // className="btn btn-primary btn-sm m-2"
              onClick={() => this.props.clearBoard()}
            >
              Clear Board
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              title="Time(worst)-O(n^2)||Time(best)-O(n)||Space-O(1)"
              // className="btn btn-primary btn-sm m-2"
              onClick={() => this.props.clearPath()}
            >
              Clear Path
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              // className="btn btn-primary btn-sm m-2"
              title="Time(worst)-O(n^2)||Time(best)-O(nlog(n))||Space-O(log(n))"
              onClick={() => this.props.addBomb()}
            >
              Add Bomb
            </button>
            <button
              className="btn btn-outline-primary m-1 btn-sm"
              // className="btn btn-primary btn-sm m-2"
              title="Time-O(nlog(n))||Space-O(1)"
              onClick={() => this.props.removeBomb()}
            >
              Remove Bomb
            </button>
            <button
              // disabled="true"
              className="btn btn-outline-primary m-1 btn-sm"
              // className="btn btn-primary btn-sm m-2"
              title="Time(worst)-O(n^2)||Time(best)-O(n)||Space-O(1)"
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
