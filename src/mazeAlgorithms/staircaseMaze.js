export function staircaseMaze(grid, NUMBER_OF_ROWS, NUMBER_OF_COLS) {
  const row = NUMBER_OF_ROWS;
  let nodes = [];
  let x = 0;
  let w = 10;
  while (w) {
    for (let i = row - 1; i >= 1; i--) {
      if (i === Math.floor((row - 2) / 4)) continue;
      if (i === Math.floor((row - 2) / 1.2)) continue;

      nodes.push(grid[i][x]);
      x += 1;
    }
    for (let i = 1; i < row - 2; i++) {
      if (i === Math.floor((row - 2) / 2)) continue;
      if (i === Math.floor((row - 2) / 1.2)) continue;

      nodes.push(grid[i][x]);
      x += 1;
    }
    w -= 1;
  }
  return nodes;
}
