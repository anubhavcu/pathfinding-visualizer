// export function astar(grid, startNode, finishNode) {
//   const visitedNodesInOrder = [];
//   startNode.distance = 0;
//   addHeuristicDistanceToNodes(grid, startNode, finishNode);
//   const unvisitedNodes = getAllNodes(grid);
//   sortNodesByDistance(unvisitedNodes);
//   let currentClosestNode = unvisitedNodes.shift();
//   while (unvisitedNodes.length) {
//     sortNodesByDistance(unvisitedNodes);
//     const unvisitedNeighbors = getUnvisitedNeighbors(currentClosestNode, grid);
//     updateUnvisitedNeighbors(unvisitedNeighbors, currentClosestNode);
//     const closestNode = getClosestNode(unvisitedNeighbors);
//     currentClosestNode = unvisitedNodes.shift();
//     // console.log(closestNode);
//     // console.log(unvisitedNeighbors);
//     if (closestNode.isWall) continue;
//     closestNode.isVisited = true;
//     visitedNodesInOrder.push(closestNode);
//     if (closestNode === finishNode) return visitedNodesInOrder;
//   }
// }
// // function getClosestNode(neighbors) {
// //   let node = neighbors[0];
// //   for (let i = 0; i < neighbors; i++) {
// //     if (
// //       neighbors[i].distance + neighbors[i].heuristicDistance <=
// //       node.distance + node.heuristicDistance
// //     ) {
// //       node = neighbors[i];
// //     }
// //   }
// //   return node;
// // }
// function getClosestNode(neighbors) {
//   neighbors.sort(
//     (nodeA, nodeB) =>
//       nodeA.heuristicDistance +
//       nodeA.distance -
//       (nodeB.distance + nodeB.heuristicDistance)
//   );
//   return neighbors[0];
// }
// function updateUnvisitedNeighbors(unvisitedNeighbors, node) {
//   for (let i = 0; i < unvisitedNeighbors.length; i++) {
//     unvisitedNeighbors[i].distance = node.distance + 1;
//     unvisitedNeighbors[i].previousNode = node;
//   }
// }
// function getUnvisitedNeighbors(node, grid) {
//   const neighbors = [];
//   const { row, col } = node;
//   if (row > 0) neighbors.push(grid[row - 1][col]);
//   if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
//   if (col > 0) neighbors.push(grid[row][col - 1]);
//   if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
//   return neighbors.filter(neighbor => !neighbor.isVisited);
// }
// function sortNodesByDistance(unvisitedNodes) {
//   unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
// }
// function addHeuristicDistanceToNodes(grid, startNode, finishNode) {
//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[i].length; j++) {
//       const a = Math.abs(finishNode.col - j);
//       const b = Math.abs(finishNode.row - i);
//       // const h = Math.ceil(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
//       const h = Math.floor(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
//       grid[i][j].heuristicDistance = h;
//     }
//   }
// }

// function getAllNodes(grid) {
//   const nodes = [];
//   for (const row of grid) {
//     for (const node of row) {
//       nodes.push(node);
//     }
//   }
//   return nodes;
// }
// export function getNodesInShortestPathOrderAstar(finishNode) {
//   const nodesInShortestPathOrder = [];
//   let currentNode = finishNode;
//   //current node will be null it is equal to startNode
//   while (currentNode !== null) {
//     nodesInShortestPathOrder.unshift(currentNode);
//     currentNode = currentNode.previousNode;
//   }
//   return nodesInShortestPathOrder;
// }

// export function astar(grid, startNode, finishNode) {
//   const visitedNodesInOrder = [];
//   updateDistanceOfNodes(grid, startNode, finishNode);
//   // console.log(grid);
//   const unvisitedNodes = getAllNodes(grid);
//   sortNodesByDistance(unvisitedNodes);
//   console.log(unvisitedNodes);
//   while (unvisitedNodes.length) {
//     const closestNode = unvisitedNodes.shift();
//     if (closestNode === finishNode) return;
//     console.log(closestNode);
//   }
// }
// function sortNodesByDistance(unvisitedNodes) {
//   unvisitedNodes.sort(
//     (nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance
//   );
// }
// function getAllNodes(grid) {
//   const nodes = [];
//   for (const row of grid) {
//     for (const node of row) {
//       nodes.push(node);
//     }
//   }
//   return nodes;
// }
// function updateDistanceOfNodes(grid, startNode, finishNode) {
//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[i].length; j++) {
//       const a = Math.abs(finishNode.col - j);
//       const b = Math.abs(finishNode.row - i);
//       const c = Math.abs(startNode.col - j);
//       const d = Math.abs(startNode.row - i);
//       // const h = Math.ceil(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
//       const h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
//       const dis = Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2));
//       grid[i][j].heuristicDistance = h;
//       grid[i][j].distance = dis;
//       grid[i][j].totalDistance = h + dis;
//     }
//   }
// }

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  updateDistanceOfNodes(grid, startNode, finishNode);
  console.log(grid);
  const unvisitedNodes = getAllNodes(grid);
  console.log(unvisitedNodes);
  while (unvisitedNodes.length) {
    // sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    console.log(closestNode);
    if (closestNode.isWall) continue;
    // if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
    sortNodesByDistance(unvisitedNodes);
  }
}
function updateDistanceOfNodes(grid, startNode, finishNode) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const a = Math.abs(finishNode.col - j);
      const b = Math.abs(finishNode.row - i);
      // const c = Math.abs(startNode.col - j);
      // const d = Math.abs(startNode.row - i);
      // const h = Math.ceil(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
      const h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      // const dis = Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2));
      grid[i][j].heuristicDistance = h;
      // grid[i][j].distance = dis;
      grid[i][j].totalDistance = h + grid[i][j].distance;
    }
  }
}
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (let neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.totalDistance = neighbor.distance + neighbor.heuristicDistance;
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

  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function sortNodesByDistance(unvisitedNodes) {
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
  //current node will be null it is equal to startNode
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
