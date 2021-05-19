export const setShipsCells = (player: string, cell: string) => {
  return {
    type: "SET_SHIPS_CELLS",
    payload: { player, cell },
  };
};

export const setShipsCellsTotal = (obj: any) => {
  return {
    type: "SET_SHIPS_CELLS_TOTAL",
    payload: obj,
  };
};

export const setShipsShadowsCells = (player: string, cell: string) => {
  return {
    type: "SET_SHIPS_SHADOWS_CELLS",
    payload: { player, cell },
  };
};

export const setShipsShadowsCellsTotal = (player: string, obj: any) => {
  return {
    type: "SET_SHIPS_SHADOWS_CELLS_TOTAL",
    payload: { player, obj },
  };
};

export const setShip = (player: string, ship: string, position: string[]) => {
  return {
    type: "SET_SHIP",
    payload: { player, ship, position },
  };
};

export const setPageStatus = (pageStatus: string) => {
  return {
    type: "SET_PAGE_STATUS",
    payload: pageStatus,
  };
};

export const setLegendLineOne = (legend: string) => {
  return {
    type: "SET_LEGEND_LINE_ONE",
    payload: legend,
  };
};

export const setLegendLineTwo = (legend: string) => {
  return {
    type: "SET_LEGEND_LINE_TWO",
    payload: legend,
  };
};

export const setShipsStatus = (
  player: string,
  ship: string,
  status: boolean
) => {
  return {
    type: "SET_SHIPS_STATUS",
    payload: { player, ship, status },
  };
};

export const setAttempts = (player: string) => {
  return {
    type: "SET_ATTEMPTS",
    payload: player,
  };
};

export const setWrongAttempts = (player: string, attempt: string) => {
  return {
    type: "SET_WRONG_ATTEMPTS",
    payload: { player, attempt },
  };
};

export const setKilledCells = (player: string, cell: string) => {
  return {
    type: "SET_KILLED_CELLS",
    payload: { player, cell },
  };
};

export const setShowComputer = () => {
  return {
    type: "SET_SHOW_COMPUTER",
  };
};

export const removeShipCell = (player: string, ship: string, cell: string) => {
  return {
    type: "REMOVE_SHIP_CELL",
    payload: { player, ship, cell },
  };
};

export const setPossibleDirections = (cell: string) => {
  return {
    type: "SET_POSSIBLE_DIRECTIONS",
    payload: cell,
  };
};

export const removePossibleDirections = () => {
  return {
    type: "REMOVE_POSSIBLE_DIRECTIONS",
  };
};

export const removeShadows = () => {
  return {
    type: "REMOVE_SHADOWS",
  };
};

export const setPlayAgain = (status: boolean) => {
  return {
    type: "SET_PLAY_AGAIN",
    payload: status,
  };
};

export const setFirstTime = (status: boolean) => {
  return {
    type: "SET_FIRST_TIME",
    payload: status,
  };
};

export const clearEverything = () => {
  return {
    type: "CLEAR_EVERYTHING",
  };
};

export const setDamagedShip = (ship: string[]) => {
  return {
    type: "SET_DAMAGED_SHIP",
    payload: ship,
  };
};

export const setIsBattle = (status: boolean) => {
  return {
    type: "SET_IS_BATTLE",
    payload: status,
  };
};

export const setScore = (side: string) => {
  return {
    type: "SET_SCORE",
    payload: side,
  };
};

export const setPlayerName = (name: string) => {
  return {
    type: "SET_PLAYER_NAME",
    payload: name,
  };
};
