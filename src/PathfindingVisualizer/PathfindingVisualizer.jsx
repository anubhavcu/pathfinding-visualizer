import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar, getNodesInShortestPathOrderAstar } from "../algorithms/astar";

const START_NODE_ROW = 10,
  START_NODE_COL = 15,
  FINISH_NODE_ROW = 10,
  FINISH_NODE_COL = 35,
  BOMB_NODE_ROW = 10,
  BOMB_NODE_COL = 25;
const startNode = {
  row: START_NODE_ROW,
  col: START_NODE_COL
};
const finishNode = {
  row: FINISH_NODE_ROW,
  col: FINISH_NODE_COL
};
let bombNode = {
  row: BOMB_NODE_ROW,
  col: BOMB_NODE_COL,
  status: false
};
let bomb = false;
let draggingStart = false,
  draggingFinish = false,
  draggingBomb = false;
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
    } else if (node.row === bombNode.row && node.col === bombNode.col) {
      const newGrid = this.getNewGridWithBombNodeToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid, mouseIsPressed: false });
      draggingBomb = true;
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
    } else if (draggingBomb) {
      const newGrid = this.getNewGridWithBombNodeToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid });
    }
    this.setState({ mouseIsPressed: false });
    //resetting the dragging start/finish when mouse is lifted up
    draggingStart = false;
    draggingFinish = false;
    draggingBomb = false;
  };
  getNewGridWithBombNodeToggled = (grid, row, col) => {
    console.log("bom node toggle");

    const newGrid = grid.slice();
    console.log(newGrid);
    const node = newGrid[row][col];
    console.log(node);
    const newNode = {
      ...node,
      isBomb: !node.isBomb,
      isWall: false
    };
    const element = document.getElementById(
      `node-${bombNode.row}-${bombNode.col}`
    );
    element.classList.remove("node-bomb");
    newGrid[row][col] = newNode;
    bombNode.row = row;
    bombNode.col = col;
    return newGrid;
  };
  getNewGridWithStartNodeToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: !node.isStart,
      //maybe due to mouse click problem wall is set to true and we are not getting anything
      //in the visitedNodesInOrder from the dijkstra
      // *isWall is set to false also bcoz, in case we put walls first and then move the start/finish node on that wall

      isWall: false
      // distance: Infinity
      //distance setting to infinity not working, alternative is clearPath function
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
      // distance: Infinity
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
      previousNode: null,
      isBomb: false
      // isBomb: row === BOMB_NODE_ROW && col === BOMB_NODE_COL
      // isBomb: this.bombNode.status
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
        //if statement to avoid coloring of start and finish node
        if (!(node.isStart || node.isFinish)) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
          // this.persistColor();
        }
      }, 10 * i);
    }
  };
  animateShortestPath = nodesInShortestPathOrder => {
    // console.log(nodesInShortestPathOrder);
    // if (nodesInShortestPathOrder.length === 1) {
    //   alert("No Path Found ...!!");
    //   return;
    // }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!(node.isStart || node.isFinish)) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
          // this.persistColor();
        }
      }, 50 * i);
    }
  };
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
  visualizeDijkstra = () => {
    //just to make sure that when visualize dijkstra button is clicked path is cleared so that in case we move the start Node without clearing the board algorithm starts from a new startPoint
    //*if we don't clearPath dijkstra algorithm will start from the node whose distance is minimum and in the algorithms we have set the distance of startNode as 0(initially), so when we don't call clearPath function(in which we reset all the distance back to Infinity), and move the startNode to a new Point,visualization starts from the previous node only.
    this.clearPath();
    // console.log(startNode, finishNode);
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
  clearBoard = () => {
    // console.log(startNode, finishNode);
    const { grid } = this.state;
    const newGrid = grid.slice();
    // console.log(newGrid[startNode.row][startNode.col]);
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        // console.log(newGrid[i][j]);
        const element = document.getElementById(`node-${i}-${j}`);
        element.classList.remove("node-visited");
        element.classList.remove("node-shortest-path");
        //clearing class node-wall is optional(working fine otherwise also)
        element.classList.remove("node-wall");

        newGrid[i][j].isVisited = false;
        newGrid[i][j].distance = Infinity;
        newGrid[i][j].isWall = false;
        newGrid[i][j].previousNode = null;
      }
    }
    this.setState({ grid: newGrid });
  };
  clearPath = () => {
    // console.log(startNode, finishNode);
    const { grid } = this.state;
    const newGrid = grid.slice();
    // console.log(newGrid[startNode.row][startNode.col]);
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        // console.log(newGrid[i][j]);
        const element = document.getElementById(`node-${i}-${j}`);
        element.classList.remove("node-visited");
        element.classList.remove("node-shortest-path");
        newGrid[i][j].isVisited = false;
        newGrid[i][j].distance = Infinity;
        newGrid[i][j].previousNode = null;
      }
    }
    this.setState({ grid: newGrid });
  };
  animateAstar = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        //if statement to avoid coloring of start and finish node
        if (!(node.isStart || node.isFinish)) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
          // this.persistColor();
        }
      }, 10 * i);
    }
  };
  visualizeAstar = () => {
    this.clearPath();
    const { grid } = this.state;
    const start = grid[startNode.row][startNode.col];
    const finish = grid[finishNode.row][finishNode.col];
    const visitedNodesInOrder = astar(grid, start, finish);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAstar(finish);
    // console.log(nodesInShortestPathOrder);
    this.animateAstar(visitedNodesInOrder, nodesInShortestPathOrder);
  };
  // triggerBombNode = () => {
  //   bombNode.status = !bombNode.status;
  //   return bombNode.status;
  // };
  addBomb = () => {
    // this.triggerBombNode(bombNode);
    // bomb = true;
    // console.log(bombNode.row, bombNode.col);
    const { grid } = this.state;
    for (const row of grid) {
      for (const node of row) {
        if (node.row === bombNode.row && node.col === bombNode.col) {
          // if (node.row === 10 && node.col === 25) {
          // node.bombNode = true;
          node.isBomb = true;
          // document.getElementById(`node-${node.row}-${node.col}`).className =
          //   "node-bomb";
        } else {
          node.bombNode = false;
        }
      }
    }
    document.getElementById(`node-${bombNode.row}-${bombNode.col}`).className =
      "node node-bomb";
    // console.log(grid);
  };
  removeBomb = () => {
    // bomb = false;
    const { grid } = this.state;
    for (const row of grid) {
      for (const node of row) {
        node.isBomb = false;
      }
    }
    const element = document.getElementById(
      `node-${bombNode.row}-${bombNode.col}`
    );
    element.classList.remove("node-bomb");
  };
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra Algorithm!
        </button>
        <button onClick={() => this.clearBoard()}>Clear Board</button>
        <button onClick={() => this.clearPath()}>Clear Path</button>
        <button onClick={() => this.visualizeAstar()}>
          Visualize Astar Algorithm!
        </button>
        <button onClick={() => this.addBomb()}>Add Bomb!</button>
        <button onClick={() => this.removeBomb()}>Remove Bomb!</button>
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
