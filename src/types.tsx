export enum HexItems {
  BARREL = 'barrel',
  FRUIT = 'fruit',
  GEM = 'gem',
  HIDE = 'hide',
  SAILOR = 'sailor',
  RELIC = 'relic',
  SPICE = 'spice',
}

export interface Hexagon {
  show: boolean,
  sevenSeas?: boolean,
  start?: boolean,
  dread?: boolean,
  island?: boolean,
  hexItems?: HexItems,
  row: number,
  col: number,
}