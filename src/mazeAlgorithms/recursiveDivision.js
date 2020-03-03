//for all algortihms we are repeating a pattern number of times('w' times using while loop), and nodes array is being returned which has length greater than number of nodes in the grid which we are pruning(returning at that point when nodes[i]===undefined) while visualizing it.
export function recursiveDivision(grid, NUMBER_OF_ROWS, NUMBER_OF_COLS) {
  let nodes = [];
  let x = 1;
  const row = NUMBER_OF_ROWS;
  const col = NUMBER_OF_COLS;
  let w = 10;
  // up,right,down,right lines & then repeat w times
  while (w) {
    //up
    for (let i = row - 2; i >= 1; i--) {
      if (i === Math.floor((row - 2) / 1.6)) continue;
      if (i === Math.floor((row - 2) / 2.5)) continue;

      nodes.push(grid[i][x]);
    }
    x += 1;
    //right
    for (let i = 0; i <= 4; i++) {
      nodes.push(grid[1][x]);
      x += 1;
    }
    //down
    for (let i = 1; i < row - 1; i++) {
      if (i === Math.floor((row - 2) / 1.2)) continue;
      if (i === Math.floor((row - 2) / 3)) continue;
      nodes.push(grid[i][x]);
    }
    //right
    for (let i = 0; i <= 4; i++) {
      nodes.push(grid[row - 2][x]);
      x += 1;
    }
    w -= 1;
  }
  return nodes;
}
