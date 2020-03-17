import React, { Component } from "react";
import {
  Route,
  NavLink,
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch
} from "react-router-dom";
import Demo from "./animations/Demo";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";
import NavBar from "./PathfindingVisualizer/NavBar";
import "./App.css";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
// import { astar, getNodesInShortestPathOrderAstar } from "./algorithms/astar";
// import { astar, getNodesInShortestPathOrderAstar } from "./algorithms/newAstar";
import { astar, getNodesInShortestPathOrderAstar } from "./algorithms/astar1";

import { recursiveDivision } from "./mazeAlgorithms/recursiveDivision";
import { staircaseMaze } from "./mazeAlgorithms/staircaseMaze";
import { mazeThree } from "./mazeAlgorithms/maze3";
import { mazeFour } from "./mazeAlgorithms/maze4";
let centerText =
  "Click and drag mouse on the grid to draw obstacles(or select from different mazes), then click on the algorithm to find the shortest path ;) (try adding a bomb also...)";
let NUMBER_OF_ROWS = 22,
  NUMBER_OF_COLS = 56;
let START_NODE_ROW = 10,
  START_NODE_COL = 10,
  FINISH_NODE_ROW = 10,
  FINISH_NODE_COL = 40,
  BOMB_NODE_ROW = 18,
  BOMB_NODE_COL = 25;
let startNode = {
  row: START_NODE_ROW,
  col: START_NODE_COL
};
let finishNode = {
  row: FINISH_NODE_ROW,
  col: FINISH_NODE_COL
};
let bombNode = {
  row: BOMB_NODE_ROW,
  col: BOMB_NODE_COL,
  status: false
};
let draggingStart = false,
  draggingFinish = false,
  draggingBomb = false;
