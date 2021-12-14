import { RefObject, useEffect, useState } from "react";
import { getIslands } from "./getIslands";
import { getSevenSeas } from "./getSevenSeas";
import { Hexagon, HexItems } from "./types";

const getBlankGrid = (): Hexagon[][] => {
  const rows = [];
  for (var rowIndex = 0; rowIndex < 21; rowIndex++) {
    const isEvenRow = rowIndex % 2;
    const totalColumns = isEvenRow ? 10 : 9;
    const row = [];
    for (let col=0; col<totalColumns; col++) {
      const hex: Hexagon = {
        show: true,
        row: rowIndex,
        col,
      }
      row.push(hex);
    }
    rows.push(row);
  }
  rows[0][0].show = false;
  rows[1][0].show = false;
  rows[0][8].show = false;
  rows[1][9].show = false;
  rows[19][0].show = false;
  rows[20][0].show = false;
  rows[19][9].show = false;
  rows[20][8].show = false;
  return rows;
}

export const useContext = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [hexagonData, setHexagonData] = useState<Hexagon[][]>();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [sevenSeas, setSevenSeas] = useState<Hexagon[][]>();
  const [islands, setIslands] = useState<Hexagon[][]>();

  useEffect(() => {
    if (canvasRef.current && canvasRef.current.getContext('2d')) {
      setCtx(canvasRef!.current.getContext('2d'));
    }
    setHexagonData(getBlankGrid());
  }, []);

  useEffect(() => {
    if (hexagonData) {
      setSevenSeas(getSevenSeas(hexagonData));
    }
  }, [hexagonData]);

  useEffect(() => {
    if (sevenSeas && hexagonData) {
      // Set seven seas
      const flatSeas = sevenSeas.flat();
      for (const seaHex of flatSeas) {
        seaHex.sevenSeas = true;
      };
      setIslands(getIslands(hexagonData, sevenSeas));
    }
  }, [sevenSeas]);

  useEffect(() => {
    if (islands) {
      const flatIslands = islands.flat();
      for (const islandHex of flatIslands) {
        islandHex.island = true;
      }

      addStart();
      addDread();

      addRandomStuff();
      drawGrid();
    }
  }, [islands])

  const addStart = () => {
    let possIslands = islands;
    possIslands?.splice(2, 1);
    const randomHex = Math.floor(Math.random() * 3);
    if (possIslands) {
      possIslands[randomHex][0].start = true;
    };
  }

  const addDread = () => {
    let possIslands = islands;
    possIslands?.splice(5, 8);
    possIslands = possIslands?.filter((island) => !island[0].start);
    const randomHex = Math.floor(Math.random() * 3);
    if (possIslands) {
      possIslands[randomHex][0].dread = true;
    };
  }

  const addRandomStuff = () => {
    const numberOfItems = 3;
    const flatGrid = hexagonData!.flat();

    for (const item of [HexItems.BARREL, HexItems.FRUIT, HexItems.GEM, HexItems.HIDE, HexItems.SAILOR, HexItems.SPICE]) {  
      for (let i=0; i<numberOfItems;) {
        const randomHex = flatGrid[Math.floor(Math.random() * flatGrid.length)];
        if (randomHex.show && !randomHex.hexItems && !randomHex.dread && !randomHex.island && !randomHex.start) {
          randomHex.hexItems = item;
          i++;
        }
      }
    }
  };

  const drawGrid = () => {
    if (ctx) {
      for (const [rowIndex, row] of hexagonData!.entries()) {
        const isEvenRow = rowIndex % 2;
        const totalColumns = isEvenRow ? 10 : 9;
        
        for (let col=0; col<totalColumns; col++) {
          const hexagon = row[col];
          const numberOfSides = 6,
          size = 25,
          Xcenter = isEvenRow ?
                    col * (size * 3) + size :
                    col * (size * 3) + (size * 2.5),
          
          Ycenter = rowIndex * (size * 0.86) + size;
    
          ctx.beginPath();
          ctx.moveTo (Xcenter + size * Math.cos(0), Ycenter +  size *  Math.sin(0));          
    
          for (let i = 1; i <= numberOfSides; i++) {
            ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
          }
    
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1;
          ctx.fillStyle = "#33ddee";
    
          if (hexagon.sevenSeas) {
            ctx.fillStyle = "#99eeff";
          }
          
          if (hexagon.island) {
            ctx.fillStyle = "#ddcc33";
          }
          
          if (hexagon.dread) {
            ctx.fillStyle = "#ff0000";
          }

          if (hexagon.start) {
            ctx.fillStyle = "#eedd99";
          }

          if (hexagon.show) {
            ctx.stroke();
            ctx.fill();
          }
    
          if (hexagon.hexItems) {
            const image = new Image();
            image.src = `${process.env.PUBLIC_URL}/${hexagon.hexItems}.png`;
            image.onload = () => {
              // @ts-ignore: Unreachable code error
              ctx.drawImage(image, Xcenter - 10, Ycenter - 14, 18, 26);
            }
          }
    
          ctx.restore();
        };
      }
    }
  }

  return ctx;
}

export default useContext;