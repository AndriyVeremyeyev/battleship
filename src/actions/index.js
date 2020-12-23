export const setShipsCells = (player, cell) => {
  return {
    type: "SET_SHIPS_CELLS",
    payload: { player, cell },
  };
};

export const setShipsShadowsCells = (cell) => {
  return {
    type: "SET_SHIPS_SHADOWS_CELLS",
    payload: cell,
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
