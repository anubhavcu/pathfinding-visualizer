export function astar(grid, startNode, finishNode) {
  setAllDistanceToInfinity(grid);
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  fillXandYCordinates(grid, startNode, finishNode);
  addHeuristicDistanceToNodes(grid, startNode, finishNode);
  console.log(startNode, finishNode);
  const unvisitedNodes = getAllNodes(grid);
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
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (let neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    // neighbor.distance = node.distance + (node.distance - neighbor.distance);
    // neighbor.totalDistance = node.distance + neighbor.heuristicDistance;
    neighbor.totalDistance = neighbor.distance + neighbor.heuristicDistance;

    neighbor.previousNode = node;
  }
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
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
function addHeuristicDistanceToNodes(grid, startNode, finishNode) {
  for (const row of grid) {
    for (const node of row) {
      const diffX = Math.abs(node.x - finishNode.x);
      const diffY = Math.abs(node.y - finishNode.y);
      const manhattanDistance = diffX + diffY;
      node.heuristicDistance = manhattanDistance * 1.0000000001;
      node.totalDistance = node.distance + node.heuristicDistance;
    }
  }
}
function fillXandYCordinates(grid, startNode, finishNode) {
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
}
function sortNodesByTotalDistance(unvisitedNodes) {
  unvisitedNodes.sort(
    (nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance
  );
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
    //unshift adds element to the begining of array
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
