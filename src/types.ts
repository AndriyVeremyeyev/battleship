// export type Cells = {
//   a1: boolean;
//   a2: boolean;
//   a3: boolean;
//   a4: boolean;
//   a5: boolean;
//   a6: boolean;
//   a7: boolean;
//   a8: boolean;
//   a9: boolean;
//   a10: boolean;
//   b1: boolean;
//   b2: boolean;
//   b3: boolean;
//   b4: boolean;
//   b5: boolean;
//   b6: boolean;
//   b7: boolean;
//   b8: boolean;
//   b9: boolean;
//   b10: boolean;
//   c1: boolean;
//   c2: boolean;
//   c3: boolean;
//   c4: boolean;
//   c5: boolean;
//   c6: boolean;
//   c7: boolean;
//   c8: boolean;
//   c9: boolean;
//   c10: boolean;
//   d1: boolean;
//   d2: boolean;
//   d3: boolean;
//   d4: boolean;
//   d5: boolean;
//   d6: boolean;
//   d7: boolean;
//   d8: boolean;
//   d9: boolean;
//   d10: boolean;
//   e1: boolean;
//   e2: boolean;
//   e3: boolean;
//   e4: boolean;
//   e5: boolean;
//   e6: boolean;
//   e7: boolean;
//   e8: boolean;
//   e9: boolean;
//   e10: boolean;
//   f1: boolean;
//   f2: boolean;
//   f3: boolean;
//   f4: boolean;
//   f5: boolean;
//   f6: boolean;
//   f7: boolean;
//   f8: boolean;
//   f9: boolean;
//   f10: boolean;
//   g1: boolean;
//   g2: boolean;
//   g3: boolean;
//   g4: boolean;
//   g5: boolean;
//   g6: boolean;
//   g7: boolean;
//   g8: boolean;
//   g9: boolean;
//   g10: boolean;
//   h1: boolean;
//   h2: boolean;
//   h3: boolean;
//   h4: boolean;
//   h5: boolean;
//   h6: boolean;
//   h7: boolean;
//   h8: boolean;
//   h9: boolean;
//   h10: boolean;
//   i1: boolean;
//   i2: boolean;
//   i3: boolean;
//   i4: boolean;
//   i5: boolean;
//   i6: boolean;
//   i7: boolean;any
//   j8: boolean;
//   j9: boolean;
//   j10: boolean;
// };

export type PlayerStateProps = {
  attempts: number;
  killedCells: any;
  shipsStatus: any;
  shipsCells: any;
  shipsShadowsCells: any;
  wrongAttempts: any;
  battleShip: string[];
  cruiserFirst: string[];
  cruiserSecond: string[];
  destroyerFirst: string[];
  destroyerSecond: string[];
  destroyerThird: string[];
  vedetteFirst: string[];
  vedetteSecond: string[];
  vedetteThird: string[];
  vedetteForth: string[];
  possibleDirections: any;
  damagedShip: string[];
};

export type ComputerStateProps = {
  attempts: number;
  killedCells: any;
  shipsStatus: any;
  shipsCells: any;
  shipsShadowsCells: any;
  wrongAttempts: any;
  battleShip: string[];
  cruiserFirst: string[];
  cruiserSecond: string[];
  destroyerFirst: string[];
  destroyerSecond: string[];
  destroyerThird: string[];
  vedetteFirst: string[];
  vedetteSecond: string[];
  vedetteThird: string[];
  vedetteForth: string[];
  catchedShip: boolean;
};

export type StateProps = {
  firstTime: boolean;
  isBattle: boolean;
  legendLineOne: string;
  legendLineTwo: string;
  pageStatus: string;
  playAgain: boolean;
  playerName: string;
  score: number[];
  showComputer: boolean;
  computer: ComputerStateProps;
  player: PlayerStateProps;
};

type PlayerCellSet = {
  player: string;
  cell: string;
};

type PlayerMapSet = {
  player: string;
  obj: any;
};

type PlayerShipStatusSet = {
  player: string;
  ship: string;
  status: boolean;
};

type PlayerShipCellSet = {
  player: string;
  ship: string;
  cell: string;
};

type PlayerShipPositionSet = {
  player: string;
  ship: string;
  position: string[];
};

export type TypeOneAction = {
  type: string;
};

export type TypeTwoAction = {
  type: string;
  payload: boolean;
};

export type TypeThreeAction = {
  type: string;
  payload: string;
};

export type TypeFourAction = {
  type: string;
  payload: string[];
};

export type TypeFiveAction = {
  type: string;
  payload: any;
};

export type TypeSixAction = {
  type: string;
  payload: PlayerCellSet;
};

export type TypeSevenAction = {
  type: string;
  payload: PlayerMapSet;
};

export type TypeEightAction = {
  type: string;
  payload: PlayerShipStatusSet;
};

export type TypeNineAction = {
  type: string;
  payload: PlayerShipCellSet;
};

export type TypeTenAction = {
  type: string;
  payload: PlayerShipPositionSet;
};
