export enum HexItems {
  BARREL = 'barrel',
  FRUIT = 'fruit',
  SPICE = 'spice',
  HIDE = 'hide',
  GEM = 'gem',
  SAILOR = 'sailor',
}

export interface Hexagon {
  show: boolean,
  sevenSeas?: boolean,
  start?: boolean,
  dread?: boolean,
  island?: boolean,
  hexItems?: HexItems,
}