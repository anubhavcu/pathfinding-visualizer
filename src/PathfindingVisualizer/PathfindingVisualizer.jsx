import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathfindingVisualizer.css";

export class PathfindingVisualizer extends Component {
  render() {
    const { grid, mouseIsPressed } = this.props;
    return (
      <div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isStart,
                    isFinish,
                    isWall,
                    isVisited,
                    isBomb
                  } = node;
                  return (
                    <Node
                      isBomb={isBomb}
                      isVisited={isVisited}
                      key={nodeIdx}
                      col={col}
                      row={row}
                      mouseIsPressed={mouseIsPressed}
                      isWall={isWall}
                      isStart={isStart}
                      isFinish={isFinish}
                      onMouseUp={(row, col) =>
                        this.props.handleMouseUp(row, col)
                      }
                      onMouseDown={(row, col) =>
                        this.props.handleMouseDown(row, col)
                      }
                      onMouseEnter={(row, col) =>
                        this.props.handleMouseEnter(row, col)
                      }
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PathfindingVisualizer;
// persistColor = () => {
//   document
//     .getElementById(`node-${startNode.row}-${startNode.col}`)
//     .classList.remove("node-visited");
//   document
//     .getElementById(`node-${startNode.row}-${startNode.col}`)
//     .classList.remove("node-shortest-path");
//   document.getElementById(
//     `node-${startNode.row}-${startNode.col}`
//   ).style.backgroundColor = "green";
//   document
//     .getElementById(`node-${finishNode.row}-${finishNode.col}`)
//     .classList.remove("node-visited");
//   document
//     .getElementById(`node-${finishNode.row}-${finishNode.col}`)
//     .classList.remove("node-shortest-path");
//   document.getElementById(
//     `node-${finishNode.row}-${finishNode.col}`
//   ).style.backgroundColor = "red";
// };

// clearPath = () => {
//   const { grid } = this.state;
//   const newGrid = grid.slice();
//   for (let i = 0; i < newGrid.length; i++) {
//     for (let j = 0; j < newGrid[i].length; j++) {
//       if (!(newGrid[i][j].isStart || newGrid[i][j].isFinish)) {
//         newGrid[i][j].isVisited = false;
//         // newGrid[i][j].distance = Infinity;
//         // newGrid[i][j].isWall = false;
//         // newGrid[i][j].previousNode = null;
//         const element = document.getElementById(`node-${i}-${j}`);
//         element.classList.remove("node-visited");
//         element.classList.remove("node-shortest-path");
//       } else {
//         // newGrid[i][j].isStart = newGrid[i][j].isStart;
//         // newGrid[i][j].isFinish = newGrid[i][j].isFinish;
//         // newGrid[startNode.row][startNode.col].isStart = true;
//       }
//     }
//   }
//   this.setState({ grid: newGrid });
// };
