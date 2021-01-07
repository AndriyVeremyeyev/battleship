export const setShipsCells = (player, cell) => {
  return {
    type: "SET_SHIPS_CELLS",
    payload: { player, cell },
  };
};

export const setShipsCellsTotal = (obj) => {
  return {
    type: "SET_SHIPS_CELLS_TOTAL",
    payload: obj,
  };
};

export const setShipsShadowsCells = (player, cell) => {
  return {
    type: "SET_SHIPS_SHADOWS_CELLS",
    payload: { player, cell },
  };
};

export const setShipsShadowsCellsTotal = (obj) => {
  return {
    type: "SET_SHIPS_SHADOWS_CELLS_TOTAL",
    payload: obj,
  };
};

export const setShip = (player, ship, position) => {
  return {
    type: "SET_SHIP",
    payload: { player, ship, position },
  };
};

export const setPageStatus = (pageStatus) => {
  return {
    type: "SET_PAGE_STATUS",
    payload: pageStatus,
  };
};

export const setLegendLineOne = (legend) => {
  return {
    type: "SET_LEGEND_LINE_ONE",
    payload: legend,
  };
};

export const setLegendLineTwo = (legend) => {
  return {
    type: "SET_LEGEND_LINE_TWO",
    payload: legend,
  };
};

export const setShipsStatus = (player, ship, status) => {
  return {
    type: "SET_SHIPS_STATUS",
    payload: { player, ship, status },
  };
};

export const setAttempts = (player) => {
  return {
    type: "SET_ATTEMPTS",
    payload: player,
  };
};

export const setWrongAttempts = (player, attempt) => {
  return {
    type: "SET_WRONG_ATTEMPTS",
    payload: { player, attempt },
  };
};

export const setKilledCells = (player, cell) => {
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

export const removeShipCell = (player, ship, cell) => {
  return {
    type: "REMOVE_SHIP_CELL",
    payload: { player, ship, cell },
  };
};

export const setPossibleDirections = (cell) => {
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

export const setPlayAgain = (status) => {
  return {
    type: "SET_PLAY_AGAIN",
    payload: status,
  };
};

export const setFirstTime = (status) => {
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

// export const setCatchedShip = (status) => {
//   return {
//     type: "SET_CATCHED_SHIP",
//   };
// };
