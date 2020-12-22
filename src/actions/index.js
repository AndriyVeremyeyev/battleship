export const setComputerCells = (cell) => {
  return {
    type: "SET_COMPUTER_CELLS",
    payload: cell,
  };
};

export const setComputerShip = (ship, position) => {
  return {
    type: "SET_COMPUTER_SHIP",
    payload: { ship, position },
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
