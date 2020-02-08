import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
const START_NODE_ROW = 10,
  START_NODE_COL = 15,
  FINISH_NODE_ROW = 10,
  FINISH_NODE_COL = 35;
const startNode = {
  row: START_NODE_ROW,
  col: START_NODE_COL
};
const finishNode = {
  row: FINISH_NODE_ROW,
  col: FINISH_NODE_COL
};
let draggingStart = false,
  draggingFinish = false;
export class PathfindingVisualizer extends Component {
  state = {
    grid: [],
    mouseIsPressed: false
  };
  componentDidMount() {
    const grid = this.getInitialGrid();
    // console.log(grid);
    this.setState({ grid });
  }
  //mouse is pressed and not lifted up
  handleMouseDown = (row, col) => {
    const node = {
      row: row,
      col: col
    };
    if (node.row === startNode.row && node.col === startNode.col) {
      const newGrid = this.getNewGridWithStartNodeToggled(
        this.state.grid,
        row,
        col
      );
      // we don't want to create walls when we are dragging the start/finish node
      //mouseIsPressed is set to false so that onMouseEnter doesn't trigger
      this.setState({ grid: newGrid, mouseIsPressed: false });
      draggingStart = true;
    } else if (node.row === finishNode.row && node.col === finishNode.col) {
      const newGrid = this.getNewGridWithFinishNodeToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid, mouseIsPressed: false });
      draggingFinish = true;
    } else {
      const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
    // console.log(node.row === startNode.row && node.col === startNode.col);
  };
  //hovering over an element
  //we want walls to be created when mouse is pressed and then dragged
  //**mouseEnter will won't work when we clicked start/finish node, as we are setting
  //mouseIsPressed as false in onMouseDown function(on the start/finish node)

  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;

    // if (!draggingStart || !draggingFinish) {
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
    // } else {
    //   if (draggingStart) {
    //     const newGrid = this.getNewGridWithStartNodeToggled(
    //       this.state.grid,
    //       row,
    //       col
    //     );
    //     this.setState({ grid: newGrid });
    //     // draggingStart = false;
    //   } else if (draggingFinish) {
    //     const newGrid = this.getNewGridWithFinishNodeToggled(
    //       this.state.grid,
    //       row,
    //       col
    //     );
    //     this.setState({ grid: newGrid });
    //     // draggingFinish = false;
    //   }
    // }
    // }
  };
  //when pressed mouse button is released
  handleMouseUp = (row, col) => {
    if (draggingStart) {
      const newGrid = this.getNewGridWithStartNodeToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid });
      // draggingStart = false;
    } else if (draggingFinish) {
      const newGrid = this.getNewGridWithFinishNodeToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid });
      // draggingFinish = false;
    }
    this.setState({ mouseIsPressed: false });
    draggingStart = false;
    draggingFinish = false;
  };

  getNewGridWithStartNodeToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: !node.isStart,
      //maybe due to mouse click problem wall is set to true and we are not getting anything
      //in the visitedNodesInOrder from the dijkstra
      isWall: false
    };
    newGrid[row][col] = newNode;
    startNode.row = row;
    startNode.col = col;
    return newGrid;
  };
  getNewGridWithFinishNodeToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: !node.isFinish,
      isWall: false
    };
    newGrid[row][col] = newNode;
    finishNode.row = row;
    finishNode.col = col;
    return newGrid;
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
      isVisited: false,
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isWall: false,
      previousNode: null
    };
  };
  animateDijsktra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };
  animateShortestPath = nodesInShortestPathOrder => {
    // console.log("shortest path");
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };
  visualizeDijkstra = () => {
    const { grid } = this.state;
    // const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const start = grid[startNode.row][startNode.col];
    // const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const finish = grid[finishNode.row][finishNode.col];
    // console.log(startNode, finishNode);
    // console.log(start, finish);
    const visitedNodesInOrder = dijkstra(grid, start, finish);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
    this.animateDijsktra(visitedNodesInOrder, nodesInShortestPathOrder);
  };
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra Algorithm!
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isStart,
                    isFinish,
                    isWall,
                    isVisited
                  } = node;
                  return (
                    <Node
                      isVisited={isVisited}
                      key={nodeIdx}
                      col={col}
                      row={row}
                      mouseIsPressed={mouseIsPressed}
                      isWall={isWall}
                      isStart={isStart}
                      isFinish={isFinish}
                      onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
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
