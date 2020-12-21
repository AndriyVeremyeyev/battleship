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

export const changeColor = () => {
  return {
    type: "CHANGE_COLOR",
  };
};
