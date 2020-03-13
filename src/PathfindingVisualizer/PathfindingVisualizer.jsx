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
