import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";
const START_NODE_ROW = 10,
  START_NODE_COL = 15,
  FINISH_NODE_ROW = 10,
  FINISH_NODE_COL = 35;
export class PathfindingVisualizer extends Component {
  state = {
    grid: [],
    mouseIsPressed: false
  };
  componentDidMount() {
    const grid = this.getInitialGrid();
    console.log(grid);
    this.setState({ grid });
  }
  //mouse is pressed and not lifted up
  handleMouseDown = (row, col) => {
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  };
  //hovering over an element
  //we want walls to be created when mouse is pressed and then dragged
  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  };
  //when pressed mouse button is released
  handleMouseUp = () => {
    this.setState({ mouseIsPressed: false });
  };
  //changing the wall state
  getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  getInitialGrid = () => {
    let grid = [];
    for (let row = 0; row < 20; row++) {
      let currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isWall: false,
      previousNode: null
    };
  };
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isStart, isFinish, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    mouseIsPressed={mouseIsPressed}
                    isWall={isWall}
                    isStart={isStart}
                    isFinish={isFinish}
                    onMouseUp={() => this.handleMouseUp()}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default PathfindingVisualizer;
