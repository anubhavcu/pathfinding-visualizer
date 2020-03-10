export function mazeThree(grid, NUMBER_OF_ROWS, NUMBER_OF_COLS) {
  let nodes = [];
  // let x = 1;
  const row = NUMBER_OF_ROWS;
  const col = NUMBER_OF_COLS;
  // let w = 4;
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
  // while (w) {
  let q = 6;
  for (let j = 1; j < 20; j++) {
    //below four for loops are for four bars
    //top bar
    for (let i = 1; i < Math.floor(row / 2); i++) {
      if (i === Math.floor((row - 2) / 1.6)) continue;
      if (i === Math.floor((row - 2) / 2.5)) continue;
      nodes.push(grid[i][q]);
    }
    //bottom bar
    for (let i = row - 1; i > Math.floor(row / 2.2); i--) {
      if (i === Math.floor((row - 2) / 1.6)) continue;
      if (i === Math.floor((row - 2) / 2.5)) continue;
      nodes.push(grid[i][q]);
    }
    //top second bar
    q += 6;
    for (let i = 1; i < Math.floor(row / 2); i++) {
      if (i === Math.floor((row - 2) / 1.6)) continue;
      if (i === Math.floor((row - 2) / 2.5)) continue;
      nodes.push(grid[i][q]);
    }
    //bottom second bar
    for (let i = row - 1; i > Math.floor(row / 2); i--) {
      if (i === Math.floor((row - 2) / 1.6)) continue;
      if (i === Math.floor((row - 2) / 2.5)) continue;
      nodes.push(grid[i][q]);
    }
  }

  // for (let i = Math.floor(row / 1.8); i < Math.floor(row / 2.8); i++) {
  //   nodes.push(grid[i][Math.floor(col / 3)]);
  // }
  //   w -= 1;
  // }
  // up,right,down,right lines & then repeat w times
  // while (w) {
  //   for(let i = 2; i< 8;i++){

  //   }
  // w -= 1;
  // }
  return nodes;
}
