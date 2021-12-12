import { Hexagon } from "./types";

export const getSevenSeas = (hexagonData: Hexagon[][]) => {
  const ssHexes = [
    // SEA 1
    [
      hexagonData[0][1],
      hexagonData[1][1],
      hexagonData[1][2],
      hexagonData[2][0],
      hexagonData[3][0],
      hexagonData[3][1],
      hexagonData[3][2],
      hexagonData[4][0],
      hexagonData[5][0],
      hexagonData[5][1],
      hexagonData[6][0],
    ],
    // SEA 2
    [
      hexagonData[0][3],
      hexagonData[0][4],
      hexagonData[1][3],
      hexagonData[1][4],
      hexagonData[1][5],
      hexagonData[2][4],
      hexagonData[3][4],
      hexagonData[4][3],
      hexagonData[4][4],
      hexagonData[4][5],
    ],
    // SEA 3
    [
      hexagonData[0][7],
      hexagonData[1][7],
      hexagonData[1][8],
      hexagonData[2][6],
      hexagonData[2][7],
      hexagonData[2][8],
      hexagonData[3][7],
      hexagonData[3][9],
      hexagonData[4][7],
      hexagonData[4][8],
      hexagonData[5][8],
      hexagonData[6][8],
    ],
    // SEA 4
    [
      hexagonData[8][4],
      hexagonData[9][4],
      hexagonData[9][5],
      hexagonData[11][4],
      hexagonData[11][5],
      hexagonData[12][4],
    ],
    // SEA 5
    [
      hexagonData[14][0],
      hexagonData[15][0],
      hexagonData[15][1],
      hexagonData[16][0],
      hexagonData[16][1],
      hexagonData[17][0],
      hexagonData[17][2],
      hexagonData[18][0],
      hexagonData[19][1],
      hexagonData[19][2],
      hexagonData[20][1],
    ],
    // SEA 6
    [
      hexagonData[16][3],
      hexagonData[16][4],
      hexagonData[17][4],
      hexagonData[17][5],
      hexagonData[18][4],
      hexagonData[19][3],
      hexagonData[19][4],
      hexagonData[19][5],
      hexagonData[20][3],
      hexagonData[20][4],
      hexagonData[20][5],
    ],
    // SEA 7
    [
      hexagonData[14][8],
      hexagonData[15][8],
      hexagonData[16][7],
      hexagonData[16][8],
      hexagonData[17][7],
      hexagonData[17][8],
      hexagonData[18][6],
      hexagonData[18][8],
      hexagonData[19][7],
      hexagonData[19][8],
      hexagonData[20][7],
    ],
  ];

  return ssHexes;
}