export function staircaseMaze(grid, NUMBER_OF_ROWS, NUMBER_OF_COLS) {
  // console.log("maze ...")
  // const { grid } = this.state;
  const row = NUMBER_OF_ROWS;
  let nodes = [];
  let x = 0;
  let w = 10;
  // const col = NUMBER_OF_COLS;
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
  // for (let k = 0; k < nodes.length; k++) {
  //   setTimeout(() => {
  //     nodes[k].isWall = true;
  //     const element = document.getElementById(
  //       `node-${nodes[k].row}-${nodes[k].col}`
  //     );
  //     element.className = "node node-wall";
  //   }, k * 10);
  // }
  return nodes;
}
