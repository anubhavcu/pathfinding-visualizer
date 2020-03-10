//similar to dijkstra's algorithms but we also calculate the heuristic distance of each node to select the best node to reach the finish node
//f = g + h ; g= distance from startNode; h=heuristic distance(estimated distance to finish node)
// With A*,we see that once we get past the obstacle, the algorithm prioritizes the node with the lowest f and the ‘best’ chance of reaching the end.
export function astar(grid, startNode, finishNode) {
  setAllDistanceToInfinity(grid);

  const visitedNodesInOrder = [];
  startNode.distance = 0;
  addHeuristicDistanceToNodes(grid, startNode, finishNode);
  const unvisitedNodes = getAllNodes(grid);
  // console.log(unvisitedNodes);
  while (unvisitedNodes.length) {
    sortNodesByTotalDistance(unvisitedNodes);

    const closestNode = unvisitedNodes.shift();
    // console.log(closestNode);
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;

    // console.log(closestNode);
    updateUnvisitedNeighbors(closestNode, grid);

    // console.log(unvisitedNodes);
  }
}
function setAllDistanceToInfinity(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      node.isVisited = false;
      node.previousNode = null;
      // const element = document.getElementById(`node-${node.row}-${node.col}`);
      // element.classList.remove("node-bomb-visited");
    }
  }
}
//same as dijkstra that we update the distance of neighbouring nodes by +1 and also we compute total distance as distance + heuristic distance
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  // console.log(unvisitedNeighbors);
  for (let neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.totalDistance = node.distance + 1 + neighbor.heuristicDistance;

    neighbor.previousNode = node;
  }
}
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  //  // diagnal elements
  // // top-right
  // if (row > 0 && col < grid[0].length - 1)
  //   neighbors.push(grid[row - 1][col + 1]);
  // // bottom-right
  //  if (row < grid.length - 1 && col < grid[0].length - 1)
  //   neighbors.push(grid[row + 1][col + 1]);
  // // bottom-left
  // if (row < grid.length - 1 && col > 0) neighbors.push(grid[row + 1][col - 1]);
  // // top-left
  // if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);

  return neighbors.filter(neighbor => !neighbor.isVisited);
}
function sortNodesByTotalDistance(unvisitedNodes) {
  unvisitedNodes.sort(
    (nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance
  );
}
function addHeuristicDistanceToNodes(grid, startNode, finishNode) {
  for (const row of grid) {
    for (const node of row) {
      const a = Math.abs(finishNode.col - node.col);
      const b = Math.abs(finishNode.row - node.row);
      const h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      //adding random value to h to enhace the value of heuristic distance
      //if we enhanced the value too much(i.e multiply by 5/10/100, shortest path will be more strict, i.e it would choose a deviated path instead of straight line. therefore some average value is added or multiplied
      node.heuristicDistance = h + 1000;

      node.totalDistance = node.distance + node.heuristicDistance;
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
  //current node will be null it is equal to startNode
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