export class App extends Component {
  state = {
    grid: [],
    mouseIsPressed: false
  };
  getWindowSize() {
    const navBarHeight = document.getElementById("navBarContent").clientHeight;
    const gridHeight = window.innerHeight - (navBarHeight + 100);
    const gridWidth = document.getElementById("gridContent").clientWidth;
    NUMBER_OF_ROWS = Math.floor(gridHeight / 25 - 1);
    NUMBER_OF_COLS = Math.floor(gridWidth / 25);
    START_NODE_ROW = Math.floor(NUMBER_OF_ROWS / 2);
    START_NODE_COL = Math.floor(NUMBER_OF_COLS / 6);
    FINISH_NODE_ROW = Math.floor(NUMBER_OF_ROWS / 2);
    FINISH_NODE_COL = Math.floor(NUMBER_OF_COLS / 1.15);
    BOMB_NODE_ROW = Math.floor(NUMBER_OF_ROWS / 1.2);
    BOMB_NODE_COL = Math.floor(NUMBER_OF_COLS / 2.2);
    startNode.row = START_NODE_ROW;
    startNode.col = START_NODE_COL;
    finishNode.row = FINISH_NODE_ROW;
    finishNode.col = FINISH_NODE_COL;
    bombNode.row = BOMB_NODE_ROW;
    bombNode.col = BOMB_NODE_COL;
  }
  componentDidMount() {
    this.getWindowSize();
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }
  //mouse is pressed and not lifted up
  handleMouseDown = (row, col) => {
    this.clearPath();
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
    } else if (
      node.row === bombNode.row &&
      node.col === bombNode.col &&
      bombNode.status //checking with status so it triggers only when addBomb is clicked else it will create a wall on that node
    ) {
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
  };
  //hovering over an element
  //we want walls to be created when mouse is pressed and then dragged
  //**mouseEnter will won't work when we clicked start/finish node, as we are setting
  //mouseIsPressed as false in onMouseDown function(on the start/finish node)

  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    //below if statement to prevent dragging and forming wall node over the bomb node(mouseIsPressed set to false not working here)
    //remove this if condition with only bombNode condition if problem persists
    if (
      !(
        (row === bombNode.row && col === bombNode.col) ||
        (row === startNode.row && col === startNode.col) ||
        (row === finishNode.row && col === finishNode.col)
      )
    ) {
      const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
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
    } else if (draggingFinish) {
      const newGrid = this.getNewGridWithFinishNodeToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid });
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
    bombNode.row = row;
    bombNode.col = col;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
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
    //adding className to new node (was working fine without this also), check it later
    // const newElement = document.getElementById(
    //   `node-${bombNode.row}-${bombNode.col}`
    // );
    // newElement.className = "node node-bomb";
    return newGrid;
  };
  getNewGridWithStartNodeToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    startNode.row = row;
    startNode.col = col;
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
    return newGrid;
  };
  getNewGridWithFinishNodeToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    finishNode.row = row;
    finishNode.col = col;
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: !node.isFinish,
      isWall: false
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  //changing the wall state
  getNewGridWithWallToggled = (grid, row, col) => {
    // if (row !== bombNode.row && col !== bombNode.col) {
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
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      let currentRow = [];
      for (let col = 0; col < NUMBER_OF_COLS; col++) {
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
    };
  };

  animateDijsktra = (
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    bomb,
    nodesInShortestPathOrderWithBomb
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          if (!bomb) {
            //no bomb
            this.animateShortestPath(nodesInShortestPathOrder);
          } else {
            //bomb is present
            this.animateShortestPath(nodesInShortestPathOrderWithBomb);
            // return;
          }
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        //if statement to avoid coloring of start and finish node
        if (!(node.isStart || node.isFinish || node.isBomb)) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  };
  //remove the arrow classname and calling this function in clearPath and clearBoard functions so that arrow are removed after visualization
  removeArrowClass = () => {
    const { grid } = this.state;
    for (const row of grid) {
      for (const node of row) {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        element.classList.remove("node-right-arrow");
        element.classList.remove("node-left-arrow");
        element.classList.remove("node-up-arrow");
        element.classList.remove("node-down-arrow");
      }
    }
  };
  determineImage = (currentNode, previousNode) => {
    const element = document.getElementById(
      `node-${currentNode.row}-${currentNode.col}`
    );
    if (currentNode.col > previousNode.col) {
      //moving right
      element.className = "node node-shortest-path node-right-arrow";
    } else if (currentNode.row < previousNode.row) {
      //moving up
      element.className = "node node-shortest-path node-up-arrow";
    } else if (currentNode.col < previousNode.col) {
      // moving left
      element.className = "node node-shortest-path node-left-arrow";
    } else if (currentNode.row > previousNode.row) {
      //moving down
      element.className = "node node-shortest-path node-down-arrow";
    }
  };
  //this function adds the correct positioned arrow before the finish node as determineImage wasn't getting it correctly
  arrowForSecondLastNode = (node, previousNode) => {
    //two if conditions to escape the bug when no path to bombNode is found
    if (previousNode === undefined) return;
    if (node === undefined) return;
    const element = document.getElementById(
      `node-${previousNode.row}-${previousNode.col}`
    );
    if (node.col > previousNode.col) {
      //finish node is right
      element.className = "node node-shortest-path node-right-arrow";
    } else if (node.row > previousNode.row) {
      //finish node is below
      element.className = "node node-shortest-path node-down-arrow";
    } else if (node.row < previousNode.row) {
      //finish node is above
      element.className = "node node-shortest-path node-up-arrow";
    } else if (node.col < previousNode.col) {
      //finish node is left
      element.className = "node node-shortest-path node-left-arrow";
    }
  };
  animateShortestPath = nodesInShortestPathOrder => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const previousNode = nodesInShortestPathOrder[i - 1];
        if (!(node.isStart || node.isFinish || node.isBomb)) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
          //setting the arrow image
          this.determineImage(node, previousNode);
          //first we are setting the image of the current travelling node and then removing the previous one's image(if set) simultaneously to make it look like a moving arrow
          //resetting the arrow image of previous node (so that it looks like a travelling arrow)
          if (
            !(
              previousNode.isStart ||
              previousNode.isFinish ||
              previousNode.isBomb
            )
          ) {
            document.getElementById(
              `node-${previousNode.row}-${previousNode.col}`
            ).style.backgroundImage = "none";
          }
        }
        //this if block is for direction arrow of node just before finish node
        if (node.isBomb) {
          // this.determineImage(node, previousNode);
          this.arrowForSecondLastNode(node, previousNode);
        }
        //this if block is for direction arrow of node just before finish node
        if (node.isFinish) {
          // this.determineImage(node, previousNode);
          this.arrowForSecondLastNode(node, previousNode);
        }
        if (i === nodesInShortestPathOrder.length - 1) {
          this.reEnableButtons();
          this.enableGrid();
        }
      }, 50 * i);
    }
  };

  animateDijsktraWithBomb = (
    newVisitedNodesInOrder,
    newNodesInShortestPathOrder0,
    newStart,
    newFinish
  ) => {
    for (let i = 0; i <= newVisitedNodesInOrder.length; i++) {
      if (i === newVisitedNodesInOrder.length) {
        setTimeout(() => {
          const { grid } = this.state;
          const visitedNodesInOrder = dijkstra(grid, newStart, newFinish);
          const nodesInShortestPathOrder1 = getNodesInShortestPathOrder(
            newFinish
          );
          const nodesInShortestPathOrder = [
            ...newNodesInShortestPathOrder0,
            ...nodesInShortestPathOrder1
          ];
          this.animateDijsktra(
            visitedNodesInOrder,
            nodesInShortestPathOrder1,
            true,
            nodesInShortestPathOrder
          );
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = newVisitedNodesInOrder[i];
        //if statement to avoid coloring of start and finish node
        if (!(node.isStart || node.isFinish || node.isBomb)) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-bomb-visited";
        }
      }, 10 * i);
    }
  };

  visualizeDijkstra = () => {
    centerText =
      "Dijkstra’s algorithm finds a shortest path tree from a single source node, by building a set of nodes that have minimum distance from the source. Dijkstra's algorithm guarantees shortest path.";
    //just to make sure that when visualize dijkstra button is clicked path is cleared so that in case we move the start Node without clearing the board algorithm starts from a new startPoint
    //*if we don't clearPath dijkstra algorithm will start from the node whose distance is minimum and in the algorithms we have set the distance of startNode as 0(initially), so when we don't call clearPath function(in which we reset all the distance back to Infinity), and move the startNode to a new Point,visualization starts from the previous node only.
    this.clearPath();
    this.disableButtons();
    this.disableGrid();
    const { grid } = this.state;
    let bombIsPresent = false;
    if (bombNode.status) {
      bombIsPresent = true;
    }
    const finish = grid[finishNode.row][finishNode.col];
    if (!bombIsPresent) {
      const start = grid[startNode.row][startNode.col];
      const visitedNodesInOrder = dijkstra(grid, start, finish);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
      this.animateDijsktra(
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        false,
        null
      );
    } else {
      const bombNode1 = grid[bombNode.row][bombNode.col];
      const start = grid[startNode.row][startNode.col];
      const visitedNodesInOrder = dijkstra(grid, start, bombNode1);

      const nodesInShortestPathOrder = getNodesInShortestPathOrder(bombNode1);
      this.animateDijsktraWithBomb(
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        bombNode1,
        finish
      );
    }
  };
  clearBoard = () => {
    this.removeArrowClass();
    this.removeBomb();
    const { grid } = this.state;
    const newGrid = grid.slice();
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        const element = document.getElementById(`node-${i}-${j}`);
        element.classList.remove("node-visited");
        element.classList.remove("node-shortest-path");
        element.classList.remove("node-bomb-visited");
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
    this.removeArrowClass();
    const { grid } = this.state;
    const newGrid = grid.slice();
    // console.log(newGrid[startNode.row][startNode.col]);
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        // console.log(newGrid[i][j]);
        const element = document.getElementById(`node-${i}-${j}`);
        element.classList.remove("node-visited");
        element.classList.remove("node-shortest-path");
        element.classList.remove("node-bomb-visited");
        newGrid[i][j].isVisited = false;
        newGrid[i][j].distance = Infinity;
        newGrid[i][j].previousNode = null;
      }
    }
    this.setState({ grid: newGrid });
  };
  animateAstar = (
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    bomb,
    nodesInShortestPathOrderWithBomb
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          if (!bomb) {
            //no bomb
            this.animateShortestPath(nodesInShortestPathOrder);
          } else {
            this.animateShortestPath(nodesInShortestPathOrderWithBomb);
          }
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        //if statement to avoid coloring of start and finish node
        if (!(node.isStart || node.isFinish || node.isBomb)) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  };
  animateAstarWithBomb = (
    newVisitedNodesInOrder,
    newNodesInShortestPathOrder0,
    newStart,
    newFinish
  ) => {
    for (let i = 0; i <= newVisitedNodesInOrder.length; i++) {
      if (i === newVisitedNodesInOrder.length) {
        setTimeout(() => {
          const { grid } = this.state;
          const visitedNodesInOrder = astar(grid, newStart, newFinish);
          const nodesInShortestPathOrder1 = getNodesInShortestPathOrderAstar(
            newFinish
          );
          const nodesInShortestPathOrder = [
            ...newNodesInShortestPathOrder0,
            ...nodesInShortestPathOrder1
          ];
          this.animateAstar(
            visitedNodesInOrder,
            nodesInShortestPathOrder1,
            true,
            nodesInShortestPathOrder
          );
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = newVisitedNodesInOrder[i];
        //if statement to avoid coloring of start and finish node
        if (!(node.isStart || node.isFinish || node.isBomb)) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-bomb-visited";
        }
      }, 10 * i);
    }
  };
  visualizeAstar = () => {
    //disabling all buttons while visualization
    centerText =
      "A* algorithm calculates heuristic distance(distance from the end node) which guides it towards the target node faster. A* algorithm guarantees shortest path..";
    this.disableButtons();
    this.disableGrid();
    this.clearPath();
    const { grid } = this.state;
    let bombIsPresent = false;
    if (bombNode.status) {
      bombIsPresent = true;
    }
    const start = grid[startNode.row][startNode.col];
    const finish = grid[finishNode.row][finishNode.col];
    if (!bombIsPresent) {
      const visitedNodesInOrder = astar(grid, start, finish);
      const nodesInShortestPathOrder = getNodesInShortestPathOrderAstar(finish);
      this.animateAstar(
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        false,
        null
      );
    } else {
      const bombNode1 = grid[bombNode.row][bombNode.col];
      const visitedNodesInOrder = astar(grid, start, bombNode1);
      const nodesInShortestPathOrder = getNodesInShortestPathOrderAstar(
        bombNode1
      );
      this.animateAstarWithBomb(
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        bombNode1,
        finish
      );
    }
  };
  addBomb = () => {
    this.clearPath();
    centerText =
      "When bomb is active the algorithm will first try to find the shortest path to bomb to deactivate it and then will reach the finish node ..";
    const { grid } = this.state;
    for (const row of grid) {
      for (const node of row) {
        if (node.row === bombNode.row && node.col === bombNode.col) {
          node.isWall = false;
          node.isBomb = true;
        } else {
          // node.bombNode = false;
          // continue;
        }
      }
    }
    bombNode.status = true;
    document.getElementById(`node-${bombNode.row}-${bombNode.col}`).className =
      "node node-bomb";
    this.setState({ grid });
    document.getElementById("add-bomb-button").disabled = true;
  };
  removeBomb = () => {
    this.clearPath();
    document.getElementById("add-bomb-button").disabled = false;

    centerText =
      "Click and drag mouse on the grid to draw obstacles(or select from different mazes), then click on the algorithm to find the shortest path ;) (try adding a bomb also...)";
    // bomb = false;
    const { grid } = this.state;
    const element = document.getElementById(
      `node-${bombNode.row}-${bombNode.col}`
    );
    element.classList.remove("node-bomb");
    for (const row of grid) {
      for (const node of row) {
        node.isBomb = false;
      }
    }
    bombNode.status = false;
    this.setState({ grid });
  };
  genRandomNumber = () => {
    return Math.floor(Math.random() * (NUMBER_OF_COLS * NUMBER_OF_ROWS));
  };
  resetNodeWalls = () => {
    const { grid } = this.state;
    const newGrid = grid.slice();
    for (const row of newGrid) {
      for (const node of row) {
        node.isWall = false;
      }
    }
    this.setState({ grid: newGrid });
  };
  genRandomWalls = () => {
    this.clearPath();
    this.resetNodeWalls();
    const { grid } = this.state;
    const newGrid = grid.slice();
    let nodes = [];
    for (const row of grid) {
      for (const node of row) {
        if (
          !(
            (node.row === bombNode.row && node.col === bombNode.col) ||
            (node.row === startNode.row && node.col === startNode.col) ||
            (node.row === finishNode.row && node.col === finishNode.col)
          )
        ) {
          nodes.push(node);
        }
      }
    }
    let numberOfPlainNodes = nodes.length;
    let x = Math.floor((40 / 100) * numberOfPlainNodes),
      random = this.genRandomNumber();
    //some kind of error with genRandomWall function, to ignore it following two if statements are there, check later if problem persists "cannot read property nodes[random].isWall of unknown"
    while (x) {
      if (nodes[random] === undefined) return;
      if (nodes[random].isWall === undefined) return;
      nodes[random].isWall = !nodes[random].isWall;
      x -= 1;

      random = this.genRandomNumber();
    }
    this.setState({ grid: newGrid });
  };
  visualizeRecursiveDivision = () => {
    this.clearBoard();
    this.disableButtons();
    this.disableGrid();
    const { grid } = this.state;
    const nodes = recursiveDivision(grid, NUMBER_OF_ROWS, NUMBER_OF_COLS);
    for (let k = 0; k < nodes.length; k++) {
      //our nodes array will always more likely be greater than the actual number of nodes on the grid (as the way we are filling the array (setting the pattern number of time,see while loop in corresponding maze algorithm), and then pruning our nodes array till it reaches undefined i.e to the size of the number of nodes in the grid)
      if (nodes[k] === undefined) {
        return;
      }

      setTimeout(() => {
        if (!(nodes[k].isStart || nodes[k].isFinish || nodes[k].isBomb)) {
          nodes[k].isWall = true;
          const element = document.getElementById(
            `node-${nodes[k].row}-${nodes[k].col}`
          );
          element.className = "node node-wall";
        }
        //we would'nt have reached nodes[k]===undefined as we are returning from that point so we are checking in advance (also so that disabling persists while walls are being drawn)
        if (nodes[k + 1] === undefined) {
          this.reEnableButtons();
          this.enableGrid();
        }
      }, k * 10);
    }
  };
  visualizeStaircase = () => {
    this.clearBoard();
    this.disableButtons();
    this.disableGrid();
    const { grid } = this.state;
    const nodes = staircaseMaze(grid, NUMBER_OF_ROWS, NUMBER_OF_COLS);
    for (let k = 0; k < nodes.length; k++) {
      if (nodes[k] === undefined) {
        return;
      }
      setTimeout(() => {
        if (!(nodes[k].isStart || nodes[k].isFinish || nodes[k].isBomb)) {
          nodes[k].isWall = true;
          const element = document.getElementById(
            `node-${nodes[k].row}-${nodes[k].col}`
          );
          element.className = "node node-wall";
        }
        if (nodes[k + 1] === undefined) {
          this.reEnableButtons();
          this.enableGrid();
        }
      }, k * 10);
    }
  };
  visualizeMazeThree = () => {
    this.clearBoard();
    this.disableButtons();
    this.disableGrid();
    const { grid } = this.state;
    const nodes = mazeThree(grid, NUMBER_OF_ROWS, NUMBER_OF_COLS);
    for (let k = 0; k < nodes.length; k++) {
      if (nodes[k] === undefined) {
        return;
      }
      setTimeout(() => {
        if (!(nodes[k].isStart || nodes[k].isFinish || nodes[k].isBomb)) {
          nodes[k].isWall = true;
          const element = document.getElementById(
            `node-${nodes[k].row}-${nodes[k].col}`
          );
          element.className = "node node-wall";
        }
        if (nodes[k + 1] === undefined) {
          this.reEnableButtons();
          this.enableGrid();
        }
      }, k * 10);
    }
  };
  visualizeMazeFour = () => {
    this.clearBoard();
    this.disableButtons();
    this.disableGrid();
    const { grid } = this.state;
    const nodes = mazeFour(grid, NUMBER_OF_ROWS, NUMBER_OF_COLS);
    for (let k = 0; k < nodes.length; k++) {
      if (nodes[k] === undefined) {
        return;
      }
      setTimeout(() => {
        if (!(nodes[k].isStart || nodes[k].isFinish || nodes[k].isBomb)) {
          nodes[k].isWall = true;
          const element = document.getElementById(
            `node-${nodes[k].row}-${nodes[k].col}`
          );
          element.className = "node node-wall";
        }
        if (nodes[k + 1] === undefined) {
          this.reEnableButtons();
          this.enableGrid();
        }
      }, k * 10);
    }
  };
  disableGrid = () => {
    const { grid } = this.state;
    for (const row of grid) {
      for (const node of row) {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        element.style.pointerEvents = "none";
      }
    }
  };
  enableGrid = () => {
    const { grid } = this.state;
    for (const row of grid) {
      for (const node of row) {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        element.style.pointerEvents = "auto";
      }
    }
  };
  disableButtons = () => {
    const buttons = document.getElementsByClassName("btn");
    for (let k = 0; k < buttons.length; k++) {
      buttons[k].disabled = true;
    }
  };
  reEnableButtons = () => {
    const buttons = document.getElementsByClassName("btn");

    for (let k = 0; k < buttons.length; k++) {
      buttons[k].disabled = false;
    }
    //keeping addBomb button disabled if it is present on the grid
    if (bombNode.status) {
      document.getElementById("add-bomb-button").disabled = true;
    }
  };
  render() {
    const myStyle = {
      color: "black",
      backgroundColor: "ghostwhite",
      padding: "0.5px",
      fontFamily: "Arial",
      // position: "absolute",
      textContent: "center",
      display: "inline-block",
      marginBottom: "0px",
      fontStyle: "italic"
    };

    return (
      <div>
        <div className="App" id="mainContent">
          <div id="navBarContent">
            <NavBar
              visualizeDijkstra={() => this.visualizeDijkstra()}
              visualizeAstar={() => this.visualizeAstar()}
              clearBoard={() => this.clearBoard()}
              clearPath={() => this.clearPath()}
              addBomb={() => this.addBomb()}
              removeBomb={() => this.removeBomb()}
              genRandomWalls={() => this.genRandomWalls()}
              visualizeRecursiveDivision={() =>
                this.visualizeRecursiveDivision()
              }
              visualizeStaircase={() => this.visualizeStaircase()}
              visualizeMazeThree={() => this.visualizeMazeThree()}
              visualizeMazeFour={() => this.visualizeMazeFour()}
            />
          </div>
          <div id="textContent">
            <NavLink activeClassName="active" to="/demo">
              <button
                className="btn btn-light btn-lg"
                style={{ float: "left" }}
                id="demo-button"
              >
                Quick Demo
              </button>
            </NavLink>
            <div style={myStyle}>
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
            <strong style={myStyle}>{centerText}</strong>
          </div>
          <div id="gridContent">
            <PathfindingVisualizer
              grid={this.state.grid}
              mouseIsPressed={this.state.mouseIsPressed}
              handleMouseUp={(row, col) => this.handleMouseUp(row, col)}
              handleMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
              handleMouseDown={(row, col) => this.handleMouseDown(row, col)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
