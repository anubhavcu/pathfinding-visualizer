export function astar(grid, startNode, finishNode) {
  setAllDistanceToInfinity(grid);
  // console.log(startNode, finishNode);
  // console.log(grid);
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  fillXandYCordinates(grid, startNode, finishNode);
  addHeuristicDistanceToNodes(grid, startNode, finishNode);
  const unvisitedNodes = getAllNodes(grid);
  console.log(grid);
  console.log(startNode, finishNode);
  while (unvisitedNodes.length) {
    sortNodesByTotalDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}
function fillXandYCordinates(grid, startNode, finishNode) {
  // let maxX = grid.length - 1;
  // let maxY = grid[0].length - 1;
  let xValue = 0,
    yValue = 0;
  for (let i = grid.length; i > 0; i--) {
    xValue = 0;
    for (let j = 0; j < grid[0].length; j++) {
      grid[i - 1][j].x = xValue;
      grid[i - 1][j].y = yValue;
      xValue += 1;
    }
    yValue += 1;
  }
  // console.log(grid);
}
function setAllDistanceToInfinity(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      node.isVisited = false;
      node.previousNode = null;
    }
  }
}
//same as dijkstra that we update the distance of neighbouring nodes by +1 and also we compute total distance as distance + heuristic distance
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  // calculateManhattanDistance(unvisitedNeighbors, grid);
  // console.log(unvisitedNeighbors);
  for (let neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.totalDistance = node.distance + neighbor.heuristicDistance;

    neighbor.previousNode = node;
  }
}
function calculateManhattanDistance(unvisitedNeighbors, grid) {
  let finishNode;
  let startNode;
  for (let row of grid) {
    for (let node of row) {
      if (node.isStart) {
        startNode = node;
      }
      if (node.isFinish) {
        finishNode = node;
      }
    }
  }
  for (let neighbor of unvisitedNeighbors) {
    let dx = Math.abs(neighbor.x - finishNode.x);
    let dy = Math.abs(neighbor.y - finishNode.y);
    let dxy = dx + dy;
    neighbor.manhattanDistance = dxy;
    neighbor.totalDistance = neighbor.distance + neighbor.manhattanDistance;
  }
}
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
function sortNodesByTotalDistance(unvisitedNodes) {
  unvisitedNodes.sort(
    (nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance
    // (nodeA, nodeB) => nodeA.distance - nodeB.distance
    // (nodeA, nodeB) => nodeA.heuristicDistance - nodeB.heuristicDistance
  );
}
function addHeuristicDistanceToNodes(grid, startNode, finishNode) {
  for (const row of grid) {
    for (const node of row) {
      // const a = Math.abs(finishNode.col - node.col);
      const a = Math.abs(finishNode.x - node.x);
      // const b = Math.abs(finishNode.row - node.row);
      const b = Math.abs(finishNode.y - node.y);

      // const h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      const h = Math.abs(a + b);
      //adding random value to h to enhace the value of heuristic distance
      //if we enhanced the value too much(i.e multiply by 5/10/100, shortest path will be more strict, i.e it would choose a deviated path instead of straight line. therefore some average value is added or multiplied
      // node.heuristicDistance = h + 1000;
      node.heuristicDistance = h * 1.00001;

      node.totalDistance = Math.floor(node.distance + node.heuristicDistance);
    }
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getNodesInShortestPathOrderAstar(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
