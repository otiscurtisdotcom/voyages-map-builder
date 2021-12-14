import { Hexagon } from "./types";

const coinFlip = () => {
  return Math.random() > 0.5;
}

export const getIslands = (grid: Hexagon[][], sevenSeas: Hexagon[][]) => {
  
  const checkHex = (hex: Hexagon): boolean => {
    const allSeas = sevenSeas.flat();
    return allSeas.some((seaHex: Hexagon) => 
      hex.col === seaHex.col && hex.row === seaHex.row
    )
  }

  let islandHexes: Hexagon[][] = [];
  islandHexes.push(
    [grid[10][0]],
    [grid[10][2]],
    [grid[10][4]],
    [grid[10][6]],
    [grid[10][8]],
  );

  sevenSeas.splice(3,1);
  sevenSeas.forEach((sea) => {
    const island = [];
    
    const randomHex = sea[Math.floor(Math.random() * sea.length)];
    island.push(randomHex);

    const straightPair = () => {
      if (randomHex.row > 18) {
        return grid[randomHex.row - 2][randomHex.col];
      } else if (randomHex.row < 2) {
        return grid[randomHex.row + 2][randomHex.col];
      } else {
        return checkHex(grid[randomHex.row + 2][randomHex.col]) ?
          grid[randomHex.row + 2][randomHex.col] :
          grid[randomHex.row - 2][randomHex.col];
      }
    }

    const diagonalPair = () => {
      const rowNumber = randomHex.row > 19 ?
                        randomHex.row - 1 :
                        randomHex.row + 1;

      const colNumber = randomHex.col > 7 ?
                        randomHex.col - 1 :
                          randomHex.row % 2 ?
                          randomHex.col :
                          randomHex.col + 1;

      if (checkHex(grid[rowNumber][colNumber])) {
        return grid[rowNumber][colNumber];
      }
    }

    let second = coinFlip() ? diagonalPair() : straightPair();

    if (!second) {
      second = straightPair();
    }

    island.push(second);
    islandHexes.push(island);
  });

  // Add second single island to top sea
  if (islandHexes[6][0].col > 3) {
    islandHexes.push([grid[1][3]]);
  } else {
    islandHexes.push([grid[2][5]]);
  }

  // Add second single island to bottom sea
  if (islandHexes[9][0].col > 3) {
    islandHexes.push([grid[19][3]]);
  } else {
    islandHexes.push([grid[18][5]]);
  }

  return islandHexes;
}