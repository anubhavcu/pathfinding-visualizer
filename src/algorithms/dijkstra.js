// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export function dijkstra(grid, startNode, finishNode) {
  setAllDistanceToInfinity(grid);
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    //after sorting closest node can be any of the four/three/two/one options as we are updating all the neighbors(of a node) distance by +1.
    //
    const closestNode = unvisitedNodes.shift();
    //if we encounter a wall we don't do anything
    if (closestNode.isWall) continue;
    //if distance of closest node is infinity
    //we must be trapped and should stop
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
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
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (let neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  //to check closestNode is not in the first row ( we are selecting the top element){so if row is 0 for node we are checking neighbors of, there is nothing on top of it, i.e why row must be greater than 0, similar goes for the rest three sides}
  if (row > 0) neighbors.push(grid[row - 1][col]);
  //to check if startNode is not in the last row(we are selecting the below element)
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  //to check if startNode is not in far left(first column),(we are selecting left of closestNode)
  if (col > 0) neighbors.push(grid[row][col - 1]);
  //to check if the element is not in the far right, in the last col(we are selecting the right side neighbor)
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  //  // if (col < grid.length - 1) neighbors.push(grid[row][col + 1]); -- this will compare the
  //col value with grid.length which is total row value, we want to check with col value

  //then filter among them whichever is unvisited
  //so unvisitedNeighbors in getUnvisitedNeighbors function will not always get 4 neighbors
  //like in second iteration of while loop we will get 3 neighbor nodes whether we select any four
  // from the first as the closestNode was already visited
  //filter takes in a function and returns array which passes the constraints of that function
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
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

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  //current node will be null it is equal to startNode
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
