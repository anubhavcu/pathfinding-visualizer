export function mazeFour(grid, NUMBER_OF_ROWS, NUMBER_OF_COLS) {
  let nodes = [];
  const row = NUMBER_OF_ROWS;
  const col = NUMBER_OF_COLS;
  for (let i = Math.floor(row / 1.8); i < Math.floor(row / 2.8); i++) {
    nodes.push(grid[i][Math.floor(col / 3)]);
  }
  // outer rectanlge
  //up
  for (let i = 1; i < col - 1; i++) {
    nodes.push(grid[0][i]);
  }
  //bottom
  for (let i = 1; i < col - 1; i++) {
    nodes.push(grid[row - 1][i]);
  }
  //left
  for (let i = 1; i < row - 1; i++) {
    nodes.push(grid[i][1]);
  }
  //right
  for (let i = 1; i < row - 1; i++) {
    nodes.push(grid[i][col - 2]);
  }
  let x = 0;
  let y = 0;
  let w = 10;
  // const col = NUMBER_OF_COLS;
  while (w) {
    for (let i = row - 1; i >= 1; i--) {
      if (i === Math.floor((row - 2) / 4)) continue;
      if (i === Math.floor((row - 2) / 1.2)) continue;

      nodes.push(grid[i][x]);
      x += 1;
    }
    for (let i = 2; i <= row - 1; i++) {
      if (i === Math.floor((row - 2) / 4)) continue;
      if (i === Math.floor((row - 2) / 1.2)) continue;

      nodes.push(grid[i][y]);
      y += 1;
    }
    for (let i = 1; i < row - 2; i++) {
      if (i === Math.floor((row - 2) / 2)) continue;
      if (i === Math.floor((row - 2) / 1.2)) continue;

      nodes.push(grid[i][x]);
      x += 1;
    }
    for (let i = row - 3; i > 1; i--) {
      if (i === Math.floor((row - 2) / 2)) continue;
      if (i === Math.floor((row - 2) / 1.2)) continue;

      nodes.push(grid[i][y]);
      y += 1;
    }
    w -= 1;
  }
  return nodes;
}
