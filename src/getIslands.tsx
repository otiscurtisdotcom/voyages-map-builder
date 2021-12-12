import { Hexagon } from "./types";

export const getIslands = (hexagonData: Hexagon[][]) => {
  const islandHexes = [
    // ISLAND 1A
    hexagonData[2][1],
    hexagonData[4][1],

    // ISLAND 1B
    hexagonData[2][3],

    // ISLAND 1C
    hexagonData[2][5],
    hexagonData[3][5],

    // ISLAND 1D
    hexagonData[3][8],

    // ISLAND 2A
    hexagonData[11][2],

    // ISLAND 2B
    hexagonData[10][6],

    // ISLAND 2C
    hexagonData[10][8],

    // ISLAND 3A
    hexagonData[17][1],
    hexagonData[18][1],

    // ISLAND 3B
    hexagonData[17][3],
    hexagonData[18][3],

    // ISLAND 3C
    hexagonData[18][5],

    // ISLAND 3D
    hexagonData[17][8],
    hexagonData[18][7],
  ];

  for (const hex of islandHexes) {
    hex.island = true;
  }
}